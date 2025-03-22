
import { useState } from 'react';

/**
 * Props for the useGameStateManagement hook
 * @interface UseGameStateManagementProps
 * @property {number} initialLives - Optional number of lives to start with (default: 3)
 */
interface UseGameStateManagementProps {
  initialLives?: number;
}

/**
 * Hook for managing the game state
 * 
 * This hook centralizes all the state variables needed to run the spelling game:
 * - User input tracking
 * - Score tracking
 * - Correctness validation
 * - Game completion state
 * - Lives management
 * - UI state (hints, answers checking, etc.)
 * 
 * It also provides a reset function to return all state to initial values.
 * 
 * @param {UseGameStateManagementProps} props - Object containing initial lives
 * @returns Game state variables and setters
 */
export const useGameStateManagement = ({ initialLives = 3 }: UseGameStateManagementProps = {}) => {
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [remainingLives, setRemainingLives] = useState(initialLives);
  const [showHint, setShowHint] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  /**
   * Resets all game state variables to their initial values
   */
  const resetGameState = () => {
    setUserInput('');
    setScore(0);
    setIsCorrect(null);
    setShowResult(false);
    setRemainingLives(initialLives);
    setShowHint(false);
    setIsCheckingAnswer(false);
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
    remainingLives,
    setRemainingLives,
    showHint,
    setShowHint,
    isCheckingAnswer,
    setIsCheckingAnswer,
    gameCompleted,
    setGameCompleted,
    
    // Helper functions
    resetGameState
  };
};
