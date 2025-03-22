
import { useState } from 'react';
import { Word } from '../../../../utils/game';

export const useGameInput = () => {
  const [userInput, setUserInput] = useState('');
  const [inputStatus, setInputStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  
  const checkAnswer = (currentWord: Word | null, userInputValue: string): boolean => {
    if (!currentWord) return false;
    return userInputValue.trim() === currentWord.text.trim();
  };
  
  return {
    userInput,
    setUserInput,
    inputStatus, 
    setInputStatus,
    isCheckingAnswer,
    setIsCheckingAnswer,
    checkAnswer
  };
};
