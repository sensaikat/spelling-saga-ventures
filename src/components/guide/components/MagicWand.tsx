
import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles } from 'lucide-react';

interface MagicWandProps {
  magicItemUsed: boolean;
  onUseMagicItem: () => void;
}

export const MagicWand: React.FC<MagicWandProps> = ({
  magicItemUsed,
  onUseMagicItem
}) => {
  return (
    <motion.div
      className={`absolute -top-16 -left-10 p-3 rounded-full ${
        magicItemUsed ? 'bg-yellow-200' : 'bg-white'
      } shadow-md cursor-pointer`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      onClick={onUseMagicItem}
      animate={magicItemUsed ? {
        boxShadow: ['0px 0px 8px rgba(255,220,100,0.8)', '0px 0px 16px rgba(255,220,100,0.8)', '0px 0px 8px rgba(255,220,100,0.8)'],
      } : {}}
      transition={{ repeat: magicItemUsed ? Infinity : 0, duration: 1.5 }}
    >
      <div className="relative">
        <Wand2 size={24} className={magicItemUsed ? 'text-yellow-600' : 'text-gray-600'} />
        {magicItemUsed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.2, 0]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Sparkles size={32} className="text-yellow-500" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
