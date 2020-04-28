import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';
import firebase from './firebase/firebase.js';
import Login from './firebase/Login.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : {}
    }
  }
// componentDidMount() {
//   this.authListner
// }
  authListner() {
    firebase.auth().onAuthStateChanger((user) => {
      if(user) {
        this.setState({user})
      
      }
      else{
        this.setState({user: null})
      }
    })
  }

  render(){
    return(
      <div className="App">
      {this.state.user ? <Home /> : <Login />}
        </div>
    )
  }
}



export default App;
