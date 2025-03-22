
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Languages, Play, Settings, Info } from 'lucide-react';
import { useGameStore, Language, wordLists, GameMode } from '../../utils/game';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import MultiLanguageSelector from '../MultiLanguageSelector';
import MultiLanguageWordSelector from './MultiLanguageWordSelector';
import { MultiLanguageWordList } from './types';

const MultiLanguageGame: React.FC = () => {
  const navigate = useNavigate();
  const { selectLanguage, setCurrentWordList, setSelectedGameMode, selectedGameMode } = useGameStore();
  
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [selectedWordLists, setSelectedWordLists] = useState<MultiLanguageWordList[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Reset selected word lists when languages change
    setSelectedWordLists([]);
    setIsReady(false);
  }, [selectedLanguages]);
  
  useEffect(() => {
    // Check if we have word lists for all selected languages
    const ready = selectedLanguages.length > 0 && 
                  selectedLanguages.every(lang => 
                    selectedWordLists.some(list => list.languageId === lang.id));
    setIsReady(ready);
  }, [selectedLanguages, selectedWordLists]);
  
  const handleLanguagesChange = (languages: Language[]) => {
    setSelectedLanguages(languages);
    
    // Update selected word lists to remove any for languages no longer selected
    setSelectedWordLists(prev => 
      prev.filter(list => languages.some(lang => lang.id === list.languageId))
    );
  };
  
  const handleAddWordList = (wordList: MultiLanguageWordList) => {
    // Check if we already have a word list for this language
    const existingIndex = selectedWordLists.findIndex(
      list => list.languageId === wordList.languageId
    );
    
    if (existingIndex >= 0) {
      // Replace existing word list
      const newLists = [...selectedWordLists];
      newLists[existingIndex] = wordList;
      setSelectedWordLists(newLists);
    } else {
      // Add new word list
      setSelectedWordLists([...selectedWordLists, wordList]);
    }
  };
  
  const handleStartGame = () => {
    if (!isReady) {
      toast({
        title: "Not ready to start",
        description: "Please select at least one language and word list for each language.",
        variant: "destructive"
      });
      return;
    }
    
    // We'll use the first language as the "primary" language for the game store
    // but our custom component will handle all languages
    const primaryLanguage = selectedLanguages[0];
    selectLanguage(primaryLanguage);
    
    // Set the first word list as the current one (just for store consistency)
    const primaryWordList = selectedWordLists.find(list => list.languageId === primaryLanguage.id);
    if (primaryWordList) {
      const originalWordList = wordLists[primaryLanguage.id].find(list => list.id === primaryWordList.originalId);
      if (originalWordList) {
        setCurrentWordList(originalWordList);
      }
    }
    
    // Use spelling mode by default if none selected
    if (!selectedGameMode) {
      const spellingMode: GameMode = {
        id: 'spelling',
        name: 'Spelling Practice',
        description: 'Practice spelling words correctly',
        icon: '✏️',
        color: 'bg-game-blue'
      };
      setSelectedGameMode(spellingMode);
    }
    
    // Navigate to our custom multi-language game page
    navigate('/multi-language-game', { 
      state: { 
        selectedLanguages,
        selectedWordLists 
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
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
          className="text-3xl md:text-4xl font-display text-center mb-8 text-gray-800 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Languages className="text-game-purple" size={32} />
          <span>Multi-Language Learning</span>
        </motion.h1>
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="glass-panel p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Languages size={20} className="text-game-blue" />
              <span>Choose Languages to Learn Together</span>
            </h2>
            
            <p className="text-gray-600 mb-4">
              Select up to 3 languages to practice together. You'll be challenged to recognize and translate words between these languages.
            </p>
            
            <MultiLanguageSelector 
              selectedLanguages={selectedLanguages}
              onLanguagesChange={handleLanguagesChange}
              maxLanguages={3}
            />
          </motion.div>
          
          {selectedLanguages.length > 0 && (
            <motion.div 
              className="glass-panel p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="text-xl font-medium mb-4">Choose Word Lists</h2>
              
              <p className="text-gray-600 mb-4">
                Select a word list for each language you've chosen. These words will be used in your multi-language learning session.
              </p>
              
              {selectedLanguages.map(language => (
                <MultiLanguageWordSelector
                  key={language.id}
                  language={language}
                  onSelectWordList={handleAddWordList}
                  selectedWordList={selectedWordLists.find(list => list.languageId === language.id)}
                />
              ))}
            </motion.div>
          )}
          
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={handleStartGame}
              disabled={!isReady}
              className="bg-game-green hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg flex items-center gap-2"
            >
              <Play size={20} />
              <span>Start Multi-Language Game</span>
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-6 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>Learn multiple languages simultaneously to enhance your language skills!</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguageGame;
