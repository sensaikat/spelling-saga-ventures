
import { useGameState } from './useGameState';
import { useGameUIState } from './useGameUIState';
import { useGameLives } from './useGameLives';

/**
 * Props for the useGameStateManagement hook
 * @interface UseGameStateManagementProps
 * @property {number} initialLives - Optional number of lives to start with
 */
interface UseGameStateManagementProps {
  initialLives?: number;
}

/**
 * Hook for managing the complete game state
 * 
 * This hook integrates all specialized state hooks to provide a unified
 * interface for managing the game state:
 * - Core game state (user input, score, correctness)
 * - UI state (hints, answer checking)
 * - Player lives
 * 
 * @param {UseGameStateManagementProps} props - Object containing initial lives
 * @returns Complete game state variables and setters
 */
export const useGameStateManagement = ({ initialLives }: UseGameStateManagementProps = {}) => {
  // Core game state
  const {
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
    resetGameState: resetCoreState
  } = useGameState({ initialLives });
  
  // UI state
  const {
    showHint,
    setShowHint,
    isCheckingAnswer,
    setIsCheckingAnswer,
    resetUIState
  } = useGameUIState();
  
  // Lives management
  const {
    remainingLives,
    setRemainingLives,
    resetLives
  } = useGameLives({ initialLives });
  
  /**
   * Resets all game state variables to their initial values
   */
  const resetGameState = () => {
    resetCoreState();
    resetUIState();
    resetLives();
  };
  
  return {
    // Core state values
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
    
    // UI state values
    showHint,
    setShowHint,
    isCheckingAnswer,
    setIsCheckingAnswer,
    
    // Lives management
    remainingLives,
    setRemainingLives,
    
    // Helper functions
    resetGameState
  };
};
