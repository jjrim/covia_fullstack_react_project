import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.User.username}</td>
    <td>{props.User.question}</td>




  </tr>
)

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);


    this.state = {user: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }



  userList() {
    return this.state.exercises.map(currentexercise => {
      return <User exercise={currentexercise}  key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Leaderboard</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th>username</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}