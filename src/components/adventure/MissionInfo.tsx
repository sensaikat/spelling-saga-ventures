
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
  
  return (
    <>
      <p className="mb-4 text-gray-700">{description}</p>
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
