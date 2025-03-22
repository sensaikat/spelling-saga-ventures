
import React from 'react';
import { Volume, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WordCardButtonsProps {
  onSpeakClick?: (e: React.MouseEvent) => void;
  onHintClick?: (e: React.MouseEvent) => void;
}

export const WordCardButtons: React.FC<WordCardButtonsProps> = ({
  onSpeakClick,
  onHintClick,
}) => {
  return (
    <div className="flex space-x-2">
      {onHintClick && (
        <motion.button
          className="text-gray-600 hover:text-game-yellow"
          onClick={onHintClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Get a hint"
        >
          <HelpCircle size={20} />
        </motion.button>
      )}
      {onSpeakClick && (
        <motion.button
          className="text-gray-600 hover:text-game-blue"
          onClick={onSpeakClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Listen to pronunciation"
        >
          <Volume size={20} />
        </motion.button>
      )}
    </div>
  );
};
