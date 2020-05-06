/* eslint-disable no-unused-expressions */
import React , { Component } from "react";
import fire from "./fire";
import Loading from './Loading'
import "../homepage.css";
import logo from './logo.png';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
/* eslint-disable no-unused-expressions */
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';
class Main extends Component {
constructor(props)
    {
    super(props)
    this.state= {
        number:[],
        isLoaded: false,
        open: false,
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

show = (dimmer) => () => this.setState({ dimmer, open: true})
close = () => this.setState({ open: false })
// Logout Function
logout(){
    fire.auth().signOut();
};

    

render()
{   
    let {isLoaded, number, open, dimmer} = this.state;
    if(!isLoaded){
      return <Loading />
    }
    else{
    return(
        
    <div className="homepage-content">
      <Link to='/'> <img src={logo} className="logo" alt="logo" height="130" width="200"/> </Link>
        <h3>Coronavirus Cases In the World</h3>
        <h2>{number}</h2>
        <div className="home-buttons">
            <Link to='/Single'> <button className="home-button ui button instagram" >Single-Player </button> </Link>
            <Link to='/Two'> <button className="home-button ui button instagram" >Two Player </button></Link>
            <button className="home-button ui button instagram" onClick={this.show('blurring')}>Rules</button>
            <Link to='/Statistics'><button className="home-button ui button instagram" >Statistics </button></Link>
            <Link to='/Question'><button className="home-button ui button instagram">Create Custom Question </button></Link>
            <button onClick={this.logout} className="home-button ui button instagram">Logout</button>
        </div>
    
        {/* This is for the Rules Page(Modal Box) */}
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header className="ui center aligned">COVIA</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='large'
              src={logo}
            />
            <Modal.Description>
              <Header className="ui center aligned header brown ">Single Play</Header>
              <p className="ui center">Answer <span className="ui red header">5</span> Questions</p>
              <p><span className="ui red header">5</span> Seconds For Preparation, 
              <span className="ui red header"> 10</span> Seconds For Answer</p>
              <p>Full Mark For Every Question: <span className="ui red header">200</span></p>
              <p><span className="ui red header">20</span> Marks Deduction For Every Second Late</p>
              <p> <span className="ui red header">DOUBLE MARK</span> For The Last Question </p>
              <br></br>
              <Header className="ui center aligned header brown ">Two-Player</Header>
              <p><span className="ui red header">Same</span> Rule With The Single Play</p>
              <p><span className="ui red header">Invite Your Friend </span></p>
              <p>Compare The Scores At Last</p>
              <p>Who Is The Winner?</p>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Play The Game"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
    </div>
           
           
        
    )
}
    }
}

export default Main;