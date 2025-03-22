
import { useState, useEffect } from 'react';
import { Word } from '../../../../utils/game';

export const useGameLifecycle = (words: Word[] = []) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [remainingLives, setRemainingLives] = useState(3);
  
  // Initialize game state
  useEffect(() => {
    if (words && words.length > 0) {
      setCurrentWord(words[0]);
      setWordCount(words.length);
    }
  }, [words]);
  
  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setIncorrectWords([]);
    setCorrectWords([]);
    setGameFinished(false);
    if (words && words.length > 0) {
      setCurrentWord(words[0]);
      setWordCount(words.length);
    }
  };
  
  const moveToNextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
      return true;
    } else {
      setGameFinished(true);
      return false;
    }
  };
  
  const recordCorrectAnswer = (word: Word) => {
    setScore(prevScore => prevScore + 1);
    setCorrectWords(prevCorrectWords => [...prevCorrectWords, word]);
  };
  
  const recordIncorrectAnswer = (word: Word, userAnswer: string) => {
    setIncorrectWords(prevIncorrectWords => [
      ...prevIncorrectWords, 
      { ...word, userAnswer } as Word
    ]);
  };
  
  return {
    currentWord,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    remainingLives,
    resetGame,
    moveToNextWord,
    recordCorrectAnswer,
    recordIncorrectAnswer,
    setGameFinished
  };
};
