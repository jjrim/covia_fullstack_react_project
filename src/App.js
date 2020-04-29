import React, { Component } from 'react';
import './App.css';
import fire from './firebase/fire.js';
import Login from './firebase/Login.js';
import Main from './firebase/Main.js';



class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.user ? (<Main/>) : (<Login/>)}
      </div>
      fd
    );
  }
}



export default App;
