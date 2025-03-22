
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Lock, Check, ChevronRight, Star, Trophy, Rocket } from 'lucide-react';
import { Location, useAdventure } from '../contexts/adventure';
import { useGameStore } from '../utils/gameData';

const terrainColors = {
  forest: 'bg-gradient-to-br from-green-100 to-green-300 border-green-500 text-green-800',
  desert: 'bg-gradient-to-br from-yellow-100 to-yellow-300 border-yellow-500 text-yellow-800',
  river: 'bg-gradient-to-br from-blue-100 to-blue-300 border-blue-500 text-blue-800',
  mountain: 'bg-gradient-to-br from-slate-100 to-slate-300 border-slate-500 text-slate-800',
  castle: 'bg-gradient-to-br from-purple-100 to-purple-300 border-purple-500 text-purple-800',
  space: 'bg-gradient-to-br from-indigo-100 to-indigo-300 border-indigo-500 text-indigo-800',
};

const terrainIcons = {
  forest: '🌳',
  desert: '🏜️',
  river: '🌊',
  mountain: '⛰️',
  castle: '🏰',
  space: '🚀',
};

interface LocationCardProps {
  location: Location;
  onClick: () => void;
  isActive: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onClick, isActive }) => {
  const { character } = useAdventure();
  
  const cardColor = terrainColors[location.terrain];
  const terrainIcon = terrainIcons[location.terrain];
  
  return (
    <motion.div
      className={`relative rounded-2xl p-5 border-2 shadow-lg ${cardColor} ${
        isActive ? 'ring-4 ring-offset-2 ring-blue-400' : ''
      } cursor-pointer overflow-hidden`}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {location.isCompleted && (
        <motion.div 
          className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1.5 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
        >
          <Check size={16} />
        </motion.div>
      )}
      
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3 floating-element">{terrainIcon}</span>
        <h3 className="font-display font-bold text-xl">{location.name}</h3>
      </div>
      
      {location.isLocked ? (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <motion.div 
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
          >
            <Lock className="mb-3 text-yellow-600" size={28} />
          </motion.div>
          <p className="text-sm font-medium mb-2">
            Requires {location.requiredPoints} points to unlock
          </p>
          {character.credits >= location.requiredPoints && (
            <motion.button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Unlock logic would be here
              }}
            >
              Unlock Now <Rocket size={14} className="inline ml-1" />
            </motion.button>
          )}
        </div>
      ) : (
        <>
          <p className="text-sm mb-3 font-medium">{location.description}</p>
          <div className="italic text-xs bg-white/50 p-2 rounded-lg">
            <p className="font-medium">Your mission:</p>
            <p>{location.challengeDescription}</p>
          </div>
          
          <motion.div 
            className="absolute -right-3 -bottom-3 opacity-20 text-5xl"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            {terrainIcon}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

interface AdventureMapProps {
  onLocationSelect?: (locationId: string) => void;
}

const AdventureMap: React.FC<AdventureMapProps> = ({ onLocationSelect }) => {
  const { locations, currentLocationId, setCurrentLocation, character } = useAdventure();
  const navigate = useNavigate();
  const { selectedLanguage } = useGameStore();
  
  const handleLocationClick = (locationId: string) => {
    const location = locations.find(loc => loc.id === locationId);
    if (!location || location.isLocked) return;
    
    setCurrentLocation(locationId);
    if (onLocationSelect) {
      onLocationSelect(locationId);
    } else {
      navigate(`/play/spelling`);
    }
  };
  
  return (
    <div className="p-4 space-y-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location, index) => (
          <LocationCard
            key={location.id}
            location={location}
            onClick={() => handleLocationClick(location.id)}
            isActive={location.id === currentLocationId}
          />
        ))}
      </div>
    </div>
  );
};

export default AdventureMap;
