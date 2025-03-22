
import React from 'react';
import { Globe, Wifi, WifiOff, Download, Trash, CreditCard, Sun, Moon, Volume2, Music } from 'lucide-react';
import { useGameStore } from '../../utils/game';
import { motion } from 'framer-motion';
import { useSubscriptionStore } from '../../utils/subscription';
import { useNavigate } from 'react-router-dom';
import { FreemiumFeatureGate } from '../subscription';
import { ThemeControls } from '../theme/ThemeControls';
import { useThemeStore, ThemeMode } from '../../contexts/theme/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppSettings = () => {
  const navigate = useNavigate();
  const { isOfflineMode, toggleOfflineMode } = useGameStore();
  const { subscription } = useSubscriptionStore();
  const { themeMode, setThemeMode } = useThemeStore();
  
  const handleClearProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      // Reset progress by reloading the app - the store will re-initialize
      window.localStorage.removeItem('spelling-saga-game-storage');
      window.location.href = '/';
    }
  };
  
  return (
    <motion.div 
      className="glass-panel p-6 mb-6 dark:bg-gray-800/80 dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <Tabs defaultValue="general">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={20} className="text-game-purple dark:text-purple-400" />
          <h3 className="text-xl font-medium">App Settings</h3>
        </div>
        
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="theme">Theme & Sound</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="mb-4">
            <FreemiumFeatureGate feature="offlineMode">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  {isOfflineMode ? <WifiOff size={20} /> : <Wifi size={20} />}
                  <div>
                    <p className="font-medium">Offline Mode</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isOfflineMode 
                        ? "You can use the app without internet connection" 
                        : "App requires internet connection"}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={toggleOfflineMode}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                    isOfflineMode ? 'bg-game-green justify-end' : 'bg-gray-300 dark:bg-gray-600 justify-start'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                    isOfflineMode ? 'translate-x-0' : '-translate-x-1'
                  }`} />
                </button>
              </div>
            </FreemiumFeatureGate>
          </div>
          
          <div className="mb-4 mt-6">
            <div className="flex justify-between">
              <FreemiumFeatureGate feature="offlineMode">
                <motion.button 
                  className="text-gray-700 dark:text-gray-300 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={18} />
                  <span>Download Data for Offline</span>
                </motion.button>
              </FreemiumFeatureGate>
              
              <motion.button 
                className="text-red-600 flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClearProgress}
              >
                <Trash size={18} />
                <span>Reset Progress</span>
              </motion.button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="theme">
          <div className="grid gap-6">
            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Sun size={18} className="text-amber-500" />
                <Moon size={18} className="text-indigo-400" />
                <span>Theme Mode</span>
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                {(['light', 'dark', 'auto'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setThemeMode(mode)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      themeMode === mode 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Volume2 size={18} className="text-green-500" />
                <Music size={18} className="text-blue-500" />
                <span>Sound Settings</span>
              </h4>
              
              <ThemeControls />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="subscription">
          <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-game-purple dark:text-purple-400" />
                <div>
                  <p className="font-medium">Subscription</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subscription.isSubscribed 
                      ? `Currently on ${subscription.currentPlan?.name} plan` 
                      : "Upgrade to access premium features"}
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/subscription')}
                className="text-purple-600 dark:text-purple-400 flex items-center gap-2 px-3 py-1 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
              >
                <span>{subscription.isSubscribed ? "Manage" : "Upgrade"}</span>
              </motion.button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AppSettings;
