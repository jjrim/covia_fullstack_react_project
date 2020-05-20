import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../firebase/Animation/loading.json'

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