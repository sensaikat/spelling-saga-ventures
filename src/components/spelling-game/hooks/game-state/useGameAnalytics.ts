
import { useRef } from 'react';
import { Word } from '../../../../utils/game';
import { Language } from '../../../../utils/game/types';
import { learningAnalytics } from '../../../../services/analytics/learningAnalytics';

export const useGameAnalytics = () => {
  const wordStartTimeRef = useRef<number>(Date.now());
  const wordHintsUsedRef = useRef<number>(0);
  
  const recordWordAttempt = (word: Word, correct: boolean, selectedLanguage: Language) => {
    const attemptDuration = Date.now() - wordStartTimeRef.current;
    
    learningAnalytics.recordWordAttempt(
      word,
      correct,
      attemptDuration,
      wordHintsUsedRef.current,
      selectedLanguage
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
