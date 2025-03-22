
import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../utils/game';

const AboutSection = () => {
  const { progress } = useGameStore();
  
  return (
    <>
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
    </>
  );
};

export default AboutSection;
