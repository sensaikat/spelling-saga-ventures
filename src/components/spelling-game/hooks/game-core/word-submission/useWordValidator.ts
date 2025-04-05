import { useCallback } from 'react';
import { Word, Language } from '../../../../../utils/game';
import { validateWordSubmission } from '../utils/wordValidator';

interface UseWordValidatorProps {
  recordWordAttempt?: (word: Word, correct: boolean, selectedLanguage: Language | string | null) => void;
  trackWord: (word: Word, isCorrect: boolean) => void;
  selectedLanguage: Language | string | null;
}

/**
 * Hook for validating word submissions
 * 
 * This hook provides functions for validating user submissions against expected words
 */
export const useWordValidator = ({
  recordWordAttempt,
  trackWord,
  selectedLanguage
}: UseWordValidatorProps) => {
  /**
   * Validates a user submission against the current word
   * 
   * @param {string} userInput - User's submitted answer
   * @param {Word} word - The word to validate against
   * @returns {boolean} Whether the submission is correct
   */
  const validateSubmission = useCallback((userInput: string, word: Word): boolean => {
    // Skip validation for empty submissions
    if (!userInput || !word) return false;
    
    // Use the language utils to validate with proper normalization
    const isCorrect = validateWordSubmission(userInput, word, selectedLanguage);
    
    // Record the attempt if tracking is enabled
    if (recordWordAttempt) {
      recordWordAttempt(word, isCorrect, selectedLanguage || null);
    }
    
    // Track the word for history
    trackWord(word, isCorrect);
    
    return isCorrect;
  }, [recordWordAttempt, selectedLanguage, trackWord]);
  
  return {
    validateSubmission
  };
};
