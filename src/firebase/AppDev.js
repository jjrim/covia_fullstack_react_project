import React from 'react'
import Lottie from 'react-lottie'
import * as appDev from './Animation/AppDev.json'

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