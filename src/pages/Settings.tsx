
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Languages, Globe, Download, Trash, Wifi, WifiOff } from 'lucide-react';
import { languages, useGameStore } from '../utils/gameData';

const Settings = () => {
  const navigate = useNavigate();
  const { 
    selectedLanguage, 
    selectLanguage, 
    isOfflineMode, 
    toggleOfflineMode,
    progress
  } = useGameStore();
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langId = e.target.value;
    const language = languages.find(lang => lang.id === langId);
    if (language) {
      selectLanguage(language);
    }
  };
  
  const handleClearProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      // Reset progress by reloading the app - the store will re-initialize
      window.localStorage.removeItem('spelling-saga-game-storage');
      window.location.href = '/';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="mb-8 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Home</span>
          </button>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-display text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Settings
        </motion.h1>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="glass-panel p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Languages size={20} className="text-game-blue" />
              <h3 className="text-xl font-medium">Language Settings</h3>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Select your learning language
              </label>
              <select 
                value={selectedLanguage?.id || ''}
                onChange={handleLanguageChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-game-blue"
              >
                <option value="" disabled>Choose a language</option>
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-panel p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe size={20} className="text-game-purple" />
              <h3 className="text-xl font-medium">App Settings</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  {isOfflineMode ? <WifiOff size={20} /> : <Wifi size={20} />}
                  <div>
                    <p className="font-medium">Offline Mode</p>
                    <p className="text-xs text-gray-500">
                      {isOfflineMode 
                        ? "You can use the app without internet connection" 
                        : "App requires internet connection"}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={toggleOfflineMode}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                    isOfflineMode ? 'bg-game-green justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                    isOfflineMode ? 'translate-x-0' : '-translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
            
            <div className="mb-4 mt-6">
              <div className="flex justify-between">
                <motion.button 
                  className="text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={18} />
                  <span>Download Data for Offline</span>
                </motion.button>
                
                <motion.button 
                  className="text-red-600 flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClearProgress}
                >
                  <Trash size={18} />
                  <span>Reset Progress</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-xl font-medium mb-4">About</h3>
            <p className="text-gray-600 mb-2">Spelling Saga</p>
            <p className="text-gray-600 mb-4">Version 1.0.0</p>
            <p className="text-sm text-gray-500">
              An educational app designed to help children improve their spelling skills through interactive games and exercises.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center mt-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p>Data saved locally: {localStorage.getItem('spelling-saga-game-storage') ? 'Yes' : 'No'}</p>
            <p>Current streak: {progress.streakDays} days</p>
            <p>Last played: {progress.lastPlayed || 'Never'}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
