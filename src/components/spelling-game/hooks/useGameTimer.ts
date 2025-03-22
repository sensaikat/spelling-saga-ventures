
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

export interface UseGameTimerProps {
  enabled?: boolean;
  initialTime?: number;
  onTimerEnd?: () => void;
  onTimeWarning?: () => void;
}

export const useGameTimer = ({
  enabled = true,
  initialTime = 30,
  onTimerEnd,
  onTimeWarning,
}: UseGameTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(enabled);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasWarned = useRef(false);
  
  // Start timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };
  
  // Pause timer
  const pauseTimer = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };
  
  // Resume timer
  const resumeTimer = () => {
    if (isRunning && isPaused) {
      setIsPaused(false);
    }
  };
  
  // Stop timer
  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // Reset timer
  const resetTimer = (newTime?: number) => {
    setTimeRemaining(newTime || initialTime);
    hasWarned.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (enabled) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };
  
  // Warning at low time
  useEffect(() => {
    if (isRunning && timeRemaining <= 10 && !hasWarned.current) {
      toast({
        title: "Time is running out!",
        description: "Hurry up and answer before time expires!",
        variant: "default",
      });
      hasWarned.current = true;
      if (onTimeWarning) {
        onTimeWarning();
      }
    }
  }, [timeRemaining, isRunning, onTimeWarning]);
  
  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            stopTimer();
            if (onTimerEnd) {
              onTimerEnd();
            }
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, timeRemaining, onTimerEnd]);
  
  // Handle disabled state
  useEffect(() => {
    if (!enabled && isRunning) {
      stopTimer();
    }
  }, [enabled, isRunning]);
  
  return {
    timeRemaining,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer
  };
};
