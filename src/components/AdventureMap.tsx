
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Lock, Check, ChevronRight } from 'lucide-react';
import { Location, useAdventure } from '../contexts/AdventureContext';
import { useGameStore } from '../utils/gameData';

const terrainColors = {
  forest: 'bg-green-100 border-green-500 text-green-700',
  desert: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  river: 'bg-blue-100 border-blue-500 text-blue-700',
  mountain: 'bg-slate-100 border-slate-500 text-slate-700',
  castle: 'bg-purple-100 border-purple-500 text-purple-700',
  space: 'bg-indigo-100 border-indigo-500 text-indigo-700',
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
      className={`relative rounded-lg p-4 border-2 ${cardColor} ${
        isActive ? 'ring-2 ring-offset-2 ring-blue-400' : ''
      } cursor-pointer`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {location.isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}
      
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{terrainIcon}</span>
        <h3 className="font-medium text-lg">{location.name}</h3>
      </div>
      
      {location.isLocked ? (
        <div className="flex flex-col items-center justify-center text-center py-4">
          <Lock className="mb-2" />
          <p className="text-sm text-gray-600">
            Requires {location.requiredPoints} points to unlock
          </p>
          {character.credits >= location.requiredPoints && (
            <button
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Unlock logic would be here
              }}
            >
              Unlock Now
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-sm mb-2">{location.description}</p>
          <p className="text-xs italic">{location.challengeDescription}</p>
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
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Language Adventure</h2>
          {selectedLanguage && (
            <p className="text-sm text-gray-600">
              {selectedLanguage.flag} Exploring in {selectedLanguage.name}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="mr-1">⭐</span>
            <span className="font-medium">{character.stars}</span>
          </div>
          <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
            <span className="mr-1">🪙</span>
            <span className="font-medium">{character.credits}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map(location => (
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
