const express = require('express');
const app = express();
const cors = require('cors')
const socketio = require('socket.io');
const http = require('http')
const PORT = process.env.PORT || 5000
const server = http.createServer(app);
const io = socketio(server)
const router = express.Router()

app.use(cors())

const users = [];
const addUser = ( { id, username, room } ) => {
    const existingUser = users.find((user) => user.name === username && user.room === room)

    if(existingUser){
        return { error: 'Username is taken'}
    }

    const user = { id, username, room}
    users.push(user)
    return { user }

}

router.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(router)



io.on('connection', (socket) => {
    console.log('New user comes!')

    socket.on('join',({ username, room }, callback) => {
        const  { user } = addUser( { id: socket.id, username, room})

        socket.broadcast.to(username.room).emit('addUser', { username })
        socket.join(username.room)
    })
    
    socket.on('disconnect', () => {
        console.log('User had left')
    })

    socket.on('sendUserName', ({ username }) => {
        console.log("New User:", username)
        let friend = username
        socket.broadcast.to(username.room).emit('sendFriendName', friend)
        console.log('Friend: ', friend)
    })

    socket.on('sendRoomOwner', ({ username }) => {
        let friend = username
        socket.to(username.room).emit('sendRoomOwnertoFriend', friend)
    }
    )

    socket.on('sendMyName', ( { username }) => {
        let friend = username;
        socket.broadcast.to(username.room).emit('receiveRoomOwnerName', friend)
    })

    socket.on('sendScore', ( { score, username }) => {
        let friendScore = score
        console.log(score)
        socket.broadcast.to(username.room).emit("receiveScore", friendScore)
    })

    socket.on('startAll', ( { isStart, username }) => {
        console.log(isStart)
        if(!isStart){
            let start = true;
            socket.to(username.room).emit("readyForStart", start)
        }
        
    })

    socket.on('sendQuiz', ( { random, username }) => {
        console.log(random)
        socket.broadcast.to(username.room).emit("receiveQuiz", random)
    })
})





server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})