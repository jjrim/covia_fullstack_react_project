import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeOption1 = this.onChangeOption1.bind(this);
    this.onChangeOption2 = this.onChangeOption2.bind(this);
    this.onChangeOption3 = this.onChangeOption3.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      answer: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeQuestion(e) {
    this.setState({
      question: e.target.value
    })
  }

  onChangeOption1(e) {
    this.setState({
      option1: e.target.value
    })
  }

  onChangeOption2(e) {
    this.setState({
      option2: e.target.value
    })
  }

  onChangeOption3(e) {
    this.setState({
      option3: e.target.value
    })
  }

  
  onChangeAnswer(e) {
    this.setState({
      answer: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      question: this.state.question,
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      answer: this.state.answer
    }

    console.log(exercise);

    axios.post('http://localhost:8000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Question: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.question}
              onChange={this.onChangeQuestion}
              />
        </div>
        <div className="form-group"> 
          <label>Option1: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.option1}
              onChange={this.onChangeOption1}
              />
        </div>
        <div className="form-group"> 
          <label>Option2: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.option2}
              onChange={this.onChangeOption2}
              />
        </div>
        <div className="form-group"> 
          <label>Option3: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.option3}
              onChange={this.onChangeOption3}
              />
        </div>
        <div className="form-group"> 
          <label>Answer: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.answer}
              onChange={this.onChangeAnswer}
              />
        </div>
      


        <div className="form-group">
          <input type="submit" value="Create Custom Question" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}