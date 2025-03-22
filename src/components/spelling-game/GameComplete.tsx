
import React from 'react';
import { GameResult } from './GameResult';
import { Word } from '../../utils/game';

interface GameCompleteProps {
  score: number;
  correctWords: Word[];
  incorrectWords: Word[];
  isAdventure: boolean;
  handlePlayAgainClick: () => void;
  handleAdventureReturn: () => void;
}

export const GameComplete: React.FC<GameCompleteProps> = ({
  score,
  correctWords,
  incorrectWords,
  isAdventure,
  handlePlayAgainClick,
  handleAdventureReturn
}) => {
  return (
    <GameResult 
      isAdventure={isAdventure}
      score={score}
      handlePlayAgain={handlePlayAgainClick}
      handleAdventureReturn={handleAdventureReturn}
    />
  );
};
