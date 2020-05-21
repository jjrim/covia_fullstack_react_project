import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fire from "../firebase/fire";

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
    axios.get('https://covia-backend.herokuapp.com/users/')
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
        <h3 class = "ui huge purple header">Score Board</h3>
        <table className="ui table">
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
        <div>
        <Link to="/">   <button class="ui inverted blue large button">Home</button>  </Link>
        <Link to="/" onClick={() => { fire.auth().signOut();}}>   <button class="ui inverted purple large button">  Sign Out  </button>  </Link>
        </div>
    </div>

      
    )
  }
}