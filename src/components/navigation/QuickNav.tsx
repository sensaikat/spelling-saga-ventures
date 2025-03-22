
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Gamepad, MapIcon, Book, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickNavProps {
  className?: string;
}

const QuickNav: React.FC<QuickNavProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
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
        onClick={() => navigate('/game')}
        aria-label="Games"
      >
        <Gamepad size={18} />
      </motion.button>
      
      <motion.button
        className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/adventure')}
        aria-label="Adventure"
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
    </div>
  );
};

export default QuickNav;
