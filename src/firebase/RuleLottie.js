import React from 'react'
import Lottie from 'react-lottie'
import * as readingRule from './Animation/Rule.json'

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: readingRule.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const ReadingRule = () =>{
    return(
        <div>
            <Lottie options={defaultOptions} height = {300} width = {300}/>
        </div>
    );
}
export default ReadingRule; 