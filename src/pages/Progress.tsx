
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Award, BarChart, BarChart2, Users } from 'lucide-react';
import { useGameStore, Word, wordLists } from '../utils/game';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChildProgressReport from '../components/progress/ChildProgressReport';

const Progress = () => {
  const navigate = useNavigate();
  const { selectedLanguage, progress } = useGameStore();
  const [viewMode, setViewMode] = useState<'child' | 'detailed'>('child');
  
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
          className="mb-8 flex items-center justify-between"
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
          
          <div className="flex gap-3">
            <motion.button
              onClick={() => setViewMode('child')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                viewMode === 'child' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star size={16} />
              <span>Kid View</span>
            </motion.button>
            
            <motion.button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                viewMode === 'detailed' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart2 size={16} />
              <span>Detailed View</span>
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/learning-dashboard')}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users size={16} />
              <span>Dashboard</span>
            </motion.button>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-display text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {viewMode === 'child' ? "Your Amazing Progress!" : "Your Progress"}
        </motion.h1>
        
        <div className="max-w-4xl mx-auto">
          {viewMode === 'child' ? (
            <ChildProgressReport 
              masteredWords={masteredWords}
              totalWords={totalWords}
              level={progress.level}
              points={progress.points}
              streak={progress.streakDays}
            />
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
