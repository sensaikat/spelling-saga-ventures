
import { useCallback } from 'react';
import { Word } from '../../../../../utils/game';

interface UseGameLifecycleActionsProps {
  isAdventure: boolean;
  onAdventureComplete?: (score: number) => void;
  score: number;
  setGameCompleted: (completed: boolean) => void;
  setCurrentWordIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setIsCorrect: (correct: boolean | null) => void;
  setShowResult: (show: boolean) => void;
  setShowHint: (show: boolean) => void;
  setScore: (score: number) => void;
  setRemainingLives: (lives: number) => void;
  setCorrectWords: (words: Word[]) => void;
  setIncorrectWords: (words: Word[]) => void;
}

export const useGameLifecycleActions = ({
  isAdventure,
  onAdventureComplete,
  score,
  setGameCompleted,
  setCurrentWordIndex,
  setUserInput,
  setIsCorrect,
  setShowResult,
  setShowHint,
  setScore,
  setRemainingLives,
  setCorrectWords,
  setIncorrectWords
}: UseGameLifecycleActionsProps) => {
  
  const handlePlayAgainClick = useCallback(() => {
    setGameCompleted(false);
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setRemainingLives(3);
    setCorrectWords([]);
    setIncorrectWords([]);
  }, [
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setIsCorrect,
    setShowResult,
    setShowHint,
    setScore,
    setRemainingLives,
    setCorrectWords,
    setIncorrectWords
  ]);
  
  const handleAdventureReturn = useCallback(() => {
    setGameCompleted(false);
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  }, [onAdventureComplete, score, setGameCompleted]);
  
  const handleShowHint = useCallback(() => {
    setShowHint(true);
  }, [setShowHint]);
  
  return {
    handlePlayAgainClick,
    handleAdventureReturn,
    handleShowHint
  };
};
