
import { useState } from 'react';

export const useInputHandler = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const start = target.selectionStart;
    setCursorPosition(start !== null ? start : target.value.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setUserInput: (value: string) => void) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionEnd || e.target.value.length);
  };

  const handleCharacterClick = (char: string, userInput: string, setUserInput: (value: string) => void) => {
    const newInput = userInput.slice(0, cursorPosition) + char + userInput.slice(cursorPosition);
    setUserInput(newInput);
    setCursorPosition(cursorPosition + 1);
  };
  
  return {
    cursorPosition,
    setCursorPosition,
    handleInputSelect,
    handleInputChange,
    handleCharacterClick
  };
};
