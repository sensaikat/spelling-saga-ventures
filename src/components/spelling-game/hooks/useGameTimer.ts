
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseGameTimerProps {
  defaultTime?: number; // in seconds
  onTimeUp?: () => void;
  isEnabled?: boolean;
}

export const useGameTimer = ({ 
  defaultTime = 30, 
  onTimeUp, 
  isEnabled = true 
}: UseGameTimerProps = {}) => {
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [hasGivenWarning, setHasGivenWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer
  const startTimer = () => {
    if (isEnabled) {
      setIsRunning(true);
      setHasGivenWarning(false);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = (newTime?: number) => {
    setTimeRemaining(newTime || defaultTime);
    setIsRunning(false);
    setHasGivenWarning(false);
  };

  // Set a custom time
  const setCustomTime = (seconds: number) => {
    setTimeRemaining(seconds);
  };

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
        
        // Give a warning when 10 seconds remain
        if (timeRemaining === 10 && !hasGivenWarning) {
          toast({
            title: "Time's running out!",
            description: "Hurry up, only 10 seconds left!",
            variant: "warning",
          });
          setHasGivenWarning(true);
        }
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      setIsRunning(false);
      if (onTimeUp) {
        onTimeUp();
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, timeRemaining, onTimeUp, hasGivenWarning]);

  return {
    timeRemaining,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    setCustomTime
  };
};
