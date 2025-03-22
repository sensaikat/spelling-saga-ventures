
import { useState, useCallback } from 'react';
import { Word } from '../../../../utils/game';

/**
 * Hook for tracking words during game play
 * 
 * This hook manages:
 * - Recording which words were answered correctly
 * - Recording which words were answered incorrectly
 * - Provides functions to track and reset word history
 * 
 * The word history is used for game statistics and can be
 * displayed to the user at the end of the game.
 * 
 * @returns Object containing word tracking state and functions
 */
export const useWordTracking = () => {
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  
  /**
   * Tracks a word as either correct or incorrect
   * @param {Word} word - The word to track
   * @param {boolean} isCorrect - Whether the word was answered correctly
   */
  const trackWord = useCallback((word: Word, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectWords(prev => [...prev, word]);
    } else {
      setIncorrectWords(prev => [...prev, word]);
    }
  }, []);
  
  /**
   * Resets the tracked words, clearing both correct and incorrect arrays
   */
  const resetWordTracking = useCallback(() => {
    setCorrectWords([]);
    setIncorrectWords([]);
  }, []);
  
  return {
    correctWords,
    incorrectWords,
    trackWord,
    resetWordTracking
  };
};
