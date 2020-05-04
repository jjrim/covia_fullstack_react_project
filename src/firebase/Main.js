/* eslint-disable no-unused-expressions */
import React , { Component } from "react";
import fire from "./fire";
import "../homepage.css";
import logo from './logo.png';
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
        <img src={logo} className="logo" alt="logo" height="130" width="200"/>
        <h3>Coronavirus Cases In the World</h3>
        <h2>{number}</h2>
        <div className="home-buttons">
            <button className="home-button">Single-Player</button>
            <button className="home-button">Two Player</button>
            <button className="home-button">Rules</button>
            <button className="home-button">Statistics</button>
            <button className="home-button">Create Custom Question</button>
            <button onClick={this.logout} className="home-button">Logout</button>
        </div>
        

    </div>

    )
}
    }
}

export default Main;