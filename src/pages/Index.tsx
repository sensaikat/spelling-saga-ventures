
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageSelector } from '../components/LanguageSelector';
import { MultiLanguageSelector } from '../components/MultiLanguageSelector';
import { languages, useGameStore } from '../utils/game';
import { Settings, Book, Map } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { selectLanguage, checkAndUpdateStreak } = useGameStore();
  
  // Check and update streak when app loads
  React.useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);
  
  const handleLanguageSelect = (language: typeof languages[0]) => {
    selectLanguage(language);
    navigate('/game-mode');
  };
  
  const handleMultiLanguageSelect = () => {
    navigate('/multi-language');
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="flex justify-end mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/progress')}
              aria-label="View Progress"
            >
              <Book size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/adventure')}
              aria-label="Adventure Mode"
            >
              <Map size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/settings')}
              aria-label="Settings"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </motion.div>
      
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-800 mb-4">
            Spelling Saga
          </h1>
          <p className="text-xl text-gray-600">Choose a language to begin your adventure</p>
        </motion.div>
      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              variants={itemVariants}
              className="glass-panel p-6"
            >
              <h2 className="text-2xl font-medium mb-6 text-center">Single Language Mode</h2>
              <LanguageSelector onSelect={handleLanguageSelect} />
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="glass-panel p-6"
            >
              <h2 className="text-2xl font-medium mb-6 text-center">Multi-Language Mode</h2>
              <MultiLanguageSelector onSelect={handleMultiLanguageSelect} />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-16 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>Learn vocabulary in multiple languages with interactive games</p>
          <p className="mt-1">© 2023 Spelling Saga</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
