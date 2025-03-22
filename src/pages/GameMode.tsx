import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Shuffle, Copy, TextCursorInput } from 'lucide-react';
import { gameModes, useGameStore, wordLists } from '../utils/game';

const GameMode = () => {
  const navigate = useNavigate();
  const { selectedLanguage, setSelectedGameMode, setCurrentWordList } = useGameStore();
  
  // Guard for direct access (no language selected)
  if (!selectedLanguage) {
    navigate('/');
    return null;
  }
  
  const availableWordLists = wordLists[selectedLanguage.id] || [];
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'pencil': return <Pencil className="mb-2" size={32} />;
      case 'shuffle': return <Shuffle className="mb-2" size={32} />;
      case 'duplicate': return <Copy className="mb-2" size={32} />;
      case 'text-cursor-input': return <TextCursorInput className="mb-2" size={32} />;
      default: return <Pencil className="mb-2" size={32} />;
    }
  };
  
  const handleGameSelection = (gameMode: typeof gameModes[0]) => {
    setSelectedGameMode(gameMode);
    
    // For now, just select the first word list for the selected language
    if (availableWordLists.length > 0) {
      setCurrentWordList(availableWordLists[0]);
    }
    
    navigate(`/play/${gameMode.id}`);
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
            <span>Back</span>
          </button>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-display text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose a Game Mode
        </motion.h1>
        
        <motion.div 
          className="text-center mb-10 flex items-center justify-center gap-2 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-2xl">{selectedLanguage.flag}</span>
          <span>{selectedLanguage.name}</span>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {gameModes.map((gameMode) => (
            <motion.div
              key={gameMode.id}
              className={`glass-panel p-8 cursor-pointer text-center ${gameMode.color.replace('bg-', 'hover:border-')}`}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                borderColor: gameMode.color.replace('bg-', '')
              }}
              onClick={() => handleGameSelection(gameMode)}
            >
              <div className={`${gameMode.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                {getIconComponent(gameMode.icon)}
              </div>
              <h2 className="text-2xl font-medium mb-2">{gameMode.name}</h2>
              <p className="text-gray-600">{gameMode.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GameMode;
