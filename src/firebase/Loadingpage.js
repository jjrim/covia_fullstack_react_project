import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function App() {

  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./loading.json')
    })
  }, [])
  
  return (
    <div className="App">
      <h1 className = "ui center header"> Page is loading</h1>
      <div className="small container" ref={container}></div>
    </div>
  );
}

export default App;