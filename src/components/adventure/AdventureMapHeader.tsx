
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import { Character } from '../../contexts/adventure';
import { Language } from '../../utils/game';

interface AdventureMapHeaderProps {
  selectedLanguage: Language | null;
  character: Character;
}

const AdventureMapHeader: React.FC<AdventureMapHeaderProps> = ({ 
  selectedLanguage, 
  character 
}) => {
  return (
    <motion.div 
      className="glass-panel p-6 mb-6 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
            Language Adventure
          </h2>
          {selectedLanguage && (
            <p className="text-sm text-gray-600 flex items-center">
              {selectedLanguage.flag} 
              <span className="ml-2">Exploring in {selectedLanguage.name}</span>
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <motion.div 
            className="flex items-center bg-yellow-100 px-4 py-2 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Star size={18} className="mr-2 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700">{character.stars}</span>
          </motion.div>
          <motion.div 
            className="flex items-center bg-blue-100 px-4 py-2 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
          >
            <Trophy size={18} className="mr-2 text-blue-500" />
            <span className="font-bold text-blue-700">{character.credits}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdventureMapHeader;
