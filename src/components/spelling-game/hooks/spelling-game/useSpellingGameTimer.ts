
import { useEffect } from 'react';
import { useGameTimer } from '../../hooks/useGameTimer';

interface UseSpellingGameTimerProps {
  handleSubmit: (e: React.FormEvent) => void;
  gameCompleted: boolean;
}

export const useSpellingGameTimer = ({ 
  handleSubmit, 
  gameCompleted 
}: UseSpellingGameTimerProps) => {
  const handleTimeout = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const { 
    timeRemaining, 
    isRunning: isTimerRunning, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useGameTimer({
    enabled: true,
    initialTime: 60,
    onTimerEnd: handleTimeout,
  });
  
  // Reset timer when game is completed
  useEffect(() => {
    if (gameCompleted) {
      pauseTimer();
    }
  }, [gameCompleted, pauseTimer]);
  
  return {
    timeRemaining,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
