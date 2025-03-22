import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGameStore } from '../../utils/game';
import { AdventureContextType, Location } from './types';
import { defaultCharacter, defaultLocations } from './defaultData';

export const AdventureContext = createContext<AdventureContextType>({} as AdventureContextType);

export const AdventureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [currentLocationId, setCurrentLocationId] = useState<string>('bedroom');
  const [character, setCharacter] = useState(defaultCharacter);
  const { addPoints } = useGameStore();

  useEffect(() => {
    const savedAdventure = localStorage.getItem('languageAdventure');
    if (savedAdventure) {
      try {
        const { locations: savedLocations, character: savedCharacter, currentLocationId: savedLocationId } = JSON.parse(savedAdventure);
        setLocations(savedLocations);
        setCharacter(savedCharacter);
        setCurrentLocationId(savedLocationId);
      } catch (e) {
        console.error("Error loading saved adventure:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('languageAdventure', JSON.stringify({
      locations,
      character,
      currentLocationId
    }));
  }, [locations, character, currentLocationId]);

  const unlockLocation = (locationId: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === locationId ? { ...loc, isLocked: false } : loc
    ));
  };

  const completeLocation = (locationId: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === locationId ? { ...loc, isCompleted: true } : loc
    ));

    const currentIndex = locations.findIndex(loc => loc.id === locationId);
    if (currentIndex >= 0 && currentIndex < locations.length - 1) {
      const nextLocation = locations[currentIndex + 1];
      unlockLocation(nextLocation.id);
    }

    addCredits(50);
    
    addPoints(50);
  };

  const setCurrentLocation = (locationId: string) => {
    setCurrentLocationId(locationId);
    setCharacter(prev => ({
      ...prev,
      currentLocation: locationId
    }));
  };

  const addCredits = (amount: number) => {
    setCharacter(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
  };

  const addStar = () => {
    setCharacter(prev => ({
      ...prev,
      stars: prev.stars + 1
    }));
  };

  const getCurrentLocation = () => {
    return locations.find(loc => loc.id === currentLocationId);
  };

  const getNextLocation = () => {
    const currentIndex = locations.findIndex(loc => loc.id === currentLocationId);
    if (currentIndex >= 0 && currentIndex < locations.length - 1) {
      return locations[currentIndex + 1];
    }
    return undefined;
  };

  return (
    <AdventureContext.Provider value={{
      locations,
      currentLocationId,
      character,
      unlockLocation,
      completeLocation,
      setCurrentLocation,
      addCredits,
      addStar,
      getCurrentLocation,
      getNextLocation
    }}>
      {children}
    </AdventureContext.Provider>
  );
};
