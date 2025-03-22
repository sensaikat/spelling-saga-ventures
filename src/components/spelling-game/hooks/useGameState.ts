
import { useGameCore } from './game-state';

export const useGameState = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  return useGameCore(isAdventure, onAdventureComplete, initialWords);
};
