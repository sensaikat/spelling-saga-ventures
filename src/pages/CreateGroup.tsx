
import React from 'react';
import { motion } from 'framer-motion';
import CreateGroupForm from '../components/social/CreateGroupForm';

const CreateGroup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-display text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Create a Learning Group
        </motion.h1>
        
        <div className="max-w-4xl mx-auto">
          <CreateGroupForm />
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
