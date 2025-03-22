
import { useCallback } from 'react';
import { Word } from '../../../../../utils/game';
import { useGameSettings } from '../useGameSettings';

interface UseWordProgressionProps {
  filteredWords: Word[];
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setShowHint: (show: boolean) => void;
  setGameCompleted: (completed: boolean) => void;
  remainingLives: number;
  isCorrect: boolean;
}

/**
 * Hook for managing word progression in the game
 *
 * This hook handles the logic for moving to the next word or ending the game
 */
export const useWordProgression = ({
  filteredWords,
  currentWordIndex,
  setCurrentWordIndex,
  setUserInput,
  setShowHint,
  setGameCompleted,
  remainingLives,
  isCorrect
}: UseWordProgressionProps) => {
  const { settings } = useGameSettings();

  /**
   * Determines if the game should be completed based on current state
   */
  const shouldCompleteGame = useCallback(() => {
    return currentWordIndex >= filteredWords.length - 1 || 
           (remainingLives <= 1 && !isCorrect);
  }, [currentWordIndex, filteredWords.length, remainingLives, isCorrect]);
  
  /**
   * Handles progression to next word or game completion
   */
  const progressToNextWord = useCallback(() => {
    if (shouldCompleteGame()) {
      setGameCompleted(true);
    } else if (isCorrect || remainingLives > 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
    }
  }, [
    shouldCompleteGame,
    setGameCompleted,
    isCorrect,
    remainingLives,
    setCurrentWordIndex,
    currentWordIndex,
    setUserInput,
    setShowHint
  ]);
  
  return {
    shouldCompleteGame,
    progressToNextWord
  };
};
