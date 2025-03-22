
import React from 'react';
import { motion } from 'framer-motion';

interface WordHintProps {
  hint: string;
  showHint: boolean;
}

export const WordHint: React.FC<WordHintProps> = ({ hint, showHint }) => {
  if (!showHint || !hint) return null;
  
  return (
    <motion.p 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm bg-yellow-50 text-gray-700 mt-2 p-2 rounded-md text-center border border-yellow-200"
    >
      {hint}
    </motion.p>
  );
};
