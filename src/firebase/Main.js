/* eslint-disable no-unused-expressions */
import React , { Component } from "react";
import fire from "./fire";
import "../homepage.css";
import logo from './logo.png';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import { Single } from './Single';
import { Two } from './Two';
import { Statistics } from './Statistic';
class Main extends Component {
constructor(props)
    {
    super(props)
    this.state= {
        number:[],
        isLoaded: false,
    };

}

// Get the API
componentDidMount(){
    fetch('https://api.thevirustracker.com/free-api?global=stats')
    .then(res => res.json())
    .then(json => {
        this.setState({
            isLoaded: true,
            number: json.results[0].total_cases,
        })
    })
}

// Logout Function
logout(){
    fire.auth().signOut();
};


    

render()
{
    let {isLoaded, number} = this.state;
    if(!isLoaded){
        return <div>Loading... Please Wait!</div>
    }
    else{
    return(
        <Router>
    <div className="homepage-content">
        <img src={logo} className="logo" alt="logo" height="130" width="200"/>
        <h3>Coronavirus Cases In the World</h3>
        <h2>{number}</h2>
        <div className="home-buttons">
            <Link className="home-button">Single-Player</Link>
            <Link className="home-button">Two Player</Link>
            <Link className="home-button">Rules</Link>
            <Link className="home-button">Statistics</Link>
            <Link className="home-button">Create Custom Question</Link>
            <Link onClick={this.logout} className="home-button">Logout</Link>
        </div>
        

    </div>
    </Router>
    )
}
    }
}

export default Main;