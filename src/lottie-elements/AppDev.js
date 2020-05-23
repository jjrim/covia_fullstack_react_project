import React from 'react'
import Lottie from 'react-lottie'
import * as appDev from '../firebase/Animation/AppDev.json'

/******
 * React Lottie in Under 5 Minutes - Tutorial : https://www.youtube.com/watch?v=LIoRZZ_va_o 
 * I followed the instructions in the video to make sure how to use lottiefiles with react correctly
 ********/

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: appDev.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const DevelopingApp = () =>{
    return(
        <div>
            <Lottie options={defaultOptions} height = {300} width = {300}/>
        </div>
    );
}
export default DevelopingApp; 