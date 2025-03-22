
import React from 'react';
import { motion } from 'framer-motion';
import { Location } from '../../contexts/adventure/types';
import { terrainIcons } from './TerrainBackground';
import MissionInfo from './MissionInfo';
import TipsSection from './TipsSection';
import ChallengeButton from './ChallengeButton';
import AnimatedCompanion from './AnimatedCompanion';

interface AdventureContentProps {
  currentLocation: Location;
  showTips: boolean;
  onStartChallenge: () => void;
}

const AdventureContent: React.FC<AdventureContentProps> = ({
  currentLocation,
  showTips,
  onStartChallenge
}) => {
  const terrainIcon = terrainIcons[currentLocation.terrain];
  
  return (
    <>
      <div className="mb-6 relative">
        <div className="absolute -right-2 -top-2 text-4xl floating-element">
          {terrainIcon}
        </div>
        
        <h2 className="font-display text-xl mb-3 text-gray-800">Your Adventure</h2>
        
        <MissionInfo 
          description={currentLocation.description}
          challengeDescription={currentLocation.challengeDescription}
          terrain={currentLocation.terrain}
        />
        
        <TipsSection visible={showTips} />
      </div>
      
      <div className="flex justify-center">
        <ChallengeButton onClick={onStartChallenge} />
      </div>
      
      <AnimatedCompanion terrain={currentLocation.terrain} />
    </>
  );
};

export default AdventureContent;
