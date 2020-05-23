import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../CreateQuestions.css"
import WrittingQuestion from '../lottie-elements/CreateQuestionLottie'
import fire from "../firebase/fire";
export default class Navbar extends Component {

  logout(){
    fire.auth().signOut();
};

  render() {
    return (
      <div className="ui container" id = "createOrViewQuestionDive">
        <div>
          <WrittingQuestion />
        </div>
        <div id = "createOrViewLink" className="ui container">  
          <Link to="/create"> <button className = "ui teal button" id = "createQuestionBtn">Create Custom Question</button></Link>
          <br/>
          <Link to="/exerciseslist"> <button className = "ui blue button" id= "viewQuestionBtn" >View List of Questions</button></Link>
          <br/>
        </div>

        <div> 
    <Link to="/">      <button className = "ui blue inverted small button" id = "createPageGoBackBtn">Back</button>   </Link>
     <Link to="/" onClick={this.logout}>    <button className = "ui blue inverted small button" >Sign Out</button>   </Link> 
        </div>


      </div>
    );
  }
}