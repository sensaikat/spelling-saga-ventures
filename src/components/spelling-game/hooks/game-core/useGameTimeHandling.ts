
import { useState, useCallback, useEffect } from 'react';

interface UseGameTimeHandlingProps {
  initialTime?: number;
  isGameCompleted?: boolean;
  onTimeout?: () => void;
  enabled?: boolean;
}

export const useGameTimeHandling = ({
  initialTime = 60,
  isGameCompleted = false,
  onTimeout = () => {},
  enabled = true
}: UseGameTimeHandlingProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimer = useCallback(() => {
    if (enabled) {
      setIsRunning(true);
    }
  }, [enabled]);
  
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  const resetTimer = useCallback((newTime: number = initialTime) => {
    setTimeRemaining(newTime);
    setIsRunning(false);
  }, [initialTime]);
  
  // Timer effect that counts down when running
  useEffect(() => {
    let timerInterval: number | undefined;
    
    if (isRunning && !isGameCompleted && timeRemaining > 0 && enabled) {
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
  }, [isRunning, isGameCompleted, timeRemaining, pauseTimer, onTimeout, enabled]);
  
  return {
    timeRemaining,
    isTimerRunning: isRunning,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
