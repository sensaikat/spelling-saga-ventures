
import React from 'react';
import { motion } from 'framer-motion';
import { Type } from 'lucide-react';

interface AlphabetHelperButtonProps {
  onAlphabetHelperToggle: () => void;
  showAlphabetHelper: boolean;
}

export const AlphabetHelperButton: React.FC<AlphabetHelperButtonProps> = ({
  onAlphabetHelperToggle,
  showAlphabetHelper,
}) => {
  return (
    <motion.button
      onClick={onAlphabetHelperToggle}
      className="game-control-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={showAlphabetHelper ? "Hide character keyboard" : "Show character keyboard"}
    >
      <Type size={20} />
      {showAlphabetHelper && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-game-green rounded-full"></span>
      )}
    </motion.button>
  );
};
