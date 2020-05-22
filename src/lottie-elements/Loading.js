import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../firebase/Animation/loading.json'

/******
 * React Lottie in Under 5 Minutes - Tutorial : https://www.youtube.com/watch?v=LIoRZZ_va_o 
 * I followed the instructions in the video to make sure how to use lottiefiles with react correctly
 ********/

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const Loading = () =>{
    return(
        <div style = {{marginTop: '10rem'}}>
            <Lottie options={defaultOptions} height = {400} width = {400}/>
        </div>
    );
}
export default Loading; 