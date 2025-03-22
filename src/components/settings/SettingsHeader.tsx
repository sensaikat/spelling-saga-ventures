
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuickNav from '../navigation/QuickNav';

const SettingsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
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
        
        <QuickNav />
      </motion.div>
      
      <motion.h1 
        className="text-3xl md:text-4xl font-display text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Settings
      </motion.h1>
    </>
  );
};

export default SettingsHeader;
