import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.score}</td>


  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }



  userList() {
     return this.state.users.map(currentuser => {
      return   <User user={currentuser}  key={currentuser._score}/>;
    })
  }

  // export default ({ notes }) => (
  //   <div className="notes-list">
  //     {notes.sort((a, b) => { return (a.date > b.date) ? 1 : -1 }).map(none => (
  //       <Note note={none} key={`note-${none._id}`} />
  //     ))}
  //   </div>
  // );

//   userList() {
//     return this.state.users.sort((a,b) => {
//      return   <User user={currentuser}  key={currentuser._score}/>;
//    })
//  }





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