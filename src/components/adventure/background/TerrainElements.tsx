
import React from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../../contexts/adventure/types';
import { terrainIcons } from '../constants/terrainData';

interface TerrainElementsProps {
  terrain: TerrainType;
  animationIntensity: 'minimal' | 'moderate' | 'standard' | 'full';
}

const TerrainElements: React.FC<TerrainElementsProps> = ({ 
  terrain, 
  animationIntensity 
}) => {
  // Adjust animation parameters based on intensity
  const getAnimationDuration = (base: number) => {
    switch (animationIntensity) {
      case 'minimal': return base * 1.5;
      case 'moderate': return base * 1.2;
      case 'standard': return base;
      case 'full': return base * 0.8;
      default: return base;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Far background elements (slow moving) */}
      <motion.div 
        className="absolute top-10 left-10 text-9xl opacity-5"
        animate={{ y: [-10, 10], x: [-5, 5] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: getAnimationDuration(8) }}
      >
        {terrainIcons[terrain]}
      </motion.div>
      
      {/* Mid-range background elements */}
      <motion.div 
        className="absolute bottom-40 right-20 text-8xl opacity-10"
        animate={{ y: [-15, 15], x: [5, -5] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: getAnimationDuration(10) }}
      >
        {terrainIcons[terrain]}
      </motion.div>
      
      {/* Foreground elements (faster moving) */}
      <motion.div 
        className="absolute top-40 right-40 text-7xl opacity-20"
        animate={{ y: [-20, 20], x: [10, -10] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: getAnimationDuration(6) }}
      >
        {terrainIcons[terrain]}
      </motion.div>
      
      {/* Additional decorative elements based on terrain type */}
      {terrain === 'forest' && (
        <>
          <motion.div 
            className="absolute bottom-20 left-10 text-6xl"
            animate={{ y: [-10, 10], rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(5) }}
          >
            🌿
          </motion.div>
          <motion.div 
            className="absolute top-60 right-30 text-5xl opacity-20"
            animate={{ y: [-15, 15] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(7) }}
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
            transition={{ repeat: Infinity, duration: getAnimationDuration(20) }}
          >
            🌵
          </motion.div>
          <motion.div 
            className="absolute top-40 left-40 text-5xl opacity-15"
            animate={{ y: [0, 20], x: [0, 40] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(30) }}
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
            transition={{ repeat: Infinity, duration: getAnimationDuration(8) }}
          >
            🐟
          </motion.div>
          <motion.div 
            className="absolute top-30 right-40 text-6xl opacity-15"
            animate={{ y: [0, 20], x: [0, -30] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(12) }}
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
            transition={{ repeat: Infinity, duration: getAnimationDuration(6) }}
          >
            ❄️
          </motion.div>
          <motion.div 
            className="absolute bottom-30 right-20 text-5xl opacity-15"
            animate={{ y: [0, 10], x: [0, -10] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(8) }}
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
            transition={{ repeat: Infinity, duration: getAnimationDuration(30) }}
          >
            ✨
          </motion.div>
          <motion.div 
            className="absolute bottom-20 right-40 text-5xl opacity-15"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(4) }}
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
            transition={{ repeat: Infinity, duration: getAnimationDuration(3) }}
          >
            ⭐
          </motion.div>
          <motion.div 
            className="absolute bottom-40 right-20 text-5xl opacity-20"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(20) }}
          >
            🪐
          </motion.div>
          <motion.div 
            className="absolute top-60 right-50 text-4xl opacity-20"
            animate={{ y: [-20, 20], x: [-20, 20] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(15) }}
          >
            🌠
          </motion.div>
        </>
      )}
      
      {terrain === 'bedroom' && (
        <>
          <motion.div 
            className="absolute top-30 left-20 text-5xl opacity-20"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(5) }}
          >
            📚
          </motion.div>
          <motion.div 
            className="absolute bottom-40 right-30 text-4xl opacity-15"
            animate={{ y: [-5, 5], x: [-2, 2] }}
            transition={{ repeat: Infinity, duration: getAnimationDuration(4) }}
          >
            🧸
          </motion.div>
        </>
      )}
    </div>
  );
};

export default TerrainElements;
