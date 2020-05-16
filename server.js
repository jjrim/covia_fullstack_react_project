const express = require('express');
const app = express.createServer(express.logger());
const randomString = require('randomstring')
const socketio = require('socket.io');
const http = require('http')
const PORT = process.env.PORT || 5000
const server = http.createServer(app);
const io = socketio(server)
const router = express.Router()
const { QuizData } = require('./database')

app.use(express.static(__dirname + '/public'))

io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });
  
console.log(QuizData);


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

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => users.find( (user) => user.id === id )

const getUsersInRoom = (room) => users.filter((user) => user.room === room)


let userList = []


router.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(router)



io.on('connect', (socket) => {
    console.log('New user comes!')

    socket.on('join',({ username, room }, callback) => {
        const  { user } = addUser( { id: socket.id, username, room})

        socket.broadcast.to(username.room).emit('addUser', { username })
        socket.join(username.room)
    })
    
    socket.on('disconnect', () => {
        console.log('User had left')
    })
    socket.emit('start', { start: true })

    socket.on('sendScore', ( { score }) => {
        console.log(score)
        socket.broadcast.emit('sendScore', score)
    })

    socket.emit('loadQuiz', (QuizData))

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
})





server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})