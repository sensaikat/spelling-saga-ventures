
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface InfoButtonProps {
  onClick: () => void;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="game-control-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Game information"
    >
      <Info size={20} />
    </motion.button>
  );
};
