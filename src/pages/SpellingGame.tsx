
import React from 'react';
import SpellingGameContainer from '../components/spelling-game/SpellingGameContainer';

interface SpellingGameProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

const SpellingGame: React.FC<SpellingGameProps> = ({ 
  isAdventure = false, 
  onAdventureComplete 
}) => {
  return (
    <SpellingGameContainer 
      isAdventure={isAdventure} 
      onAdventureComplete={onAdventureComplete} 
    />
  );
};

export default SpellingGame;
