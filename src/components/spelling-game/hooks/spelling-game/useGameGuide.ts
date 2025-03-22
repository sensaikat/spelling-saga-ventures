
import { useState, useEffect } from 'react';

export const useGameGuide = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  const [autoHintTimer, setAutoHintTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Automatically show guide after a period of inactivity
  useEffect(() => {
    if (!showGuide) {
      const timer = setTimeout(() => {
        const inactivityMessages = [
          "Need a hint? I'm here to help!",
          "Stuck? Try using a hint or ask me for help.",
          "Remember, you can navigate to other sections using the menu above.",
          "Take your time and listen to the word again if you need to."
        ];
        
        const randomIndex = Math.floor(Math.random() * inactivityMessages.length);
        setGuideMessage(inactivityMessages[randomIndex]);
        setShowGuide(true);
      }, 20000); // Show after 20 seconds of inactivity
      
      setAutoHintTimer(timer);
      
      return () => {
        if (autoHintTimer) {
          clearTimeout(autoHintTimer);
        }
      };
    }
  }, [showGuide, autoHintTimer]);
  
  const showGuideWithMessage = (message: string) => {
    // Clear any pending auto-hint timer
    if (autoHintTimer) {
      clearTimeout(autoHintTimer);
      setAutoHintTimer(null);
    }
    
    setShowGuide(true);
    setGuideMessage(message);
  };
  
  const hideGuide = () => {
    setShowGuide(false);
    
    // Reset the auto-hint timer when guide is manually hidden
    if (autoHintTimer) {
      clearTimeout(autoHintTimer);
      setAutoHintTimer(null);
    }
  };
  
  // Reset the timer on user activity
  const resetInactivityTimer = () => {
    if (autoHintTimer) {
      clearTimeout(autoHintTimer);
    }
    
    const timer = setTimeout(() => {
      const inactivityMessages = [
        "Need a hint? I'm here to help!",
        "Stuck? Try using a hint or ask me for help.",
        "Remember, you can navigate to other sections using the menu above.",
        "Take your time and listen to the word again if you need to."
      ];
      
      const randomIndex = Math.floor(Math.random() * inactivityMessages.length);
      setGuideMessage(inactivityMessages[randomIndex]);
      setShowGuide(true);
    }, 30000); // Show after 30 seconds of inactivity
    
    setAutoHintTimer(timer);
  };
  
  return {
    showGuide,
    guideMessage,
    showGuideWithMessage,
    hideGuide,
    resetInactivityTimer
  };
};
