
import React from 'react';
import { motion } from 'framer-motion';

interface GameInfoProps {
  showInfo: boolean;
  hasAlphabetHelper: boolean;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  showInfo,
  hasAlphabetHelper,
}) => {
  if (!showInfo) return null;
  
  return (
    <motion.div 
      className="mt-4 p-3 bg-blue-50 rounded-lg text-sm"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
    >
      <h4 className="font-semibold mb-1">Game Information</h4>
      <ul className="list-disc list-inside space-y-1">
        <li>Type the word correctly to earn points</li>
        <li>You have a limited number of hints per game</li>
        <li>Skipping a word costs one life</li>
        <li>You can change difficulty level during the game</li>
        <li>Toggle audio to hear word pronunciations</li>
        {hasAlphabetHelper && (
          <li>Use the character keyboard to type in multiple languages and access special characters, numbers, and punctuation</li>
        )}
      </ul>
    </motion.div>
  );
};
