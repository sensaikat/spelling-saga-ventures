
import { useState } from 'react';
import { useGameSettings } from './useGameSettings';

/**
 * Props for the useGameState hook
 * @interface UseGameStateProps
 * @property {number} initialLives - Optional number of lives to start with
 */
interface UseGameStateProps {
  initialLives?: number;
}

/**
 * Hook for managing the core game state variables
 * 
 * This hook centralizes the essential state variables needed to track:
 * - User input
 * - Score
 * - Correctness state
 * - Game completion
 * 
 * @param {UseGameStateProps} props - Configuration options
 * @returns Game state variables and setters
 */
export const useGameState = ({ initialLives }: UseGameStateProps = {}) => {
  // Get game settings
  const { settings } = useGameSettings({ 
    overrides: initialLives ? { initialLives } : undefined 
  });
  
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  /**
   * Resets core game state variables to their initial values
   */
  const resetGameState = () => {
    setUserInput('');
    setScore(0);
    setIsCorrect(null);
    setShowResult(false);
    setGameCompleted(false);
  };
  
  return {
    // State values
    userInput,
    setUserInput,
    score,
    setScore,
    isCorrect,
    setIsCorrect,
    showResult,
    setShowResult,
    gameCompleted,
    setGameCompleted,
    
    // Helper functions
    resetGameState
  };
};
