
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, MapIcon, Settings, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
        onClick={() => isAdventure ? handleAdventureReturn() : navigate('/game-mode')} 
        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>{isAdventure ? 'Back to Adventure' : 'Exit Game'}</span>
      </button>
      
      <div className="flex items-center space-x-2">
        {/* Quick Navigation Menu */}
        <motion.button
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <Home size={18} />
        </motion.button>
        
        <motion.button
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/adventure')}
          aria-label="Adventure Map"
        >
          <MapIcon size={18} />
        </motion.button>
        
        <motion.button
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/progress')}
          aria-label="Progress"
        >
          <Book size={18} />
        </motion.button>
        
        <motion.button
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/settings')}
          aria-label="Settings"
        >
          <Settings size={18} />
        </motion.button>
        
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
