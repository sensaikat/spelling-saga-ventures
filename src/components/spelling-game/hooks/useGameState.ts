
import { useGameCore } from './game-state';
import { Word } from '../../../utils/game';

export const useGameState = (words: Word[] = []) => {
  return useGameCore({
    words,
    selectedLanguage: null,
    onGameComplete: () => {},
    isAdventure: false,
    addPlayerPoints: () => {},
    updateProgress: () => {}
  });
};
