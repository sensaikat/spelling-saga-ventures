
import { useEffect, useState } from 'react';
import { Word } from '../../../../utils/game';

/**
 * Props for the useGameInitialization hook
 * @interface UseGameInitializationProps
 * @property {Word[]} words - Array of Word objects to be used in the game
 */
interface UseGameInitializationProps {
  words: Word[];
}

/**
 * Hook for initializing game state with words
 * 
 * This hook handles the initialization of the spelling game by:
 * 1. Setting up the current word from the provided word list
 * 2. Tracking the total word count
 * 3. Filtering out any invalid words (empty text)
 * 
 * @param {UseGameInitializationProps} props - Object containing the words array
 * @returns Game initialization state and setters
 */
export const useGameInitialization = ({ words = [] }: UseGameInitializationProps) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const filteredWords = words.filter(word => word.text && word.text.length > 0);
  
  useEffect(() => {
    if (filteredWords.length > 0) {
      setCurrentWord(filteredWords[0]);
      setWordCount(filteredWords.length);
    }
  }, [filteredWords]);
  
  return {
    currentWord,
    setCurrentWord,
    wordCount,
    setWordCount,
    filteredWords
  };
};
