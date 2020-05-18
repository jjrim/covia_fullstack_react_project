import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import '../join.css'
import fire from "./fire";


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
