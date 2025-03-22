
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface CharacterButtonProps {
  character: string;
  onClick: () => void;
  onPronounce?: () => void;
  languageId?: string;
}

const CharacterButton: React.FC<CharacterButtonProps> = ({ 
  character, 
  onClick,
  onPronounce,
  languageId 
}) => {
  return (
    <motion.div
      className="relative w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        className="w-full py-2 px-1 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors"
        onClick={onClick}
        aria-label={`Character ${character}`}
      >
        {character}
      </motion.button>
      
      {onPronounce && (
        <button 
          className="absolute top-0 right-0 p-1 bg-white/80 rounded-full m-1 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={(e) => {
            e.stopPropagation();
            onPronounce();
          }}
          aria-label={`Pronounce ${character}`}
        >
          <Volume2 size={12} />
        </button>
      )}
    </motion.div>
  );
};

export default CharacterButton;
