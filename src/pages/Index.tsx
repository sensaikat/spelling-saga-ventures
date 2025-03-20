
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Settings, BarChart, BookOpen } from 'lucide-react';
import { useGameStore } from '../utils/gameData';
import LanguageSelector from '../components/LanguageSelector';

const Index = () => {
  const navigate = useNavigate();
  const { selectedLanguage, checkAndUpdateStreak } = useGameStore();
  
  // Check streak when app loads
  useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Spelling Saga
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Learn to spell words in your language through fun interactive games
          </motion.p>
          
          {!selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8"
            >
              <motion.button
                className="primary-button group"
                onClick={() => document.getElementById('language-section')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}
          
          {selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                className="primary-button flex items-center gap-2"
                onClick={() => navigate('/game-mode')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={18} /> Play Now
              </motion.button>
              
              <motion.button
                className="secondary-button flex items-center gap-2"
                onClick={() => navigate('/progress')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart size={18} /> Progress
              </motion.button>
              
              <motion.button
                className="bg-gray-200 text-gray-700 font-medium rounded-full py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-300 active:scale-95 flex items-center gap-2"
                onClick={() => navigate('/settings')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={18} /> Settings
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        
        {/* Language Selection Section */}
        <motion.section 
          id="language-section" 
          className="pt-8 pb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {!selectedLanguage && <LanguageSelector />}
          
          {selectedLanguage && (
            <div className="text-center mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-display mb-2 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Currently Learning
              </motion.h2>
              
              <motion.div 
                className="flex items-center justify-center gap-2 text-lg text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-3xl">{selectedLanguage.flag}</span>
                <span>{selectedLanguage.name}</span>
              </motion.div>
              
              <motion.button
                className="mt-4 text-game-blue hover:text-blue-700 underline text-sm flex items-center gap-1 mx-auto"
                onClick={() => document.getElementById('language-section')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <BookOpen size={16} /> Change language
              </motion.button>
            </div>
          )}
          
          {/* The LanguageSelector will show here if no language is selected */}
        </motion.section>
        
        {/* Features Section */}
        <motion.section 
          className="py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-display text-center mb-12 text-gray-800">How it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="glass-panel p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-game-blue w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">1</div>
              <h3 className="text-xl font-medium mb-2">Choose a Language</h3>
              <p className="text-gray-600">Select your preferred language to practice spelling skills.</p>
            </motion.div>
            
            <motion.div 
              className="glass-panel p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-game-purple w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">2</div>
              <h3 className="text-xl font-medium mb-2">Play Fun Games</h3>
              <p className="text-gray-600">Engage in various spelling challenges and activities.</p>
            </motion.div>
            
            <motion.div 
              className="glass-panel p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-game-green w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">3</div>
              <h3 className="text-xl font-medium mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your learning journey and earn rewards.</p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
