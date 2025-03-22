
import { useGameCore } from './game-core';
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
