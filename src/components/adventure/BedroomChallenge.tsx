
import React from 'react';
import { useAdventure } from '../../contexts/adventure';
import SpellingGameContainer from '../spelling-game/SpellingGameContainer';
import { TerrainType } from '../../contexts/adventure/types';
import { toast } from '../../hooks/use-toast';

interface BedroomChallengeProps {
  terrain: TerrainType;
  onComplete: (score: number) => void;
}

const BedroomChallenge: React.FC<BedroomChallengeProps> = ({ 
  terrain, 
  onComplete 
}) => {
  const { completeLocation, addCredits, addStar, character } = useAdventure();
  
  const handleAdventureComplete = (score: number) => {
    // Update adventure progress
    const locationId = terrain;
    if (score > 30) {
      // Only mark as complete if they scored enough points
      completeLocation(locationId);
      addStar();
      
      toast({
        title: "Challenge Completed!",
        description: `You earned ${score} points and unlocked the next location!`,
        duration: 5000,
      });
    } else if (score > 0) {
      // Give some credits for trying
      addCredits(score);
      
      toast({
        title: "Challenge Attempted",
        description: `You earned ${score} points. Try again to unlock the next location!`,
        duration: 5000,
      });
    }
    
    // Call the parent component's completion handler
    onComplete(score);
  };
  
  return (
    <SpellingGameContainer
      isAdventure={true}
      onAdventureComplete={handleAdventureComplete}
      terrain={terrain}
    />
  );
};

export default BedroomChallenge;
