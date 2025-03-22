
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
    <div className="absolute bottom-10 right-10 z-20">
      <motion.div 
        className="relative"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1
        }}
      >
        {/* Shadow effect */}
        <div 
          className="absolute -bottom-2 left-1/2 w-12 h-3 bg-black/20 rounded-full blur-sm -translate-x-1/2"
        />
        
        {/* Speech bubble that appears occasionally */}
        <motion.div
          className="absolute -top-16 -right-4 bg-white rounded-xl px-4 py-2 text-sm shadow-lg"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [10, 0, 0, 10]
          }}
          transition={{ 
            repeat: Infinity,
            repeatDelay: 10,
            duration: 4,
            times: [0, 0.1, 0.9, 1]
          }}
        >
          {terrain === 'forest' && "Let's explore the trees!"}
          {terrain === 'desert' && "It's hot out here!"}
          {terrain === 'river' && "Splash with me!"}
          {terrain === 'mountain' && "The view is amazing!"}
          {terrain === 'castle' && "So many secrets here..."}
          {terrain === 'space' && "To infinity and beyond!"}
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45" />
        </motion.div>
        
        {/* Character */}
        <motion.div 
          className="text-7xl filter drop-shadow-lg"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3.5,
            ease: "easeInOut"
          }}
        >
          {companion}
        </motion.div>
        
        {/* Interactive animation on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedCompanion;
