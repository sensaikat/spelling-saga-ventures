
import { useGameCore } from './game-state';
import { Word } from '../../../utils/game';

export const useGameState = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  return useGameCore(isAdventure, onAdventureComplete, initialWords);
};
