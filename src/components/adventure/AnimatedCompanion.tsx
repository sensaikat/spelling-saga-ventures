
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/adventure/types';
import { terrainCompanions } from './constants/terrainData';
import { useAudio } from '../../contexts/theme/ThemeContext';
import { ThemeControls } from '../theme/ThemeControls';

interface AnimatedCompanionProps {
  terrain: TerrainType;
}

// Map terrains to appropriate background music
const terrainMusic: Record<TerrainType, string> = {
  forest: '/music/forest-ambient.mp3',
  desert: '/music/desert-winds.mp3',
  river: '/music/flowing-water.mp3',
  mountain: '/music/mountain-winds.mp3',
  castle: '/music/medieval-castle.mp3',
  space: '/music/space-ambient.mp3',
  bedroom: '/music/calm-bedroom.mp3'
};

const AnimatedCompanion: React.FC<AnimatedCompanionProps> = ({ terrain }) => {
  const companion = terrainCompanions[terrain];
  const { playBackgroundMusic, stopBackgroundMusic } = useAudio();
  
  // Play appropriate background music for the terrain
  useEffect(() => {
    const musicTrack = terrainMusic[terrain];
    playBackgroundMusic(musicTrack);
    
    return () => {
      stopBackgroundMusic();
    };
  }, [terrain, playBackgroundMusic, stopBackgroundMusic]);
  
  return (
    <>
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
          {/* Shadow effect with 3D perspective */}
          <motion.div 
            className="absolute -bottom-2 left-1/2 w-12 h-3 bg-black/20 dark:bg-black/40 rounded-full blur-sm -translate-x-1/2"
            animate={{ 
              width: [12, 14, 12],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 
            }}
          />
          
          {/* Speech bubble that appears occasionally */}
          <motion.div
            className="absolute -top-16 -right-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 text-sm shadow-lg dark:text-white"
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
            {terrain === 'bedroom' && "Cozy and comfortable here!"}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45" />
          </motion.div>
          
          {/* Character with enhanced 3D animations */}
          <motion.div 
            className="text-7xl filter drop-shadow-lg"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1],
              z: [0, 30, 0] // 3D effect
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5,
              ease: "easeInOut"
            }}
            style={{
              textShadow: "0 5px 15px rgba(0,0,0,0.2)"
            }}
          >
            {companion}
          </motion.div>
          
          {/* Interactive animation on hover with 3D perspective */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              rotateY: 15, // 3D rotation
              z: 20,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          />
        </motion.div>
      </div>
      
      {/* Theme and audio controls */}
      <ThemeControls minimized={true} />
    </>
  );
};

export default AnimatedCompanion;
