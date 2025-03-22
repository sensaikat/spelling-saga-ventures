
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, MapPin } from 'lucide-react';
import { Location } from '../../contexts/AdventureContext';
import { terrainIcons } from './TerrainBackground';

interface AdventureHeaderProps {
  currentLocation: Location;
  character: {
    name: string;
    avatar: string;
  };
  selectedLanguage?: {
    flag: string;
    name: string;
  };
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
  const terrainIcon = terrainIcons[currentLocation.terrain];
  
  return (
    <motion.div 
      className="glass-panel rounded-2xl p-6 shadow-xl mb-6 border border-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold">{currentLocation.name}</h1>
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <span>{character.avatar}</span>
            <span className="font-medium">{character.name}</span>
            {selectedLanguage && (
              <>
                <span>•</span>
                <span>{selectedLanguage.flag}</span>
                <span>{selectedLanguage.name}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <motion.button 
            className="p-3 rounded-full bg-white/50 backdrop-blur-sm text-blue-700 hover:bg-blue-200 shadow-md"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleTips}
          >
            <Volume2 size={20} />
          </motion.button>
          <motion.button 
            className="p-3 rounded-full bg-white/50 backdrop-blur-sm text-blue-700 hover:bg-blue-200 shadow-md"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onReturnToMap}
          >
            <MapPin size={20} />
          </motion.button>
        </div>
      </div>
      {/* Render children here */}
    </motion.div>
  );
};

export default AdventureHeader;
