/* eslint-disable no-unused-expressions */
import React , { Component } from "react";
import fire from "./fire";
import Loading from './Loading'
import "../homepage.css";
import logo from './logo.png';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
/* eslint-disable no-unused-expressions */
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';

/* Lottie elements*/
import CellVirusCleaning from './PhoneVirusLottie'
import ReadingRule from './RuleLottie'

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
    
    // if the API sucks, after 2 seconds would cancel loading and show the homepage
    setTimeout(() => {
      this.cancelLoad()
    }, 2000);
}

cancelLoad = () => {
  this.setState({
    isLoaded: true
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

      <div id = "homeBtn">
      <div className =" ui container api">
        <h3 id = "homeH1" >Coronavirus Cases In the World</h3>
        <h2 id = "apiNumber">{number}</h2>
      </div>
        <div className="home-buttons">
            <Link to='/Single'> <button className="home-button ui button instagram" > <i class = "chess pawn icon"> </i>Single-Player </button> </Link> 
            <Link to='/mul/Join'> <button className="home-button ui button instagram" ><i class = "chess icon"> </i>Two Player </button></Link>
            <button className="home-button ui button instagram" onClick={this.show('blurring')}><i class = "attention icon"> </i>Rules</button> 
            <Link to='/Statistics'><button className="home-button ui button instagram" ><i class = "chart pie icon"> </i>Statistics </button></Link>
            <Link to='/Question'><button className="home-button ui button instagram"> <i class = "add icon"> </i> Create Custom Question </button></Link>
            <button onClick={this.logout} className="home-button ui button instagram"><i class = "sign-out icon"> </i>Sign Out</button> 
        </div>
      </div>
        <div className = "ui container"> 
              <CellVirusCleaning />
              <p>* remember to clean your screen after play!</p>
              <br/>
        </div>
    
        {/* This is for the Rules Page(Modal Box) */}
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header className="ui center aligned">COVIA Rule</Modal.Header>
          <Modal.Content image>
            <ReadingRule
              wrapped
              size='large'
            />
            <Modal.Description>
              <Header className="ui center aligned header blue ">Single Player</Header>
              <p className="ui center aligned">Answer <span className="ui red header">5</span> Questions for each game round</p>
              <p>You have <span className="ui red header">5</span> Seconds For Preparation, 
              <span className="ui red header"> 10</span> Seconds For Answering</p>
              <p>The Full Mark For Every Question is <span className="ui red header">200</span> points</p>
              <p>There is a <span className="ui red header">20</span> Marks Deduction For Every Second Proceed</p>
              <p>You can earn <span className="ui red header">DOUBLE MARKS</span> For The Last Question </p>
              <br></br>
              <Header className="ui center aligned header blue ">Two-Player</Header>
              <p><span className="ui red header">Same</span> Rule As The Single Player</p>
              <p>Plus you can <span className="ui red header">Invite Your Friend </span> or Play with a <span className="ui red header">Stranger  </span></p>
              <p>Compare The Scores At the End</p>
              <p>Are You The Winner?</p>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="I understood"
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