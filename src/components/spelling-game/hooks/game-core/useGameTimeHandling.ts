
import { useState, useCallback, useEffect } from 'react';

interface UseGameTimeHandlingProps {
  initialTime?: number;
  isGameCompleted: boolean;
  onTimeout: () => void;
}

export const useGameTimeHandling = ({
  initialTime = 60,
  isGameCompleted,
  onTimeout
}: UseGameTimeHandlingProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);
  
  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);
  
  const resetTimer = useCallback((newTime: number = initialTime) => {
    setTimeRemaining(newTime);
    setIsTimerRunning(false);
  }, [initialTime]);
  
  // Timer effect that counts down when running
  useEffect(() => {
    let timerInterval: number | undefined;
    
    if (isTimerRunning && !isGameCompleted && timeRemaining > 0) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            pauseTimer();
            onTimeout();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isTimerRunning, isGameCompleted, timeRemaining, pauseTimer, onTimeout]);
  
  return {
    timeRemaining,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
