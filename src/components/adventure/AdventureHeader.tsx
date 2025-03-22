import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Trophy, Sparkles, HelpCircle } from 'lucide-react';
import { Character, Location } from '../../contexts/adventure/types';
import { Language } from '../../utils/game';

interface AdventureHeaderProps {
  currentLocation: Location;
  character: Character;
  selectedLanguage: Language | null;
  onReturnToMap: () => void;
  onToggleTips: () => void;
  showTips: boolean;
}

const AdventureHeader: React.FC<AdventureHeaderProps> = ({
  currentLocation,
  character,
  selectedLanguage,
  onReturnToMap,
  onToggleTips,
  showTips
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <motion.button
          className="flex items-center gap-1 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReturnToMap}
        >
          <ChevronLeft size={18} />
          <span>Adventure Map</span>
        </motion.button>
        
        <div className="flex items-center space-x-3">
          <motion.button
            className={`p-2 rounded-full shadow-md transition-colors ${
              showTips ? 'bg-blue-500 text-white' : 'bg-white/70 text-blue-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTips}
          >
            <HelpCircle size={20} />
          </motion.button>
          
          <motion.div 
            className="flex items-center bg-yellow-100 px-3 py-1.5 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <Star size={18} className="mr-1 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700">{character.stars}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy size={18} className="mr-1 text-blue-500" />
            <span className="font-bold text-blue-700">{character.credits}</span>
          </motion.div>
        </div>
      </div>
      
      <div className="glass-panel bg-white/60 backdrop-blur-sm p-5 rounded-xl shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">{currentLocation.name}</h1>
            {selectedLanguage && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">{selectedLanguage.flag}</span>
                <span>Learning in {selectedLanguage.name}</span>
              </div>
            )}
          </div>
          
          <motion.div
            className="text-4xl"
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            {character.avatar}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdventureHeader;
