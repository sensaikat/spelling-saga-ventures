
import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../utils/game';

interface LanguageIndicatorProps {
  language: Language;
  onChangeLanguage: () => void;
}

const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ 
  language, 
  onChangeLanguage 
}) => {
  return (
    <motion.div 
      className="fixed top-20 right-6 z-40 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md flex items-center gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <span className="text-xl">{language.flag}</span>
      <span className="font-medium">{language.name}</span>
      <button 
        className="ml-2 text-sm text-blue-500 hover:underline"
        onClick={onChangeLanguage}
      >
        Change
      </button>
    </motion.div>
  );
};

export default LanguageIndicator;
