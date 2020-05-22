import React from 'react'
import Lottie from 'react-lottie'
import * as multiUserPlaying from '../firebase/Animation/Teamwork.json'

/******
 * React Lottie in Under 5 Minutes - Tutorial : https://www.youtube.com/watch?v=LIoRZZ_va_o 
 * I followed the instructions in the video to make sure how to use lottiefiles with react correctly
 ********/

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