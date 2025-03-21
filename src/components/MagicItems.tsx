
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glasses, Sparkles, Search, Wand2 } from 'lucide-react';

// Types of magic items
export type MagicItemType = 'lens' | 'specs' | 'wand';

interface MagicItemProps {
  type: MagicItemType;
  onUse: () => void;
  isActive: boolean;
}

const MagicItems: React.FC<MagicItemProps> = ({ type, onUse, isActive }) => {
  const [animating, setAnimating] = useState(false);
  
  const handleActivate = () => {
    if (animating) return;
    
    setAnimating(true);
    onUse();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  };
  
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      <motion.button
        className={`relative z-10 p-3 rounded-full ${
          isActive ? 'bg-yellow-200' : 'bg-white/80'
        } backdrop-blur-sm shadow-md cursor-pointer border-2 ${
          isActive ? 'border-yellow-400' : 'border-gray-200'
        }`}
        onClick={handleActivate}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        aria-label={`Use magic ${type}`}
      >
        {type === 'lens' && <Search size={24} className={isActive ? 'text-yellow-600' : 'text-gray-600'} />}
        {type === 'specs' && <Glasses size={24} className={isActive ? 'text-yellow-600' : 'text-gray-600'} />}
        {type === 'wand' && <Wand2 size={24} className={isActive ? 'text-yellow-600' : 'text-gray-600'} />}
      </motion.button>
      
      <AnimatePresence>
        {(isActive || animating) && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.3, 0]
            }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            <Sparkles 
              size={40} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MagicItems;
