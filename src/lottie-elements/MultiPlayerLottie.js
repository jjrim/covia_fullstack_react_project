import React from 'react'
import Lottie from 'react-lottie'
import * as multiUserPlaying from '../firebase/Animation/Teamwork.json'

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: multiUserPlaying.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const MultiUserPlaying = () =>{
    return(
        <div style = {{marginTop: '10rem'}}>
            <Lottie options={defaultOptions} height = {200} width = {200}/>
        </div>
    );
}
export default MultiUserPlaying; 