import React from 'react'
import Lottie from 'react-lottie'
import * as writtingQuestion from '../firebase/Animation/CreateQuestion.json'

/******
 * React Lottie in Under 5 Minutes - Tutorial : https://www.youtube.com/watch?v=LIoRZZ_va_o 
 * I followed the instructions in the video to make sure how to use lottiefiles with react correctly
 ********/

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: writtingQuestion.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const WrittingQuestion = () =>{
    return(
        <div style = {{marginTop: '2 rem'}}>
            <Lottie options={defaultOptions} height = {150} width = {150}/>
        </div>
    );
}
export default WrittingQuestion; 