import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div>
            <h1>Join</h1>
            <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}></input></div>
            <div><input placeholder="Room" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)}></input></div>
            <br></br>
            <Link onClick={event => (!name || ! room) ? event.preventDefault() : null}  to={`/mul/Two?name=${name}&room=${room}`}>
            <button type="submit">Sign In</button>
            </Link>
        </div>


    )


}

export default Join
