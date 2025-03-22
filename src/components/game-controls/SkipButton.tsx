
import React from 'react';
import { motion } from 'framer-motion';

interface SkipButtonProps {
  onSkip: () => void;
  isPlaying: boolean;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
  onSkip,
  isPlaying,
}) => {
  return (
    <motion.button
      onClick={onSkip}
      disabled={!isPlaying}
      className={`game-control-button ${!isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={isPlaying ? { scale: 1.1 } : {}}
      whileTap={isPlaying ? { scale: 0.9 } : {}}
      title="Skip word"
    >
      Skip
    </motion.button>
  );
};
