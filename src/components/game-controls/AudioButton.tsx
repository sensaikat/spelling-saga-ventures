
import React from 'react';
import { motion } from 'framer-motion';
import { Volume, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  audioEnabled: boolean;
  onSpeak: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  audioEnabled,
  onSpeak,
}) => {
  return (
    <motion.button
      onClick={onSpeak}
      className="game-control-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Pronounce word"
    >
      {audioEnabled ? <Volume size={20} /> : <VolumeX size={20} />}
    </motion.button>
  );
};
