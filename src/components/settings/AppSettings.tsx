
import React from 'react';
import { Globe, Wifi, WifiOff, Download, Trash } from 'lucide-react';
import { useGameStore } from '../../utils/game';
import { motion } from 'framer-motion';

const AppSettings = () => {
  const { isOfflineMode, toggleOfflineMode } = useGameStore();
  
  const handleClearProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      // Reset progress by reloading the app - the store will re-initialize
      window.localStorage.removeItem('spelling-saga-game-storage');
      window.location.href = '/';
    }
  };
  
  return (
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
  );
};

export default AppSettings;
