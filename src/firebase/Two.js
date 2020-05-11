import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import $ from 'jquery'
export default class Two extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: ""
        }

    }

    connect(){
        let socket = io('localhost:5000/')
        socket.emit('Hello', 'sbdx');
        socket.on('connect', () => {
            console.log('Data received')
        })
    }
   
    addName(){
        let name = $('.name').val();
        this.setState({
            username: name
        })
    }


    render() {
        let { username } = this.state
        if(!username){
            return (
                <div>
                    <br></br>
                 Name:   <input className="name ui input instagram"></input>
                    <br></br><br></br>
                <button className="ui button instagram" onClick={() => this.addName()}>Join</button>
                </div>
            )
        }
        else{
        return (
            <div>
                <br></br>
                    <h2>Hello, { username }</h2>
                <button className="ui button instagram" onClick={this.connect}>Send</button>
            </div>
        )
        }
    }

}