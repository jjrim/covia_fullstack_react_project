import React from 'react'
import Lottie from 'react-lottie'
import * as stayHome from '../firebase/Animation/StayHome.json'

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: stayHome.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const Staying = () =>{
    return(
        <div>
            <Lottie options={defaultOptions} height = {200} width = {200}/>
        </div>
    );
}
export default Staying; 