import React, { Component } from 'react';
import './App.css';
import fire from './firebase/fire.js';
import Home from './firebase/Home.js';
import Loginrouter from './firebase/Loginrouter.js';
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
        {this.state.user ? (<Home/>) : (<Loginrouter/>)}
      </div>
    );
  }
}



export default App;
