import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const initialTimeRef = useRef(0);

  const handleInputChange = useCallback((event) => {
    const inputValue = parseInt(event.target.value, 10) || 0;

    if (inputValue < 0) {
      alert("Value should not be less than 0");
      return;
    }

    initialTimeRef.current = inputValue;

    if (!buttonClicked) {
      setTime(inputValue);
    }
  }, [buttonClicked]);

  const startTimer = useCallback(() => {
    setIsPaused(false);
    setButtonClicked(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsPaused(true);
    setButtonClicked(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsPaused(true);
    initialTimeRef.current = 0;
    setTime(0);
    setButtonClicked(false);
    document.querySelector('.input').value = "";
  }, []);

  useEffect(() => {
    initialTimeRef.current = time;
    if (!isPaused && time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [time, isPaused]);

  const formattedTime = useMemo(() => `${Math.floor(time / 60)} minute ${time % 60} sec`, [time]);

  return (
    <>
      <div className='container'>
        <h2>Enter Value Of Timer</h2>
        <input
          className='input'
          type='number'
          placeholder='Time ...'
          onChange={handleInputChange}
        />
        <h1 className='timer'>Timer: {formattedTime}</h1>
        <div>
          <button className='start-btn' onClick={startTimer}>
            Start
          </button>
          <button className='stop-btn' onClick={stopTimer}>
            Stop
          </button>
          <button className='reset-btn' onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
