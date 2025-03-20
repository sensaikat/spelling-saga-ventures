
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, useGameStore } from '../utils/gameData';
import { motion } from 'framer-motion';

const LanguageSelector = () => {
  const navigate = useNavigate();
  const { selectLanguage } = useGameStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleLanguageSelect = (language: typeof languages[0], index: number) => {
    setSelectedIndex(index);
    selectLanguage(language);
    
    // Delay navigation to show the selection animation
    setTimeout(() => {
      navigate('/game-mode');
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    selected: { scale: 1.05, y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.h2 
        className="text-2xl md:text-3xl font-display text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose your language
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {languages.map((language, index) => (
          <motion.div
            key={language.id}
            variants={itemVariants}
            animate={selectedIndex === index ? "selected" : "visible"}
            whileHover={{ scale: 1.03, y: -3 }}
            className="glass-panel p-6 cursor-pointer"
            onClick={() => handleLanguageSelect(language, index)}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-4xl mb-3">{language.flag}</span>
              <h3 className="text-xl font-medium text-gray-800">{language.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{language.nativeName}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LanguageSelector;
