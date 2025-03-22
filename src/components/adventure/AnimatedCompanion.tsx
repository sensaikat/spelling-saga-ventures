
import React from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/adventure/types';
import { terrainCompanions } from './TerrainBackground';

interface AnimatedCompanionProps {
  terrain: TerrainType;
}

const AnimatedCompanion: React.FC<AnimatedCompanionProps> = ({ terrain }) => {
  const companion = terrainCompanions[terrain];
  
  return (
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
  );
};

export default AnimatedCompanion;
