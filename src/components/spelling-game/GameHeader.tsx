
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface GameHeaderProps {
  remainingLives: number;
  isAdventure: boolean;
  handleAdventureReturn: () => void;
  navigate: (path: string) => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  remainingLives,
  isAdventure,
  handleAdventureReturn,
  navigate,
}) => {
  return (
    <motion.div 
      className="mb-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={() => isAdventure ? handleAdventureReturn() : navigate('/game-mode')} 
        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>{isAdventure ? 'Back to Adventure' : 'Exit Game'}</span>
      </button>
      
      <div className="flex items-center space-x-2">
        {Array.from({ length: remainingLives }).map((_, i) => (
          <motion.div 
            key={i} 
            className="w-5 h-5 rounded-full bg-game-red"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
          />
        ))}
      </div>
    </motion.div>
  );
};
