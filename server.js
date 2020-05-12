const express = require('express');
const app = express();
const randomString = require('randomstring')
const socketio = require('socket.io');
const http = require('http')
const PORT = process.env.PORT || 5000
const server = http.createServer(app);
const io = socketio(server)
const router = express.Router()
const { QuizData } = require('./database')
const users = [];


// Local Test Bank

// Shuffle the questions
let newArray = QuizData.sort(() => {
    return 0.5 - Math.random()
})
let fiveQuestions = newArray.slice(QuizData, 5)
// Shuffle the options
for(let i = 0; i < 5; i++){
    fiveQuestions[i].options.sort( () => {
        return 0.5 - Math.random()
    })
}

console.log(fiveQuestions);

const newGame = (leftPlayer) => ({
    
    leftPlayer,
    rightPlayer: null

})



const addUser = ( { id, name } ) => {
    name = name.trim().toLowerCase()
    const existingUser = users.find((user) => user.name === name)

    if(existingUser){
        return { error: 'Username is taken'}
    }

    const user = { id, name }
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


router.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(router)



io.on('connect', (socket) => {
    console.log('New user comes!')


    
    socket.on('disconnect', () => {
        console.log('User had left')
    })
    socket.emit('start', { start: true })

    socket.on('addUser', ({ username }, callback) =>{
        console.log(username);
        callback(
            
        )
    })
})





server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})