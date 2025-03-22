
import { useState, useCallback } from 'react';
import { Word } from '../../../../utils/game';

export const useWordTracking = () => {
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  
  const trackWord = useCallback((word: Word, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectWords(prev => [...prev, word]);
    } else {
      setIncorrectWords(prev => [...prev, word]);
    }
  }, []);
  
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
