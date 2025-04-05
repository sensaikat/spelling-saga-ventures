
import { useCallback } from 'react';
import { Word, Language } from '../../../../../utils/game';
import { validateWordSubmission } from '../utils/wordValidator';

interface UseWordValidatorProps {
  recordWordAttempt?: (word: Word, correct: boolean, selectedLanguage: Language | string | null) => void;
  trackWord?: (word: Word, isCorrect: boolean) => void;
  selectedLanguage?: Language | string | null;
}

/**
 * Hook for validating word submissions
 * 
 * @param {UseWordValidatorProps} props - Configuration options
 * @returns {Object} Validation functions
 */
export const useWordValidator = (props: UseWordValidatorProps = {}) => {
  const { 
    recordWordAttempt,
    trackWord,
    selectedLanguage 
  } = props;
  
  /**
   * Validates a user's input against the current word
   * 
   * @param {string} userInput - User's submitted answer
   * @param {Word} currentWord - Current word to check against
   * @returns {boolean} Whether the answer is correct
   */
  const validateSubmission = useCallback((userInput: string, currentWord: Word): boolean => {
    // Normalize inputs and validate
    const isCorrect = validateWordSubmission(userInput, currentWord, selectedLanguage);
    
    // Record in analytics if function is provided
    if (recordWordAttempt) {
      recordWordAttempt(currentWord, isCorrect, selectedLanguage || null);
    }
    
    // Track word for game history if function is provided
    if (trackWord) {
      trackWord(currentWord, isCorrect);
    }
    
    return isCorrect;
  }, [selectedLanguage, recordWordAttempt, trackWord]);
  
  return { validateSubmission };
};
