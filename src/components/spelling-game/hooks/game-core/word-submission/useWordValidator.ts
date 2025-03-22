
import { useCallback } from 'react';
import { Word, Language } from '../../../../../utils/game';
import { useGameSettings } from '../useGameSettings';
import { normalizeTextForComparison } from '../utils/textNormalizer';
import { getLanguageIdFromContext } from '../utils/languageUtils';

interface UseWordValidatorProps {
  recordWordAttempt?: (word: Word, correct: boolean, selectedLanguage: Language | string | null) => void;
  trackWord: (word: Word, isCorrect: boolean) => void;
  selectedLanguage?: Language | string | null;
}

/**
 * Hook for validating word submissions
 *
 * This hook provides functions to validate user submitted answers against the expected word
 */
export const useWordValidator = ({
  recordWordAttempt,
  trackWord,
  selectedLanguage
}: UseWordValidatorProps) => {

  /**
   * Validates if the user's answer matches the expected word
   * Records analytics data for the attempt
   */
  const validateSubmission = useCallback((
    userInput: string,
    currentWord: Word
  ): boolean => {
    if (!currentWord) return false;
    
    // Get language ID for proper text normalization
    const languageId = currentWord.language || 
      (typeof selectedLanguage === 'object' && selectedLanguage ? selectedLanguage.id : 
      (typeof selectedLanguage === 'string' ? selectedLanguage : 'en'));
    
    // Normalize both texts for proper comparison
    const normalizedAnswer = normalizeTextForComparison(currentWord.text, languageId);
    const normalizedInput = normalizeTextForComparison(userInput, languageId);
    
    const isCorrect = normalizedInput === normalizedAnswer;
    
    // Record analytics if available
    if (recordWordAttempt && currentWord) {
      recordWordAttempt(currentWord, isCorrect, selectedLanguage || null);
    }
    
    // Track word for history
    if (currentWord) {
      trackWord(currentWord, isCorrect);
    }
    
    return isCorrect;
  }, [recordWordAttempt, selectedLanguage, trackWord]);
  
  return {
    validateSubmission
  };
};
