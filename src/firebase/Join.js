import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import '../join.css'
import fire from "./fire";

/*******************************************************************************************************************************
            Citing From:
https://www.youtube.com/watch?v=ZwFA3YMfkoc  -- Build and Deploy a Realtime Chat Application - Socket.io, Node.js, and React.js

This video taught me how to use REACT HOOK to create a Join Room page

And also, it let me know how to send and receive data between client and server through Socket.io

Since this video only taught me how to make the Chatting room rather than the Game, I spent so many time on the Multi-player Page 

In the server/index.js, I use his method to create a function that adds user to the room

            Luke Mei

********************************************************************************************************************************/


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    
    return(
        <div id = 'joinDiv'>
            <h1 class="ui purple huge header">Join a Game</h1>
            <div id = "connectSearch">
                <div class="ui small icon input"><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}></input></div>
                <br></br>
                <div class="ui small icon input"><input placeholder="Room(Optional)" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)}></input></div>
                <br></br>
            </div>
            <Link onClick={event => !name ? event.preventDefault() : null}  to={`/mul/Two?name=${name}&room=${room}`}>
            <button class="ui purple button" type="submit">Enter the game</button>
            <br></br>
            </Link>
            <div id = "homeOrQuitBtn">
            <Link to="/">   <button class="ui inverted blue large button">Home</button>  </Link>
            <Link to="/" onClick={() => { fire.auth().signOut();}}>   <button class="ui inverted purple large button">  Sign Out  </button>  </Link>
            </div>
            <h1 class="ui purple small header">Match A Stranger For Empty Room</h1>
        </div>


    )


}

export default Join
