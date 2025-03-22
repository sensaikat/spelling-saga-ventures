
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progressPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => {
  return (
    <motion.div 
      className="w-full bg-gray-200 h-2 rounded-full mb-6"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <motion.div 
        className="bg-game-blue h-full rounded-full" 
        style={{ width: `${progressPercentage}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};
