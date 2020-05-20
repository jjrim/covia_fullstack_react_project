import React from 'react'
import Lottie from 'react-lottie'
import * as writtingQuestion from './Animation/CreateQuestion.json'

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
            <Lottie options={defaultOptions} height = {200} width = {200}/>
        </div>
    );
}
export default WrittingQuestion; 