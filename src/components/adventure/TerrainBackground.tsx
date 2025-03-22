
import React from 'react';
import { TerrainType } from '../../contexts/adventure/types';

// Define background styles for different terrains
export const terrainBackgrounds: Record<TerrainType, string> = {
  forest: 'bg-gradient-to-b from-green-100 to-green-300',
  desert: 'bg-gradient-to-b from-yellow-100 to-yellow-300',
  river: 'bg-gradient-to-b from-blue-100 to-blue-300',
  mountain: 'bg-gradient-to-b from-slate-100 to-slate-300',
  castle: 'bg-gradient-to-b from-purple-100 to-purple-300',
  space: 'bg-gradient-to-b from-indigo-100 to-indigo-300',
};

// Icons for each terrain type
export const terrainIcons: Record<TerrainType, string> = {
  forest: '🌳',
  desert: '🏜️',
  river: '🌊',
  mountain: '⛰️',
  castle: '🏰',
  space: '🚀',
};

// Companion characters for each terrain
export const terrainCompanions: Record<TerrainType, string> = {
  forest: '🦊',
  desert: '🐪',
  river: '🐠',
  mountain: '🦅',
  castle: '🧙‍♂️',
  space: '👽',
};

interface TerrainBackgroundProps {
  terrain: TerrainType;
  children: React.ReactNode;
}

const TerrainBackground: React.FC<TerrainBackgroundProps> = ({ terrain, children }) => {
  return (
    <div className={`min-h-screen ${terrainBackgrounds[terrain]} pt-6 pb-12 px-4 relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute top-20 left-40 text-9xl opacity-10">{terrainIcons[terrain]}</div>
      <div className="absolute bottom-20 right-40 text-9xl opacity-10">{terrainIcons[terrain]}</div>
      
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default TerrainBackground;
