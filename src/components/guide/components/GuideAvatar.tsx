
import React from 'react';
import { motion } from 'framer-motion';
import { GuideAppearance } from '../types';

interface GuideAvatarProps {
  guide: GuideAppearance;
  showMessage: boolean;
  onClick: () => void;
}

export const GuideAvatar: React.FC<GuideAvatarProps> = ({
  guide,
  showMessage,
  onClick
}) => {
  return (
    <motion.div
      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
        showMessage ? 'border-4' : 'border-2'
      } shadow-lg cursor-pointer relative ${guide.color}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      animate={{ 
        y: [0, -5, 0],
        rotate: [0, 5, 0, -5, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 4,
        ease: "easeInOut"
      }}
    >
      {guide.emoji}
      
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ 
          boxShadow: ['0px 0px 0px rgba(255,255,255,0)', '0px 0px 10px rgba(255,255,255,0.5)', '0px 0px 0px rgba(255,255,255,0)'],
          scale: [1, 1.1, 1]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      
      {!showMessage && (
        <motion.div 
          className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.div>
  );
};
