
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, MapIcon, Settings, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuickNav from '../navigation/QuickNav';

interface GameHeaderProps {
  remainingLives: number;
  isAdventure: boolean;
  handleAdventureReturn: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  remainingLives,
  isAdventure,
  handleAdventureReturn,
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="mb-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={() => isAdventure ? handleAdventureReturn() : navigate('/game')} 
        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>{isAdventure ? 'Back to Adventure' : 'Exit Game'}</span>
      </button>
      
      <div className="flex items-center space-x-2">
        {/* Use the standardized QuickNav component */}
        <QuickNav />
        
        <div className="ml-2 flex items-center space-x-2">
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
      </div>
    </motion.div>
  );
};
