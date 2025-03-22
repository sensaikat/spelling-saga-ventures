import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Map, Globe, Settings, BarChart3 } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { useGameStore } from '../utils/game';

const Index = () => {
  const navigate = useNavigate();
  const { selectedLanguage } = useGameStore();

  const handleStartGame = () => {
    if (selectedLanguage) {
      navigate('/game-mode');
    }
  };

  const handleStartAdventure = () => {
    if (selectedLanguage) {
      navigate('/adventure');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
            Language Learning Game
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Build your vocabulary skills through fun challenges and adventures!
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LanguageSelector />
        </motion.div>

        <motion.div
          className="grid gap-4 w-full max-w-md"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.button
            onClick={handleStartGame}
            className="primary-button flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            disabled={!selectedLanguage}
          >
            <Globe size={20} />
            Start Practicing
            <ChevronRight size={16} />
          </motion.button>

          <motion.button
            onClick={handleStartAdventure}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white w-full font-medium rounded-full py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            disabled={!selectedLanguage}
          >
            <Map size={20} />
            Start Adventure
            <ChevronRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => navigate('/progress')}
            className="secondary-button flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <BarChart3 size={20} />
            View Progress
          </motion.button>

          <motion.button
            onClick={() => navigate('/settings')}
            className="text-gray-600 bg-white border border-gray-300 w-full font-medium rounded-full py-3 px-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Settings size={20} />
            Settings
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
