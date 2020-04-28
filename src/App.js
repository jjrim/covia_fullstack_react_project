import React, { Component } from 'react';
// import logo from './assets/logo.png';
import './App.css';
import firebase from './firebase/Firebase.js';
import Login from './firebase/Login.js';
import Main from './firebase/Main.js';



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
      {this.state.user ? <Login /> : <Main />}
        </div>
    )
  }
}



export default App;
