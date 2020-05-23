import React from 'react'
import Lottie from 'react-lottie'
import * as cellVirusCleaning from '../firebase/Animation/PhoneVirus.json'

/******
 * React Lottie in Under 5 Minutes - Tutorial : https://www.youtube.com/watch?v=LIoRZZ_va_o 
 * I followed the instructions in the video to make sure how to use lottiefiles with react correctly
 ********/

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: cellVirusCleaning.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const CellVirusCleaning = () =>{
    return(
        <div>
            <Lottie options={defaultOptions} height = {300} width = {300}/>
        </div>
    );
}
export default CellVirusCleaning; 