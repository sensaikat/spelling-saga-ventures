
import { useRef } from 'react';
import { Word, Language } from '../../../../utils/game';
import { learningAnalytics } from '../../../../services/analytics/learningAnalytics';

export const useGameAnalytics = () => {
  const wordStartTimeRef = useRef<number>(Date.now());
  const wordHintsUsedRef = useRef<number>(0);
  
  const recordWordAttempt = (word: Word, correct: boolean, selectedLanguage: Language | string) => {
    const attemptDuration = Date.now() - wordStartTimeRef.current;
    
    // If selectedLanguage is a string, we need to handle it differently
    // The analytics service expects a Language object
    const languageForAnalytics = typeof selectedLanguage === 'string' 
      ? { id: selectedLanguage, name: selectedLanguage, nativeName: selectedLanguage, flag: '🏳️' } 
      : selectedLanguage;
    
    learningAnalytics.recordWordAttempt(
      word,
      correct,
      attemptDuration,
      wordHintsUsedRef.current,
      languageForAnalytics
    );
    
    // Reset analytics data for next word
    wordStartTimeRef.current = Date.now();
    wordHintsUsedRef.current = 0;
  };
  
  const incrementHintCounter = () => {
    wordHintsUsedRef.current += 1;
  };
  
  return {
    recordWordAttempt,
    incrementHintCounter
  };
};
