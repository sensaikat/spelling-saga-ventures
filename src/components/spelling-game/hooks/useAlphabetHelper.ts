import { useState, useEffect } from 'react';
import { useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';

export const useAlphabetHelper = () => {
  const [showAlphabetHelper, setShowAlphabetHelper] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const { selectedLanguage } = useGameStore();
  
  useEffect(() => {
    if (!selectedLanguage) return;
    
    // Languages that typically need the alphabet helper enabled by default
    const nonLatinScripts = ['hi', 'bn', 'or', 'ta', 'te', 'ar', 'zh', 'ur', 'doi', 'as', 'si', 'gu', 'ps'];
    
    if (nonLatinScripts.includes(selectedLanguage.id)) {
      setShowAlphabetHelper(true);
    } else {
      // For Latin-based scripts, keep it hidden by default
      setShowAlphabetHelper(false);
    }
  }, [selectedLanguage]);
  
  const handleAlphabetHelperToggle = () => {
    setShowAlphabetHelper(!showAlphabetHelper);
    toast({
      title: showAlphabetHelper ? "Alphabet Helper Hidden" : "Alphabet Helper Shown",
      description: showAlphabetHelper ? "You can enable it again from game controls." : "Click on letters to add them to your answer.",
      duration: 2000,
    });
  };
  
  const handleCharacterClick = (char: string, userInput: string, setUserInput: (value: string) => void) => {
    const newInput = 
      userInput.substring(0, cursorPosition) + 
      char + 
      userInput.substring(cursorPosition);
    
    setUserInput(newInput);
    // Update cursor position to be after the newly inserted character
    setCursorPosition(cursorPosition + char.length);
  };
  
  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCursorPosition(target.selectionStart || 0);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setUserInput: (value: string) => void) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };
  
  return {
    showAlphabetHelper,
    cursorPosition,
    handleAlphabetHelperToggle,
    handleCharacterClick,
    handleInputSelect,
    handleInputChange
  };
};
