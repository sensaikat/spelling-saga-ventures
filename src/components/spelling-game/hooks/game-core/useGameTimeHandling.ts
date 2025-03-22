
import { useCallback } from 'react';
import { useGameTimer, UseGameTimerProps } from '../game-state/useGameTimer';

export const useGameTimeHandling = (onTimeUp: () => void, initialTime: number = 60) => {
  const timerProps: UseGameTimerProps = {
    onTimeUp,
    initialTime
  };
  
  const { 
    isTimerRunning, 
    timeRemaining, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useGameTimer(timerProps);
  
  const handleTimeout = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);
  
  return {
    isTimerRunning,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer,
    handleTimeout
  };
};
