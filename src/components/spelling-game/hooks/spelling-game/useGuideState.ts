
import { useState, useCallback } from 'react';

/**
 * Hook that manages the state of the guide component
 */
export const useGuideState = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  
  // Show the guide with a message
  const showGuideWithMessage = useCallback((message: string) => {
    setShowGuide(true);
    setGuideMessage(message);
  }, []);
  
  // Hide the guide
  const hideGuide = useCallback(() => {
    setShowGuide(false);
  }, []);
  
  return {
    showGuide,
    guideMessage,
    showGuideWithMessage,
    hideGuide
  };
};
