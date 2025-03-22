
import { useState, useEffect } from 'react';

export const useGameTimer = (gameFinished: boolean) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Timer for elapsed time
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (!gameFinished) {
      intervalId = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [gameFinished]);
  
  const resetTimer = () => {
    setElapsedTime(0);
  };

  const startTimer = () => {
    // Timer starts automatically via useEffect when gameFinished is false
    setElapsedTime(0);
  };

  const stopTimer = () => {
    // Timer stops automatically via useEffect when gameFinished is true
  };
  
  return {
    elapsedTime,
    resetTimer,
    startTimer,
    stopTimer
  };
};
