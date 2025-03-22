
import { useCallback } from 'react';
import { Word } from '../../../../utils/game';

/**
 * Props for the useGameEvents hook
 * @interface UseGameEventsProps
 * @property {Function} onGameComplete - Callback for game completion
 * @property {number} score - Current game score
 * @property {Function} setGameCompleted - Function to update game completion state
 * @property {boolean} isAdventure - Whether in adventure mode
 * @property {Function} addPlayerPoints - Function to add player points
 */
interface UseGameEventsProps {
  onGameComplete?: (score: number) => void;
  score: number;
  setGameCompleted: (completed: boolean) => void;
  isAdventure?: boolean;
  addPlayerPoints?: (points: number) => void;
}

/**
 * Hook for handling game events like completion and adventure return
 * 
 * This hook provides event handlers for:
 * - Game completion
 * - Adventure mode return
 * 
 * @param {UseGameEventsProps} props - Event configuration
 * @returns Event handler functions
 */
export const useGameEvents = ({
  onGameComplete = () => {},
  score,
  setGameCompleted,
  isAdventure = false,
  addPlayerPoints = () => {}
}: UseGameEventsProps) => {
  
  /**
   * Handles returning from adventure mode
   */
  const handleAdventureReturn = useCallback(() => {
    setGameCompleted(false);
    onGameComplete(score);
  }, [onGameComplete, score, setGameCompleted]);
  
  return {
    handleAdventureReturn
  };
};
