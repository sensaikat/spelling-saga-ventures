
import { useState, useRef, useCallback } from 'react';

/**
 * Hook that manages timers for the guide component
 */
export const useGuideTimers = (onTimerExpire: () => void) => {
  const [autoHintTimer, setAutoHintTimer] = useState<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any existing timers
  const clearTimers = useCallback(() => {
    if (autoHintTimer) {
      clearTimeout(autoHintTimer);
      setAutoHintTimer(null);
    }
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, [autoHintTimer]);
  
  // Reset the inactivity timer
  const resetInactivityTimer = useCallback((delayMs: number = 30000) => {
    clearTimers();
    
    const timer = setTimeout(() => {
      onTimerExpire();
    }, delayMs);
    
    setAutoHintTimer(timer);
    inactivityTimerRef.current = timer;
  }, [clearTimers, onTimerExpire]);
  
  return {
    clearTimers,
    resetInactivityTimer
  };
};
