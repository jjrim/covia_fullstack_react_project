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
    const user = { id, username, room }
    users.push(user)
    return { user }

}

const getUser = id => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

router.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(router)



io.on('connection', (socket) => {
    console.log('New user comes!')

    socket.on('join',({ username, room }) => {
        const  { user } = addUser( { id: socket.id, username, room})
        console.log(username, ':', socket.id)
        console.log('Room: ', room)
        console.log(user)
        console.log(users)
        socket.broadcast.to(user.room).emit('addUser', { username })
        // socket.join(username.room)
        socket.join(user.room)
        console.log('Room: ',user.room)
        io.to(user.room).emit('roomData', { room: user.room, users:getUsersInRoom(user.room) })
    })
    
    socket.on('disconnect', () => {
        console.log('User had left')
    })

    socket.on('sendUserName', ({ username }) => {
        console.log("New User:", username)
        const user = getUser(socket.id)
        let friend = username
        socket.to(user.room).emit('sendFriendName', friend)
        console.log('Friend: ', friend)
    })

    socket.on('sendRoomOwner', ({ username }) => {
        const user = getUser(socket.id)
        let friend = username
        socket.to(user.room).emit('sendRoomOwnertoFriend', friend)
    }
    )

    socket.on('sendMyName', ( { username }) => {
        const user = getUser(socket.id)
        let friend = username;
        socket.broadcast.to(user.room).emit('receiveRoomOwnerName', friend)
    })

    socket.on('sendScore', ( { score, username }) => {
        const user = getUser(socket.id)
        let friendScore = score
        console.log(score)
        socket.broadcast.to(user.room).emit("receiveScore", friendScore)
    })

    socket.on('startAll', ( { isStart, username }) => {
        console.log(isStart)
        const user = getUser(socket.id)
        if(!isStart){
            let start = true;
            socket.to(user.room).emit("readyForStart", start)
        }
        
    })

    socket.on('sendQuiz', ( { random, username }) => {
        const user = getUser(socket.id)
        console.log(random)
        socket.broadcast.to(user.room).emit("receiveQuiz", random)
    })
})





server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})