
import React from 'react';
import { motion } from 'framer-motion';

interface CharacterButtonProps {
  character: string;
  onClick: (char: string) => void;
}

const CharacterButton: React.FC<CharacterButtonProps> = ({ character, onClick }) => {
  return (
    <motion.button
      onClick={() => onClick(character)}
      className="min-w-8 h-8 flex items-center justify-center px-2 bg-white rounded border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-game-blue transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {character}
    </motion.button>
  );
};

export default CharacterButton;
