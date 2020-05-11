const express = require('express');
const socketio = require('socket.io');
const http = require('http')

const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server)

const router = express.Router()


router.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(router)

io.on('connect', (socket) => {
    console.log('New user comes!')
    
    socket.on('disconnect', () => {
        console.log('Use had left')
    })
})

let onlineUsers = {};


server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})