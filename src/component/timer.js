import React, { useState, useEffect } from 'react';
import './timer.css'

const Timer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (!isPaused && time > 0) {
      const timerId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
   
  }, [time , isPaused]); 
  const handlePauseResume = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
    setButtonClicked(!buttonClicked);
  };

  return (
    <>
    <div className='container'>
      <h1 className='timer'>Timer: {time} seconds</h1>
      <button className= {buttonClicked?'clicked-btn':'btn'} onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'} </button>
    </div>
    </>
  );
};

export default Timer;
