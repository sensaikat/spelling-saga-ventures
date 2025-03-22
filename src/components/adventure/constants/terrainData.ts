
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

// Preview images for each terrain type - Using placeholder images that exist
export const terrainImages: Record<TerrainType, string> = {
  forest: '/placeholder.svg',  // Using the available placeholder image
  desert: '/placeholder.svg',
  river: '/placeholder.svg',
  mountain: '/placeholder.svg',
  castle: '/placeholder.svg',
  space: '/placeholder.svg',
  bedroom: '/placeholder.svg',
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

// More mature/nuanced dialog for companion characters (for young adults)
export const companionDialogs: Record<TerrainType, string[]> = {
  forest: [
    "The diversity of life forms here is fascinating. What secrets are hidden among these trees?",
    "Every ecosystem tells a story. Let's decode the language of this forest.",
    "There's a delicate balance at work here. Notice how everything is connected?"
  ],
  desert: [
    "The stark beauty of this landscape is deceptive. Life adapts in remarkable ways.",
    "Beneath this arid surface lies a complex world of survival strategies.",
    "The desert reveals its secrets only to those who know where to look."
  ],
  river: [
    "Water shapes everything it touches. Just like language shapes thought.",
    "Rivers are the lifeblood of civilizations. Notice how cultures develop around waterways?",
    "The constant flow mirrors how languages evolve – always moving, always changing."
  ],
  mountain: [
    "From this vantage point, patterns become clearer. Perspective changes everything.",
    "The journey upward is challenging, but the view makes it worthwhile.",
    "Mountains teach patience and perseverance. Much like mastering a new language."
  ],
  castle: [
    "These walls have witnessed centuries of history and countless conversations.",
    "Architecture reflects cultural values. What does this structure tell us about its builders?",
    "Knowledge is power – and this place was built to protect both."
  ],
  space: [
    "In the vastness of the cosmos, communication bridges impossible distances.",
    "New worlds, new languages, new ways of thinking – the ultimate frontier.",
    "From here, boundaries and borders seem meaningless. Language connects across all divides."
  ],
  bedroom: [
    "Personal spaces reveal a lot about identity. What story does this room tell?",
    "Comfort zones are important, but growth happens at their edges.",
    "This familiar setting contains endless possibilities. Where shall we begin?"
  ]
};
