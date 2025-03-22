
import { useState } from 'react';

export const useGameGuide = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  
  const showGuideWithMessage = (message: string) => {
    setShowGuide(true);
    setGuideMessage(message);
    
    // Hide the guide after animation
    setTimeout(() => {
      setShowGuide(false);
    }, 2000);
  };
  
  return {
    showGuide,
    guideMessage,
    showGuideWithMessage
  };
};
