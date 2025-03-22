
import { useCallback } from 'react';
import { Word } from '../../../../../utils/game';

interface UseWordNavigationProps {
  currentWord: Word | null;
  filteredWords: Word[];
  currentWordIndex: number;
  remainingLives: number;
  incorrectWords: Word[];
  setCurrentWordIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setShowHint: (show: boolean) => void;
  setGameCompleted: (completed: boolean) => void;
  setRemainingLives: (lives: number) => void;
  setIncorrectWords: (words: Word[]) => void;
  setShowResult: (show: boolean) => void;
  setIsCorrect: (correct: boolean | null) => void;
}

export const useWordNavigation = ({
  currentWord,
  filteredWords,
  currentWordIndex,
  remainingLives,
  incorrectWords,
  setCurrentWordIndex,
  setUserInput,
  setShowHint,
  setGameCompleted,
  setRemainingLives,
  setIncorrectWords,
  setShowResult,
  setIsCorrect
}: UseWordNavigationProps) => {
  
  // Determines if game should end based on current state
  const shouldEndGame = useCallback((livesLeft: number, isCorrect: boolean = true) => {
    return currentWordIndex >= filteredWords.length - 1 || 
           (livesLeft <= 1 && !isCorrect);
  }, [currentWordIndex, filteredWords.length]);
  
  // Handle moving to next word after result is shown
  const handleNextWord = useCallback((isCorrect: boolean) => {
    setShowResult(false);
    setShowHint(false);
    
    if (shouldEndGame(remainingLives, isCorrect)) {
      // Game over
      setGameCompleted(true);
    } else if (isCorrect || remainingLives > 1) {
      // Move to next word
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
    }
  }, [
    remainingLives,
    currentWordIndex,
    filteredWords.length,
    setShowResult,
    setShowHint,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    shouldEndGame
  ]);
  
  // Handle skipping current word
  const handleSkip = useCallback(() => {
    if (!currentWord) return;
    
    // Reduce lives
    const newLives = remainingLives - 1;
    setRemainingLives(newLives);
    setIncorrectWords([...incorrectWords, currentWord]);
    
    // Check if game is over
    if (newLives <= 1) {
      setGameCompleted(true);
      return;
    }
    
    // Move to next word
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  }, [
    currentWord,
    currentWordIndex,
    filteredWords,
    remainingLives,
    incorrectWords,
    setRemainingLives,
    setIncorrectWords,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setShowHint
  ]);
  
  // Expose functions that will be used by useSpellingGameActions
  return {
    handleNextWord,
    handleSkip,
    shouldEndGame
  };
};
