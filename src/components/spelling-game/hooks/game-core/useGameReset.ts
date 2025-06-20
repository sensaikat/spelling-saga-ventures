
import { useCallback } from 'react';
import { useGameSettings } from './useGameSettings';

/**
 * Props for the useGameReset hook
 * @interface UseGameResetProps
 * @property {Function} resetGameState - Function to reset game state
 * @property {Function} resetWordTracking - Function to reset word tracking
 * @property {Function} setCurrentWordIndex - Function to set current word index
 * @property {Function} resetTimer - Function to reset timer
 * @property {number} initialTime - Initial time for timer reset
 */
interface UseGameResetProps {
  resetGameState: () => void;
  resetWordTracking: () => void;
  setCurrentWordIndex: (index: number) => void;
  resetTimer: (time?: number) => void;
  initialTime?: number;
}

/**
 * Hook for handling game reset functionality
 * 
 * This hook provides a unified way to reset all game components:
 * - Game state
 * - Word tracking
 * - Current word index
 * - Timer
 * 
 * @param {UseGameResetProps} props - Reset configuration
 * @returns Reset handler function
 */
export const useGameReset = ({
  resetGameState,
  resetWordTracking,
  setCurrentWordIndex,
  resetTimer,
  initialTime
}: UseGameResetProps) => {
  // Get game settings
  const { settings } = useGameSettings({
    overrides: initialTime ? { initialTime } : undefined
  });
  
  /**
   * Resets the game to start over
   */
  const handlePlayAgainClick = useCallback(() => {
    resetGameState();
    setCurrentWordIndex(0);
    resetWordTracking();
    resetTimer(settings.initialTime);
  }, [resetGameState, setCurrentWordIndex, resetWordTracking, resetTimer, settings.initialTime]);
  
  return {
    handlePlayAgainClick
  };
};
