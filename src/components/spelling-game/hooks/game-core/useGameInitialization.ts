
import { useEffect, useState } from 'react';
import { Word } from '../../../../utils/game';

interface UseGameInitializationProps {
  words: Word[];
}

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
