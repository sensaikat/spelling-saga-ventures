
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/adventure/types';
import { terrainCompanions, companionDialogs } from './constants/terrainData';
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
  const [currentDialog, setCurrentDialog] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  
  // Get dialog options for this terrain
  const dialogOptions = companionDialogs[terrain] || [];
  
  // Play appropriate background music for the terrain
  useEffect(() => {
    const musicTrack = terrainMusic[terrain];
    playBackgroundMusic(musicTrack);
    
    return () => {
      stopBackgroundMusic();
    };
  }, [terrain, playBackgroundMusic, stopBackgroundMusic]);
  
  // Periodically show dialog
  useEffect(() => {
    // Show a random dialog every 30-60 seconds
    const dialogInterval = setInterval(() => {
      if (dialogOptions.length > 0 && !showDialog) {
        const randomIndex = Math.floor(Math.random() * dialogOptions.length);
        setCurrentDialog(dialogOptions[randomIndex]);
        setShowDialog(true);
        
        // Hide dialog after 8 seconds
        setTimeout(() => {
          setShowDialog(false);
        }, 8000);
      }
    }, 30000 + Math.random() * 30000);
    
    return () => clearInterval(dialogInterval);
  }, [dialogOptions, showDialog]);
  
  // Show initial dialog
  useEffect(() => {
    if (dialogOptions.length > 0) {
      const initialDelay = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * dialogOptions.length);
        setCurrentDialog(dialogOptions[randomIndex]);
        setShowDialog(true);
        
        setTimeout(() => {
          setShowDialog(false);
        }, 8000);
      }, 3000);
      
      return () => clearTimeout(initialDelay);
    }
  }, [dialogOptions]);
  
  // Handle manual dialog trigger
  const handleCompanionClick = () => {
    if (!showDialog && dialogOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * dialogOptions.length);
      setCurrentDialog(dialogOptions[randomIndex]);
      setShowDialog(true);
      
      setTimeout(() => {
        setShowDialog(false);
      }, 8000);
    }
  };
  
  return (
    <>
      <div className="absolute bottom-10 right-10 z-20">
        <motion.div 
          className="relative cursor-pointer"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1
          }}
          onClick={handleCompanionClick}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          {/* Speech bubble with more mature dialog */}
          <motion.div
            className="absolute -top-24 -right-4 bg-white/90 dark:bg-gray-800/90 rounded-xl px-5 py-3 text-sm shadow-lg dark:text-white max-w-[280px]"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ 
              opacity: showDialog ? 1 : 0,
              scale: showDialog ? 1 : 0.8,
              y: showDialog ? 0 : 10
            }}
            transition={{ 
              duration: 0.3
            }}
          >
            <p className="font-medium text-gray-800 dark:text-gray-100">{currentDialog}</p>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45" />
          </motion.div>
          
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
        </motion.div>
      </div>
      
      {/* Theme and audio controls */}
      <ThemeControls minimized={true} />
    </>
  );
};

export default AnimatedCompanion;
