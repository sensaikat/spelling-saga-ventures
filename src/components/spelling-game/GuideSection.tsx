
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideCharacter from '../guide';
import { TerrainType } from '../../contexts/adventure/types';

interface GuideSectionProps {
  showGuide: boolean;
  isAdventure: boolean;
  terrain?: TerrainType;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
  showGuide,
  isAdventure,
  terrain = 'forest'
}) => {
  const [initialMessage, setInitialMessage] = useState<string | null>(null);
  
  // Set an initial welcome message
  useEffect(() => {
    if (showGuide) {
      const messages = [
        "Welcome! I'm here to help you with your language adventure.",
        "Need any help with the game? Just click on me!",
        "Try to spell the words correctly to earn points and advance!",
        "You can use the navigation buttons to move between sections quickly."
      ];
      
      // Randomly select a message
      const randomIndex = Math.floor(Math.random() * messages.length);
      setInitialMessage(messages[randomIndex]);
      
      // Clear the message after it's been displayed
      const timer = setTimeout(() => {
        setInitialMessage(null);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [showGuide]);
  
  return (
    <AnimatePresence>
      {showGuide && (
        <motion.div 
          className="absolute bottom-20 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <GuideCharacter 
            terrain={terrain}
            isAdventure={isAdventure}
            proactiveMessage={initialMessage || undefined}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
