import React , { Component } from "react";
import Bgm from './SoundClips/Bgm.mp3'

class Music extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true,
    }
    this.audio = new Audio(Bgm);
  }

  play = () => {
  this.setState({ play: true, pause: false })
    this.audio.play();
  }
  
  pause = () => {
  this.setState({ play: false, pause: true })
    this.audio.pause();
  }
  
  render() {
    
  return (
    <div>
      <button class="ui violet small button" onClick={this.play}><i class = "play icon" ></i>Play Music</button>
      <button class="ui teal small button" onClick={this.pause}><i class = "pause icon" ></i>Pause Music</button> 
    </div>
    );
  }
}
export default Music; 