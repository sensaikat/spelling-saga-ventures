
import React from 'react';
import CharacterButton from './CharacterButton';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: string[];
  onCharacterClick: (char: string) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters, onCharacterClick }) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {characters.map((char, index) => (
        <CharacterButton 
          key={index}
          character={char}
          onClick={onCharacterClick}
        />
      ))}
    </motion.div>
  );
};

export default CharacterGrid;
