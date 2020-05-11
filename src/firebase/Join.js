import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default class Join extends Component {
    render() {
        return (
            <div>
                I am join
                <br></br>
            <Link to="Two"><button></button></Link>
            </div>
        )
    }
}
