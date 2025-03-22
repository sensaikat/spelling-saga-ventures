
import React from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/AdventureContext';

// Background images for each terrain type
export const terrainBackgrounds = {
  forest: 'bg-gradient-to-b from-green-200 to-green-600 bg-[url("/forest-bg.png")] bg-cover bg-blend-soft-light',
  desert: 'bg-gradient-to-b from-yellow-200 to-amber-600 bg-[url("/desert-bg.png")] bg-cover bg-blend-soft-light',
  river: 'bg-gradient-to-b from-blue-200 to-blue-600 bg-[url("/river-bg.png")] bg-cover bg-blend-soft-light',
  mountain: 'bg-gradient-to-b from-slate-200 to-slate-600 bg-[url("/mountain-bg.png")] bg-cover bg-blend-soft-light',
  castle: 'bg-gradient-to-b from-purple-200 to-purple-600 bg-[url("/castle-bg.png")] bg-cover bg-blend-soft-light',
  space: 'bg-gradient-to-b from-indigo-200 to-indigo-800 bg-[url("/space-bg.png")] bg-cover bg-blend-soft-light',
};

// Sound effects for the adventure
export const terrainIcons = {
  forest: '🌳',
  desert: '🏜️',
  river: '🌊',
  mountain: '⛰️',
  castle: '🏰',
  space: '🚀',
};

export const terrainCompanions = {
  forest: '🦊',
  desert: '🐪',
  river: '🐠',
  mountain: '🦅',
  castle: '🐉',
  space: '👽',
};

interface TerrainBackgroundProps {
  terrain: TerrainType;
  children: React.ReactNode;
}

const TerrainBackground: React.FC<TerrainBackgroundProps> = ({ terrain, children }) => {
  const backgroundClass = terrainBackgrounds[terrain];
  
  return (
    <div className={`min-h-screen ${backgroundClass} p-4 relative overflow-hidden`}>
      {/* Floating particles for added magic */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30 w-3 h-3"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50], 
              opacity: [null, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default TerrainBackground;
