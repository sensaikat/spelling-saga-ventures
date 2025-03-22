import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, useGameStore } from '../utils/game';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const LanguageSelector = () => {
  const navigate = useNavigate();
  const { selectLanguage } = useGameStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

  const handleLanguageSelect = (language: typeof languages[0], index: number) => {
    setSelectedIndex(index);
    selectLanguage(language);
    
    setTimeout(() => {
      navigate('/game-mode');
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    selected: { scale: 1.05, y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.h2 
        className="text-2xl md:text-3xl font-display text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose your language
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 max-w-md mx-auto"
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-full border-2 border-gray-200 focus:border-game-blue shadow-sm"
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
      </motion.div>
      
      {filteredLanguages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-8"
        >
          No languages found matching "{searchQuery}"
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredLanguages.map((language, index) => (
            <motion.div
              key={language.id}
              variants={itemVariants}
              animate={selectedIndex === index ? "selected" : "visible"}
              whileHover={{ scale: 1.03, y: -3 }}
              className="glass-panel p-4 cursor-pointer"
              onClick={() => handleLanguageSelect(language, index)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-4xl mb-2">{language.flag}</span>
                <h3 className="text-lg font-medium text-gray-800">{language.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{language.nativeName}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSelector;
