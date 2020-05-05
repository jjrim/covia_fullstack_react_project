/* eslint-disable no-unused-expressions */
import React , { Component } from "react";
import fire from "./fire";
import "../homepage.css";
import logo from './logo.png';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';
import Single from './Single';
import Two from './Two';
import Statistics from './Statistic';
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
        
    <div className="homepage-content">
      <Link to='/'> <img src={logo} className="logo" alt="logo" height="130" width="200"/> </Link>
        <h3>Coronavirus Cases In the World</h3>
        <h2>{number}</h2>
        <div className="home-buttons">
            <Link to='/Single'> <button className="home-button" >Single-Player </button> </Link>
            <Link to='/Two'> <button className="home-button" >Two Player </button></Link>
            <button className="home-button">Rules</button>
            <Link to='/Statistics'><button className="home-button" >Statistics </button></Link>
            <Link to='/Question'><button className="home-button">Create Custom Question </button></Link>
            <button onClick={this.logout} className="home-button">Logout</button>
        </div>
    </div>
           
        
    )
}
    }
}

export default Main;