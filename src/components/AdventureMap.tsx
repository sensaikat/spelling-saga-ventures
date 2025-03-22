
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdventure } from '../contexts/adventure';
import { useGameStore } from '../utils/game';
import AdventureMapHeader from './adventure/AdventureMapHeader';
import LocationGrid from './adventure/LocationGrid';

interface AdventureMapProps {
  onLocationSelect?: (locationId: string) => void;
}

const AdventureMap: React.FC<AdventureMapProps> = ({ onLocationSelect }) => {
  const { locations, currentLocationId, setCurrentLocation, character } = useAdventure();
  const navigate = useNavigate();
  const { selectedLanguage } = useGameStore();
  
  // Add a safety check for character
  if (!character) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  
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
      <AdventureMapHeader 
        selectedLanguage={selectedLanguage} 
        character={character} 
      />
      
      <LocationGrid 
        locations={locations}
        currentLocationId={currentLocationId}
        onLocationSelect={handleLocationClick}
        credits={character.credits}
      />
    </div>
  );
};

export default AdventureMap;
