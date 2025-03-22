
import React from 'react';
import { GameControlsContainer } from './game-controls';

interface GameControlsProps {
  onSkip: () => void;
  onSpeak: () => void;
  onHint: () => void;
  onRestart: () => void;
  difficultyLevel: string;
  onDifficultyChange: (level: string) => void;
  audioEnabled: boolean;
  onAudioToggle: () => void;
  hintsUsed: number;
  maxHints: number;
  isPlaying: boolean;
  showAlphabetHelper?: boolean;
  onAlphabetHelperToggle?: () => void;
}

const GameControls: React.FC<GameControlsProps> = (props) => {
  return <GameControlsContainer {...props} />;
};

export default GameControls;
