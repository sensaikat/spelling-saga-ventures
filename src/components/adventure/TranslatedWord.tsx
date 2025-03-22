
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../utils/game/types';
import { toast } from '@/hooks/use-toast';

interface TranslatedWordProps {
  word: string;
  translations: Record<string, string>;
  language: Language | null;
  children?: React.ReactNode;
}

const TranslatedWord: React.FC<TranslatedWordProps> = ({
  word,
  translations,
  language,
  children
}) => {
  const [showTranslation, setShowTranslation] = useState(false);

  // Get translation based on language ID, or fallback to the original word
  const getTranslation = () => {
    if (!language) return word;
    return translations[language.id] || word;
  };

  const handleClick = () => {
    setShowTranslation(!showTranslation);
    
    // Show translation in toast for better visibility
    if (!showTranslation && language) {
      const translation = getTranslation();
      if (translation !== word) {
        toast({
          title: `${word} in ${language.name}:`,
          description: translation,
          duration: 3000,
        });
      }
    }
  };

  return (
    <span 
      className="relative inline-block group cursor-pointer text-primary-600 font-medium"
      onClick={handleClick}
    >
      {children || word}
      <motion.span 
        className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-300 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {showTranslation && language && translations[language.id] && (
        <motion.span 
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 text-xs font-normal bg-white/90 dark:bg-gray-800/90 rounded shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {getTranslation()}
        </motion.span>
      )}
    </span>
  );
};

export default TranslatedWord;
