import React from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/adventure/types';
import { useResolutionContext } from '../../contexts/resolution/ResolutionContext';

// Define accessible background styles for different terrains
// Using high-contrast gradients that work well for color blindness
export const terrainBackgrounds: Record<TerrainType, string> = {
  forest: 'bg-gradient-to-b from-green-100 to-green-500',
  desert: 'bg-gradient-to-b from-yellow-100 to-amber-500',
  river: 'bg-gradient-to-b from-blue-100 to-blue-500',
  mountain: 'bg-gradient-to-b from-slate-100 to-slate-500',
  castle: 'bg-gradient-to-b from-purple-100 to-purple-500',
  space: 'bg-gradient-to-b from-indigo-100 to-indigo-600',
  bedroom: 'bg-gradient-to-b from-teal-100 to-teal-500',
};

// Icons for each terrain type
export const terrainIcons: Record<TerrainType, string> = {
  forest: '🌳',
  desert: '🏜️',
  river: '🌊',
  mountain: '⛰️',
  castle: '🏰',
  space: '🚀',
  bedroom: '🛏️',
};

// Companion characters for each terrain
export const terrainCompanions: Record<TerrainType, string> = {
  forest: '🦊',
  desert: '🐪',
  river: '🐠',
  mountain: '🦅',
  castle: '🧙‍♂️',
  space: '👽',
  bedroom: '🧸',
};

interface TerrainBackgroundProps {
  terrain: TerrainType;
  children: React.ReactNode;
}

const TerrainBackground: React.FC<TerrainBackgroundProps> = ({ terrain, children }) => {
  const { resolutionTier, isMobile } = useResolutionContext();
  
  const getLayerCount = () => {
    if (isMobile) return 2; // Mobile gets simplified backgrounds
    
    switch (resolutionTier) {
      case 'low': return 2;
      case 'medium': return 3;
      case 'high': 
      case 'ultra': return 4;
      default: return 3;
    }
  };
  
  const getAnimationIntensity = () => {
    switch (resolutionTier) {
      case 'low': return 'minimal';
      case 'medium': return 'moderate';
      case 'high': return 'standard';
      case 'ultra': return 'full';
      default: return 'moderate';
    }
  };
  
  const layerCount = getLayerCount();
  const animationIntensity = getAnimationIntensity();
  
  return (
    <div className={`min-h-screen ${terrainBackgrounds[terrain]} pt-6 pb-12 px-4 relative overflow-hidden`}>
      {/* 3D Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Far background elements (slow moving) */}
        <motion.div 
          className="absolute top-10 left-10 text-9xl opacity-5"
          animate={{ y: [-10, 10], x: [-5, 5] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 8 }}
        >
          {terrainIcons[terrain]}
        </motion.div>
        
        {/* Mid-range background elements */}
        <motion.div 
          className="absolute bottom-40 right-20 text-8xl opacity-10"
          animate={{ y: [-15, 15], x: [5, -5] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 10 }}
        >
          {terrainIcons[terrain]}
        </motion.div>
        
        {/* Foreground elements (faster moving) */}
        <motion.div 
          className="absolute top-40 right-40 text-7xl opacity-20"
          animate={{ y: [-20, 20], x: [10, -10] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 6 }}
        >
          {terrainIcons[terrain]}
        </motion.div>
        
        {/* Additional decorative elements based on terrain type */}
        {terrain === 'forest' && (
          <>
            <motion.div 
              className="absolute bottom-20 left-10 text-6xl"
              animate={{ y: [-10, 10], rotate: [0, 5, 0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              🌿
            </motion.div>
            <motion.div 
              className="absolute top-60 right-30 text-5xl opacity-20"
              animate={{ y: [-15, 15] }}
              transition={{ repeat: Infinity, duration: 7 }}
            >
              🦋
            </motion.div>
          </>
        )}
        
        {terrain === 'desert' && (
          <>
            <motion.div 
              className="absolute bottom-30 left-20 text-6xl opacity-20"
              animate={{ x: [-20, 20] }}
              transition={{ repeat: Infinity, duration: 20 }}
            >
              🌵
            </motion.div>
            <motion.div 
              className="absolute top-40 left-40 text-5xl opacity-15"
              animate={{ y: [0, 20], x: [0, 40] }}
              transition={{ repeat: Infinity, duration: 30 }}
            >
              ☀️
            </motion.div>
          </>
        )}
        
        {terrain === 'river' && (
          <>
            <motion.div 
              className="absolute bottom-40 left-30 text-5xl opacity-20"
              animate={{ y: [-10, 10], x: [5, 15] }}
              transition={{ repeat: Infinity, duration: 8 }}
            >
              🐟
            </motion.div>
            <motion.div 
              className="absolute top-30 right-40 text-6xl opacity-15"
              animate={{ y: [0, 20], x: [0, -30] }}
              transition={{ repeat: Infinity, duration: 12 }}
            >
              🍃
            </motion.div>
          </>
        )}
        
        {terrain === 'mountain' && (
          <>
            <motion.div 
              className="absolute top-20 left-20 text-6xl opacity-20"
              animate={{ y: [-5, 5] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              ❄️
            </motion.div>
            <motion.div 
              className="absolute bottom-30 right-20 text-5xl opacity-15"
              animate={{ y: [0, 10], x: [0, -10] }}
              transition={{ repeat: Infinity, duration: 8 }}
            >
              🦅
            </motion.div>
          </>
        )}
        
        {terrain === 'castle' && (
          <>
            <motion.div 
              className="absolute top-40 left-40 text-6xl opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 30 }}
            >
              ✨
            </motion.div>
            <motion.div 
              className="absolute bottom-20 right-40 text-5xl opacity-15"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              📚
            </motion.div>
          </>
        )}
        
        {terrain === 'space' && (
          <>
            <motion.div 
              className="absolute top-20 left-30 text-4xl opacity-30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              ⭐
            </motion.div>
            <motion.div 
              className="absolute bottom-40 right-20 text-5xl opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20 }}
            >
              🪐
            </motion.div>
            <motion.div 
              className="absolute top-60 right-50 text-4xl opacity-20"
              animate={{ y: [-20, 20], x: [-20, 20] }}
              transition={{ repeat: Infinity, duration: 15 }}
            >
              🌠
            </motion.div>
          </>
        )}
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default TerrainBackground;
