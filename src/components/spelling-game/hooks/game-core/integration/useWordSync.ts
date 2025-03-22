
import { useEffect } from 'react';

/**
 * Hook for synchronizing the current word based on the word index
 * 
 * This hook ensures that when the word index changes, the current word
 * is updated to match the word at that index in the filtered words array.
 * 
 * @param {Object} options - Synchronization configuration
 */
export const useWordSync = ({
  filteredWords,
  currentWordIndex,
  setCurrentWord
}) => {
  // Set current word based on index
  useEffect(() => {
    if (filteredWords.length > 0 && currentWordIndex < filteredWords.length) {
      setCurrentWord(filteredWords[currentWordIndex]);
    }
  }, [currentWordIndex, filteredWords, setCurrentWord]);
};
