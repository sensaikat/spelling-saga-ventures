
import React from 'react';
import { motion } from 'framer-motion';
import { Location } from '../../contexts/adventure/types';
import { terrainIcons } from './constants/terrainData';
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
  
  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.div
      className="relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-6 relative" variants={itemVariants}>
        <div className="absolute -right-2 -top-2 text-4xl">
          <motion.div
            className="floating-element inline-block"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5 
            }}
          >
            {terrainIcon}
          </motion.div>
        </div>
        
        <motion.h2 
          className="font-display text-2xl mb-3 text-gray-800 relative inline-block"
          variants={itemVariants}
        >
          Your Adventure
          <motion.div 
            className="absolute -bottom-1 left-0 h-1 bg-primary rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.h2>
        
        <motion.div
          className="glass-panel p-6 rounded-xl shadow-lg border border-white/20"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MissionInfo 
            description={currentLocation.description}
            challengeDescription={currentLocation.challengeDescription}
            terrain={currentLocation.terrain}
          />
        </motion.div>
        
        {/* Seasonal content */}
        {selectedLanguage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.3 }}
            className="mt-4"
            variants={itemVariants}
          >
            <div className="flex items-center mb-2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 
                }}
              >
                <Sparkles className="h-6 w-6 mr-2 text-amber-500" />
              </motion.div>
              <h3 className="text-gray-700 text-base font-medium">Special seasonal content</h3>
            </div>
            <motion.div
              className="rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <SeasonalContent 
                languageId={selectedLanguage.id} 
                className="mb-4"
              />
            </motion.div>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <TipsSection visible={showTips} />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex justify-center mt-8"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <ChallengeButton onClick={onStartChallenge} />
      </motion.div>
      
      <AnimatedCompanion terrain={currentLocation.terrain} />
    </motion.div>
  );
};

export default AdventureContent;
