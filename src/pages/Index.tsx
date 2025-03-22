
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Settings, BookOpen, Map, Trophy, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';
import { useGameStore } from '../utils/game';
import LanguageSelector from '../components/LanguageSelector';

const Index = () => {
  const navigate = useNavigate();
  const { selectLanguage, selectedLanguage, progress } = useGameStore();
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  
  const handleStartGame = () => {
    if (selectedLanguage) {
      navigate('/game-mode');
    } else {
      setShowLanguageSelector(true);
    }
  };
  
  const handleStartAdventure = () => {
    if (selectedLanguage) {
      navigate('/adventure');
    } else {
      setShowLanguageSelector(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={logo} alt="Spelling Saga" className="w-32 md:w-40 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display text-gray-800">Spelling Saga</h1>
          <p className="text-lg text-gray-600 mt-2">Your adventure in learning to spell</p>
        </motion.header>
        
        <AnimatePresence mode="wait">
          {showLanguageSelector ? (
            <motion.div
              key="language-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <LanguageSelector />
              <div className="text-center mt-8">
                <button 
                  onClick={() => setShowLanguageSelector(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Back to menu
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main-menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto"
            >
              {selectedLanguage && (
                <div className="mb-6 text-center">
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-gray-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-xl">{selectedLanguage.flag}</span>
                    <span>{selectedLanguage.name}</span>
                    <button 
                      onClick={() => setShowLanguageSelector(true)}
                      className="ml-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      (change)
                    </button>
                  </motion.div>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                <motion.button
                  className="glass-panel p-4 flex items-center justify-between hover:border-game-blue transition-colors"
                  onClick={handleStartGame}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center">
                    <BookOpen className="text-game-blue w-6 h-6 mr-3" />
                    <div className="text-left">
                      <h2 className="text-lg font-medium">Play Classic Mode</h2>
                      <p className="text-sm text-gray-600">Practice spelling with different word lists</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </motion.button>
                
                <motion.button
                  className="glass-panel p-4 flex items-center justify-between hover:border-game-purple transition-colors"
                  onClick={handleStartAdventure}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center">
                    <Map className="text-game-purple w-6 h-6 mr-3" />
                    <div className="text-left">
                      <h2 className="text-lg font-medium">Adventure Mode</h2>
                      <p className="text-sm text-gray-600">Learn spelling through an exciting adventure</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </motion.button>
                
                <motion.button
                  className="glass-panel p-4 flex items-center justify-between hover:border-game-green transition-colors"
                  onClick={() => navigate('/multi-language')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center">
                    <Languages className="text-game-green w-6 h-6 mr-3" />
                    <div className="text-left">
                      <h2 className="text-lg font-medium">Multi-Language Mode</h2>
                      <p className="text-sm text-gray-600">Practice multiple languages together</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </motion.button>
                
                <motion.button
                  className="glass-panel p-4 flex items-center justify-between hover:border-amber-500 transition-colors"
                  onClick={() => navigate('/learning')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center">
                    <Sparkles className="text-amber-500 w-6 h-6 mr-3" />
                    <div className="text-left">
                      <h2 className="text-lg font-medium">Learning Dashboard</h2>
                      <p className="text-sm text-gray-600">Track your progress and get insights</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </motion.button>
              </div>
              
              <div className="mt-6 flex justify-between">
                <motion.button 
                  className="flex items-center gap-2 p-3 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => navigate('/settings')}
                  whileHover={{ scale: 1.05 }}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </motion.button>
                
                <motion.button 
                  className="flex items-center gap-2 p-3 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => navigate('/progress')}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy size={18} />
                  <span>Your Progress</span>
                </motion.button>
              </div>
              
              {progress.streakDays > 0 && (
                <motion.div
                  className="mt-8 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-gray-600">
                    Current streak: <span className="font-medium text-game-blue">{progress.streakDays} days</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
