import React from 'react'
import Lottie from 'react-lottie'
import * as cellVirusCleaning from './Animation/PhoneVirus.json'

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