
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Location } from '../../contexts/AdventureContext';
import { terrainIcons, terrainCompanions } from './TerrainBackground';

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
  const companion = terrainCompanions[currentLocation.terrain];
  
  return (
    <>
      <div className="mb-6 relative">
        <div className="absolute -right-2 -top-2 text-4xl floating-element">
          {terrainIcon}
        </div>
        
        <h2 className="font-display text-xl mb-3 text-gray-800">Your Adventure</h2>
        <p className="mb-4 text-gray-700">{currentLocation.description}</p>
        <motion.div 
          className="italic text-gray-700 bg-white/50 p-4 rounded-lg border border-white/30"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start">
            <span className="text-2xl mr-3 mt-1">{companion}</span>
            <div>
              <p className="font-medium mb-1">Your mission:</p>
              <p>{currentLocation.challengeDescription}</p>
            </div>
          </div>
        </motion.div>
        
        {showTips && (
          <motion.div 
            className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <h3 className="font-bold text-blue-800 mb-2 flex items-center">
              <Sparkles size={16} className="mr-2" /> Tips for Success
            </h3>
            <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
              <li>Listen carefully to the pronunciations</li>
              <li>Take your time to spell each word correctly</li>
              <li>Use hints if you're stuck - but only 3 times!</li>
              <li>Try to remember patterns in the language</li>
            </ul>
          </motion.div>
        )}
      </div>
      
      <div className="flex justify-center">
        <motion.button
          className="primary-button flex items-center gap-2 text-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartChallenge}
        >
          Begin Challenge <ChevronRight size={18} />
        </motion.button>
      </div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-6xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
      >
        {companion}
      </motion.div>
    </>
  );
};

export default AdventureContent;
