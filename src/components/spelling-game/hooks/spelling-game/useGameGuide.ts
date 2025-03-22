
import { useState } from 'react';

export const useGameGuide = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  
  const showGuideWithMessage = (message: string) => {
    setShowGuide(true);
    setGuideMessage(message);
    
    // Hide the guide after animation (removed the auto-hide)
  };
  
  const hideGuide = () => {
    setShowGuide(false);
  };
  
  return {
    showGuide,
    guideMessage,
    showGuideWithMessage,
    hideGuide
  };
};
