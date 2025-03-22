
import { TerrainType } from '../../../contexts/adventure/types';

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
