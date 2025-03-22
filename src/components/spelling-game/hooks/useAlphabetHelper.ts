
import { useState, useEffect } from 'react';
import { useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';

export const useAlphabetHelper = () => {
  const [showAlphabetHelper, setShowAlphabetHelper] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const { selectedLanguage } = useGameStore();
  
  useEffect(() => {
    const nonLatinScripts = ['hi', 'bn', 'or', 'ta', 'te', 'ar', 'zh'];
    if (selectedLanguage && nonLatinScripts.includes(selectedLanguage.id)) {
      setShowAlphabetHelper(true);
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
    setCursorPosition,
    handleAlphabetHelperToggle,
    handleCharacterClick,
    handleInputSelect,
    handleInputChange
  };
};
