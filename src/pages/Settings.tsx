
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Languages, Globe, Download, Trash, Wifi, WifiOff, Search, X } from 'lucide-react';
import { languages, useGameStore } from '../utils/game';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';

const Settings = () => {
  const navigate = useNavigate();
  const { 
    selectedLanguage, 
    selectLanguage, 
    isOfflineMode, 
    toggleOfflineMode,
    progress
  } = useGameStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  
  useEffect(() => {
    if (searchQuery) {
      setFilteredLanguages(
        languages.filter(lang => 
          lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredLanguages(languages);
    }
  }, [searchQuery]);
  
  const handleLanguageChange = (langId: string) => {
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
  
  // Group languages by regions
  const languageGroups = {
    'Asian': ['hi', 'zh', 'bn', 'or', 'ta', 'te'],
    'European': ['en', 'es', 'fr', 'pl'],
    'Middle Eastern': ['ar']
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
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Select your learning language
              </label>
              
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-game-blue"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              {searchQuery ? (
                <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                  {filteredLanguages.length === 0 ? (
                    <div className="p-3 text-center text-gray-500">
                      No languages found
                    </div>
                  ) : (
                    filteredLanguages.map(lang => (
                      <div 
                        key={lang.id}
                        className={`p-3 flex items-center hover:bg-gray-50 cursor-pointer ${selectedLanguage?.id === lang.id ? 'bg-blue-50 border-l-4 border-game-blue' : ''}`}
                        onClick={() => handleLanguageChange(lang.id)}
                      >
                        <span className="text-2xl mr-3">{lang.flag}</span>
                        <div>
                          <div className="font-medium">{lang.name}</div>
                          <div className="text-sm text-gray-500">{lang.nativeName}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <Select 
                  value={selectedLanguage?.id || ''}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageGroups).map(([group, ids]) => (
                      <SelectGroup key={group}>
                        <SelectLabel>{group}</SelectLabel>
                        {languages
                          .filter(lang => ids.includes(lang.id))
                          .map(lang => (
                            <SelectItem key={lang.id} value={lang.id}>
                              <div className="flex items-center">
                                <span className="mr-2">{lang.flag}</span>
                                {lang.name} ({lang.nativeName})
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {languages.slice(0, 5).map(lang => (
                <button
                  key={lang.id}
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1 ${
                    selectedLanguage?.id === lang.id 
                      ? 'bg-game-blue text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleLanguageChange(lang.id)}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700">
                + More
              </button>
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
              Now supporting 11 languages including Bengali, Oriya, Tamil, Telugu, Polish, and Arabic!
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
