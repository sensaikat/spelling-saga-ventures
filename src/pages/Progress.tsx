
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Award, BarChart } from 'lucide-react';
import { useGameStore, Word, wordLists } from '../utils/gameData';

const Progress = () => {
  const navigate = useNavigate();
  const { selectedLanguage, progress } = useGameStore();
  
  // Guard for direct access
  if (!selectedLanguage) {
    navigate('/');
    return null;
  }
  
  const availableWordLists = wordLists[selectedLanguage.id] || [];
  
  // Get all words from all word lists for this language
  const allWords: Word[] = availableWordLists.flatMap(list => list.words);
  
  // Filter mastered words
  const masteredWords = allWords.filter(word => 
    progress.wordsMastered.includes(word.id)
  );
  
  // Calculate total words and progress percentage
  const totalWords = allWords.length;
  const masteredPercentage = totalWords > 0 
    ? Math.round((masteredWords.length / totalWords) * 100) 
    : 0;
  
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
          Your Progress
        </motion.h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Summary Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div 
              className="glass-panel p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Level</h3>
                <div className="bg-game-yellow w-10 h-10 rounded-full flex items-center justify-center">
                  <Star size={20} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{progress.level}</p>
              <p className="text-sm text-gray-500 mt-2">{progress.points} total points</p>
            </motion.div>
            
            <motion.div 
              className="glass-panel p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Streak</h3>
                <div className="bg-game-red w-10 h-10 rounded-full flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{progress.streakDays} days</p>
              <p className="text-sm text-gray-500 mt-2">Keep learning daily!</p>
            </motion.div>
            
            <motion.div 
              className="glass-panel p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Mastered</h3>
                <div className="bg-game-green w-10 h-10 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{masteredWords.length}</p>
              <p className="text-sm text-gray-500 mt-2">of {totalWords} words</p>
            </motion.div>
          </motion.div>
          
          {/* Overall Progress */}
          <motion.div 
            className="glass-panel p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart size={20} className="text-game-blue" />
              <h3 className="text-xl font-medium">Overall Progress</h3>
            </div>
            
            <div className="w-full bg-gray-200 h-6 rounded-full mb-2">
              <motion.div 
                className="bg-game-blue h-full rounded-full flex items-center justify-end pr-2"
                style={{ width: `${masteredPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${masteredPercentage}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {masteredPercentage >= 10 && (
                  <span className="text-xs font-medium text-white">{masteredPercentage}%</span>
                )}
              </motion.div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
          </motion.div>
          
          {/* Mastered Words */}
          <motion.div 
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h3 className="text-xl font-medium mb-6">Words You've Mastered</h3>
            
            {masteredWords.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {masteredWords.map((word) => (
                  <motion.div 
                    key={word.id}
                    className="bg-white rounded-lg shadow p-3 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="font-medium">{word.text}</p>
                    <p className={`text-xs mt-1 ${
                      word.difficulty === 'easy' ? 'text-game-green' :
                      word.difficulty === 'medium' ? 'text-game-yellow' :
                      'text-game-red'
                    }`}>
                      {word.difficulty}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>You haven't mastered any words yet. Keep practicing!</p>
                <motion.button
                  onClick={() => navigate('/game-mode')}
                  className="primary-button mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
