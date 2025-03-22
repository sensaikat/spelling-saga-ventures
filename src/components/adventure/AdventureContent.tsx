
import React from 'react';
import { motion } from 'framer-motion';
import { Location } from '../../contexts/adventure/types';
import { terrainIcons } from './TerrainBackground';
import MissionInfo from './MissionInfo';
import TipsSection from './TipsSection';
import ChallengeButton from './ChallengeButton';
import AnimatedCompanion from './AnimatedCompanion';
import SeasonalContent from '../seasonal/SeasonalContent';
import { useGameStore } from '../../utils/game';
import { Sparkles } from 'lucide-react';

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
  const { selectedLanguage } = useGameStore();
  
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
        
        {/* Seasonal content */}
        {selectedLanguage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.3 }}
            className="mt-4"
          >
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
              <h3 className="text-gray-700 text-sm font-medium">Special seasonal content</h3>
            </div>
            <SeasonalContent 
              languageId={selectedLanguage.id} 
              className="mb-4"
            />
          </motion.div>
        )}
        
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
