import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../CreateQuestions.css"
import WrittingQuestion from '../firebase/CreateQuestionLottie'

export default class Navbar extends Component {

  render() {
    return (
      <div className="ui container" id = "createOrViewQuestionDive">
        <div id = "createOrViewLink" className="ui container">  
          <Link to="/create"> <button className = "ui teal button" id = "createQuestionBtn">Create Custom Question</button></Link>
          <br/>
          <Link to="/"> <button className = "ui blue button" id= "viewQuestionBtn" >View List of Questions</button></Link>
        </div>

        <div>
          <WrittingQuestion />

        </div>
      </div>
    );
  }
}