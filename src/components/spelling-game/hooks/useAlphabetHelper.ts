
import { useState, useEffect } from 'react';
import { useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';
import { getLanguageAlphabet } from '@/components/alphabet-helper/utils';

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
      
      // Show a toast about using the alphabet helper for non-Latin scripts
      toast({
        title: "Alphabet Helper Enabled",
        description: "Use the on-screen keyboard to type in " + selectedLanguage.name,
        duration: 3000,
      });
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
    // Special handling for matras (vowel marks) in Indic scripts
    const isMatraOrDiacritic = char.length === 1 && /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]/.test(char) && 
                                "्ँंःा िी ुू ृॄ ेैॉोौ़".includes(char);
    
    let newPosition = cursorPosition;
    let newInput;
    
    if (isMatraOrDiacritic && cursorPosition > 0) {
      // For matras, we want to place them right after the previous character
      // This is more natural for Indic scripts
      newInput = 
        userInput.substring(0, cursorPosition) + 
        char + 
        userInput.substring(cursorPosition);
      
      // Move cursor after the inserted matra
      newPosition = cursorPosition + char.length;
    } else {
      // For regular characters, insert at current cursor position
      newInput = 
        userInput.substring(0, cursorPosition) + 
        char + 
        userInput.substring(cursorPosition);
      
      // Move cursor after the newly inserted character
      newPosition = cursorPosition + char.length;
    }
    
    setUserInput(newInput);
    setCursorPosition(newPosition);
  };
  
  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCursorPosition(target.selectionStart || 0);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setUserInput: (value: string) => void) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };
  
  // Check if the current language has complex script requirements
  const hasComplexScript = !!selectedLanguage && getLanguageAlphabet(selectedLanguage.id) !== null;
  
  return {
    showAlphabetHelper,
    cursorPosition,
    hasComplexScript,
    handleAlphabetHelperToggle,
    handleCharacterClick,
    handleInputSelect,
    handleInputChange
  };
};
