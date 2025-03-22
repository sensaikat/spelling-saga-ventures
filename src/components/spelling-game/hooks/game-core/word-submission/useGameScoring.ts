
import { useCallback } from 'react';
import { useGameSettings } from '../useGameSettings';

interface UseGameScoringProps {
  score: number;
  setScore: (score: number) => void;
  remainingLives: number;
  setRemainingLives: (lives: number) => void;
  addPlayerPoints?: (points: number) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
}

/**
 * Hook for managing game scoring and lives
 *
 * This hook provides functions to update score, points, and lives based on answer correctness
 */
export const useGameScoring = ({
  score,
  setScore,
  remainingLives,
  setRemainingLives,
  addPlayerPoints,
  updateProgress
}: UseGameScoringProps) => {
  const { settings } = useGameSettings();
  
  /**
   * Updates score and player points for correct answers
   */
  const handleCorrectAnswer = useCallback((wordId?: string) => {
    setScore(score + settings.correctAnswerPoints);
    
    if (addPlayerPoints) {
      addPlayerPoints(settings.playerPointsIncrement);
    }
    
    // Update progress if function is provided
    if (wordId && updateProgress) {
      updateProgress(wordId, true);
    }
  }, [score, setScore, addPlayerPoints, updateProgress, settings]);
  
  /**
   * Updates lives and records progress for incorrect answers
   */
  const handleIncorrectAnswer = useCallback((wordId?: string) => {
    setRemainingLives(remainingLives - 1);
    
    // Update progress if function is provided
    if (wordId && updateProgress) {
      updateProgress(wordId, false);
    }
  }, [remainingLives, setRemainingLives, updateProgress]);
  
  return {
    handleCorrectAnswer,
    handleIncorrectAnswer
  };
};
