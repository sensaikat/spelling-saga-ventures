
import { useState, useCallback, useEffect } from 'react';
import { useGameSettings } from './useGameSettings';

/**
 * Props for the useGameTimeHandling hook
 * @interface UseGameTimeHandlingProps
 * @property {number} initialTime - Initial time in seconds (default from settings)
 * @property {boolean} isGameCompleted - Whether the game is completed
 * @property {Function} onTimeout - Callback function to execute when timer reaches zero
 * @property {boolean} enabled - Whether the timer is enabled (default: true)
 */
interface UseGameTimeHandlingProps {
  initialTime?: number;
  isGameCompleted?: boolean;
  onTimeout?: () => void;
  enabled?: boolean;
}

/**
 * Hook for handling game timing functionality
 * 
 * This hook provides timer functionality for the spelling game:
 * - Countdown timer that decrements every second
 * - Start/pause/reset controls
 * - Auto-pauses when game is completed
 * - Executes callback when timer reaches zero
 * - Can be disabled entirely with the enabled prop
 * 
 * @param {UseGameTimeHandlingProps} props - Timer configuration
 * @returns Timer state and control functions
 */
export const useGameTimeHandling = ({
  initialTime,
  isGameCompleted = false,
  onTimeout = () => {},
  enabled = true
}: UseGameTimeHandlingProps) => {
  // Get game settings
  const { settings } = useGameSettings({ 
    overrides: initialTime ? { initialTime } : undefined 
  });
  
  const [timeRemaining, setTimeRemaining] = useState(settings.initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  /**
   * Starts the timer if enabled
   */
  const startTimer = useCallback(() => {
    if (enabled) {
      setIsRunning(true);
    }
  }, [enabled]);
  
  /**
   * Pauses the timer
   */
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  /**
   * Resets the timer to a new time value or the initial time
   * @param {number} newTime - New time in seconds (default: initialTime)
   */
  const resetTimer = useCallback((newTime: number = settings.initialTime) => {
    setTimeRemaining(newTime);
    setIsRunning(false);
  }, [settings.initialTime]);
  
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
