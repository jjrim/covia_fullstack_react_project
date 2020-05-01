import React , { Component } from "react";
import fire from "./fire";
import "../homepage.css";
import logo from './logo.png';
class Main extends Component {
constructor(props)
{
    super(props)
    this.state={

    }
}
logout(){
    fire.auth().signOut();
}

render()
{
    return(


    <div className="homepage-content">
        <img src={logo} className="logo" alt="logo" height="130" width="200"/>
        <h3>Coronavirus Cases In the World</h3>
        <h2>3,000,000</h2>
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

export default Main;