
import { useState } from 'react';
import { useGameSettings } from './useGameSettings';

/**
 * Props for the useGameLives hook
 * @interface UseGameLivesProps
 * @property {number} initialLives - Optional number of lives to start with
 */
interface UseGameLivesProps {
  initialLives?: number;
}

/**
 * Hook for managing player lives
 * 
 * This hook provides functionality to:
 * - Track remaining lives
 * - Reduce lives on wrong answers
 * - Reset lives to initial value
 * 
 * @param {UseGameLivesProps} props - Configuration options
 * @returns Lives state and management functions
 */
export const useGameLives = ({ initialLives }: UseGameLivesProps = {}) => {
  // Get game settings
  const { settings } = useGameSettings({ 
    overrides: initialLives ? { initialLives } : undefined 
  });
  
  const [remainingLives, setRemainingLives] = useState(settings.initialLives);
  
  /**
   * Reduces player lives by one
   * @returns {number} New number of remaining lives
   */
  const reduceLives = () => {
    const newLives = Math.max(0, remainingLives - 1);
    setRemainingLives(newLives);
    return newLives;
  };
  
  /**
   * Resets lives to initial value from settings
   */
  const resetLives = () => {
    setRemainingLives(settings.initialLives);
  };
  
  return {
    remainingLives,
    setRemainingLives,
    reduceLives,
    resetLives
  };
};
