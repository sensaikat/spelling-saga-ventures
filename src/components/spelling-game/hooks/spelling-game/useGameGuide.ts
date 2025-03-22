
import { useEffect } from 'react';
import { useGuideMessages } from './useGuideMessages';
import { useGuideTimers } from './useGuideTimers';
import { useGuideState } from './useGuideState';

/**
 * Hook that provides guide functionality for the game
 */
export const useGameGuide = () => {
  const { 
    showGuide, 
    guideMessage, 
    showGuideWithMessage, 
    hideGuide 
  } = useGuideState();
  
  const { 
    getRouteWelcomeMessage, 
    getRandomInactivityMessage 
  } = useGuideMessages();
  
  const handleInactivityTimerExpire = () => {
    showGuideWithMessage(getRandomInactivityMessage());
  };
  
  const { 
    clearTimers, 
    resetInactivityTimer 
  } = useGuideTimers(handleInactivityTimerExpire);
  
  // Initialize guide visibility based on user's path
  useEffect(() => {
    const welcomeMessage = getRouteWelcomeMessage();
    showGuideWithMessage(welcomeMessage);
    
    // Hide after initial display
    const timer = setTimeout(() => {
      hideGuide();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [getRouteWelcomeMessage, showGuideWithMessage, hideGuide]);
  
  // Automatically show guide after a period of inactivity
  useEffect(() => {
    if (!showGuide) {
      resetInactivityTimer(25000); // Show after 25 seconds of inactivity
      
      return () => {
        clearTimers();
      };
    }
  }, [showGuide, resetInactivityTimer, clearTimers]);
  
  const handleShowGuideWithMessage = (message: string) => {
    // Clear any pending timers
    clearTimers();
    
    showGuideWithMessage(message);
  };
  
  const handleHideGuide = () => {
    hideGuide();
    
    // Reset the auto-hint timer when guide is manually hidden
    resetInactivityTimer();
  };
  
  return {
    showGuide,
    guideMessage,
    showGuideWithMessage: handleShowGuideWithMessage,
    hideGuide: handleHideGuide,
    resetInactivityTimer
  };
};
