
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideCharacter from '../guide';
import { TerrainType } from '../../contexts/adventure/types';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../utils/game';

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
  const navigate = useNavigate();
  const { selectedLanguage } = useGameStore();
  
  // Set an initial welcome message based on game context
  useEffect(() => {
    if (showGuide) {
      // Get dual language messages based on adventure mode or regular mode
      const messages = isAdventure 
        ? [
            `Welcome to the ${terrain} adventure! / ¡Bienvenido a la aventura de ${terrain}!`,
            `Explore this ${terrain} and solve language puzzles! / ¡Explora este ${terrain} y resuelve acertijos de idiomas!`,
            `Adventure awaits in the ${terrain}! Click on me for help. / ¡La aventura te espera en el ${terrain}! Haz clic en mí para obtener ayuda.`,
            `Ready for a language quest in the ${terrain}? / ¿Listo para una búsqueda de idiomas en el ${terrain}?`
          ]
        : [
            "Welcome to the Spelling Game! / ¡Bienvenido al Juego de Ortografía!",
            "Try to spell words correctly to earn points! / ¡Intenta deletrear palabras correctamente para ganar puntos!",
            "Need help? Just click on me anytime! / ¿Necesitas ayuda? ¡Simplemente haz clic en mí!",
            "Listen carefully to pronunciations to improve! / ¡Escucha atentamente las pronunciaciones para mejorar!"
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
  }, [showGuide, isAdventure, terrain]);
  
  // Navigation handler for the guide character
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <AnimatePresence>
      {showGuide && (
        <motion.div 
          className="fixed bottom-20 right-4 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <GuideCharacter 
            terrain={terrain}
            isAdventure={isAdventure}
            proactiveMessage={initialMessage || undefined}
            selectedLanguage={selectedLanguage}
            navigateTo={handleNavigate}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
