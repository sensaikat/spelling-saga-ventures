
import { useState, useEffect, useCallback } from 'react';

export interface UseGameTimerProps {
  onTimeUp: () => void;
  initialTime?: number;
}

export const useGameTimer = ({ onTimeUp, initialTime = 60 }: UseGameTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimerRunning(false);
            onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timeRemaining, onTimeUp]);
  
  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);
  
  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);
  
  const resetTimer = useCallback((newTime?: number) => {
    setTimeRemaining(newTime || initialTime);
    setIsTimerRunning(false);
  }, [initialTime]);
  
  return {
    isTimerRunning,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
