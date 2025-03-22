
import React from 'react';
import { motion } from 'framer-motion';

interface CharacterButtonProps {
  character: string;
  onClick: () => void;
}

const CharacterButton: React.FC<CharacterButtonProps> = ({ character, onClick }) => {
  return (
    <motion.button
      className="w-full py-2 px-1 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {character}
    </motion.button>
  );
};

export default CharacterButton;
