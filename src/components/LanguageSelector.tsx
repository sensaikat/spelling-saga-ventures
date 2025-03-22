
import React from 'react';
import { motion } from 'framer-motion';
import { languages } from '../utils/game';
import { LanguageFeatureGate } from './subscription';

interface LanguageSelectorProps {
  onSelect: (language: typeof languages[0]) => void;
}

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  // Get all language IDs for access control
  const allLanguageIds = languages.map(lang => lang.id);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {languages.map(language => (
        <LanguageFeatureGate 
          key={language.id}
          language={language}
          availableLanguageIds={allLanguageIds}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(language)}
            className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow transition-all"
          >
            <div className="text-2xl mb-2">{language.flag}</div>
            <div className="font-medium text-sm">{language.name}</div>
            <div className="text-xs text-gray-500">{language.nativeName}</div>
          </motion.button>
        </LanguageFeatureGate>
      ))}
    </div>
  );
};

export default LanguageSelector;
