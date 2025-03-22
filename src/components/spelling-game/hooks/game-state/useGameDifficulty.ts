
import { useState, useEffect } from 'react';
import { Word } from '../../../../utils/game';
import { Language, WordList } from '../../../../utils/game/types';

export const useGameDifficulty = (
  initialWords: Word[] = [],
  selectedLanguage: Language | null,
  currentWordList: WordList | null
) => {
  const [difficultyLevel, setDifficultyLevel] = useState('all');
  const [filteredWords, setFilteredWords] = useState<Word[]>(initialWords);
  
  // Filter words by difficulty
  useEffect(() => {
    if (selectedLanguage && currentWordList) {
      let words = currentWordList.words;
      if (difficultyLevel !== 'all') {
        words = words.filter(word => word.difficulty === difficultyLevel);
      }
      setFilteredWords(words);
    }
  }, [selectedLanguage, currentWordList, difficultyLevel]);
  
  const handleDifficultyChange = (level: string) => {
    setDifficultyLevel(level);
  };
  
  return {
    difficultyLevel,
    filteredWords,
    setFilteredWords,
    handleDifficultyChange
  };
};
