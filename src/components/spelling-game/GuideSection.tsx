
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideCharacter from '../GuideCharacter';
import { TerrainType } from '../../contexts/adventure/types';

interface GuideSectionProps {
  showGuide: boolean;
  isAdventure: boolean;
  terrain?: TerrainType;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
  showGuide,
  isAdventure,
  terrain = 'forest'
}) => {
  return (
    <AnimatePresence>
      {showGuide && (
        <motion.div 
          className="absolute bottom-20 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <GuideCharacter 
            terrain={terrain}
            isAdventure={isAdventure}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
