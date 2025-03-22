
import { GameMode } from './types';

// Game modes
export const gameModes: GameMode[] = [
  { 
    id: 'spelling', 
    name: 'Spelling Challenge', 
    description: 'Test your spelling skills by typing the words you hear', 
    icon: 'pencil', 
    color: 'bg-game-blue'
  },
  { 
    id: 'scramble', 
    name: 'Word Scramble', 
    description: 'Unscramble the letters to form the correct word', 
    icon: 'shuffle', 
    color: 'bg-game-purple'
  },
  { 
    id: 'match', 
    name: 'Match & Learn', 
    description: 'Match words with their correct spelling', 
    icon: 'duplicate', 
    color: 'bg-game-green'
  },
  { 
    id: 'fill', 
    name: 'Fill the Blanks', 
    description: 'Complete words by filling in the missing letters', 
    icon: 'text-cursor-input', 
    color: 'bg-game-red'
  },
];
