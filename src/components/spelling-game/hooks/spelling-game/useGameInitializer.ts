
import { useEffect } from 'react';
import { Language } from '../../../../utils/game';

interface GameInitializerProps {
  startTimer: () => void;
  stopTimer: () => void;
  showGuideWithMessage: (message: string) => void;
  hideGuide: () => void;
  selectedLanguage: Language | null;
  currentWord: any;
}

export const useGameInitializer = ({
  startTimer,
  stopTimer,
  showGuideWithMessage,
  hideGuide,
  selectedLanguage,
  currentWord
}: GameInitializerProps) => {
  
  useEffect(() => {
    startTimer();
    
    // Introduce the cultural context
    if (selectedLanguage && currentWord) {
      setTimeout(() => {
        showGuideWithMessage(`Welcome to learning ${selectedLanguage.name}! Let's explore words related to ${currentWord.difficulty === 'easy' ? 'everyday items' : 'cultural elements'}!`);
      }, 1000);
      
      setTimeout(hideGuide, 4000);
    }
    
    return () => {
      stopTimer();
    };
  }, []);
  
  const handlePlayAgainClick = () => {
    // This will be implemented by the consumer hook
  };
  
  return {
    handlePlayAgainClick
  };
};
