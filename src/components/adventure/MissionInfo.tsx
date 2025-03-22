
import React from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/adventure/types';
import { terrainCompanions } from './TerrainBackground';

interface MissionInfoProps {
  description: string;
  challengeDescription: string;
  terrain: TerrainType;
}

const MissionInfo: React.FC<MissionInfoProps> = ({
  description,
  challengeDescription,
  terrain
}) => {
  const companion = terrainCompanions[terrain];
  
  // Cultural insights based on terrain type
  const culturalInsight = React.useMemo(() => {
    switch(terrain) {
      case 'forest':
        return "Forests are often sacred places in many cultures, with unique folklore and traditions associated with woodland spirits.";
      case 'desert':
        return "Desert communities have developed ingenious ways to survive harsh conditions, creating rich cultural traditions and cuisine.";
      case 'river':
        return "Rivers are the lifeblood of civilizations, often giving rise to important cities, trade routes, and cultural exchanges.";
      case 'mountain':
        return "Mountain communities often preserve ancient traditions, crafts, and languages due to their relative isolation.";
      case 'castle':
        return "Historical buildings like castles reflect local architectural styles, building materials, and defensive innovations.";
      case 'space':
        return "Even in our imagined future among the stars, we carry our cultural heritage with us through stories, art, and traditions.";
      default:
        return "";
    }
  }, [terrain]);
  
  return (
    <>
      <p className="mb-4 text-gray-700">{description}</p>
      
      {culturalInsight && (
        <motion.div
          className="mb-4 text-sm bg-white/40 p-3 rounded-lg border border-white/20 text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <span className="text-lg mr-2">💫</span>
            <p>{culturalInsight}</p>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="italic text-gray-700 bg-white/50 p-4 rounded-lg border border-white/30"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start">
          <span className="text-2xl mr-3 mt-1">{companion}</span>
          <div>
            <p className="font-medium mb-1">Your mission:</p>
            <p>{challengeDescription}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MissionInfo;
