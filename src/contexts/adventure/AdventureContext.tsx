
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGameStore } from '../../utils/game';
import { AdventureContextType, Location, Character, StoryPhase } from './types';
import { defaultCharacter, defaultLocations } from './defaultData';
import { 
  unlockLocationAction, 
  completeLocationAction, 
  getNextLocationId,
  addCreditsAction,
  addStarAction,
  setCurrentLocationAction,
  getCurrentLocation as getLocationById,
  getNextLocation as getNextLocationByCurrentId
} from './adventureActions';
import { saveAdventureState, loadAdventureState } from './adventurePersistence';

export const AdventureContext = createContext<AdventureContextType>({} as AdventureContextType);

export const AdventureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [currentLocationId, setCurrentLocationId] = useState<string>('bedroom');
  const [character, setCharacter] = useState(defaultCharacter);
  const { addPoints } = useGameStore();

  // Load saved adventure state
  useEffect(() => {
    const savedState = loadAdventureState();
    if (savedState) {
      setLocations(savedState.locations);
      setCharacter(savedState.character);
      setCurrentLocationId(savedState.currentLocationId);
    }
  }, []);

  // Save adventure state when it changes
  useEffect(() => {
    saveAdventureState(locations, character, currentLocationId);
  }, [locations, character, currentLocationId]);

  const unlockLocation = (locationId: string) => {
    setLocations(prev => unlockLocationAction(prev, locationId));
  };

  const completeLocation = (locationId: string) => {
    setLocations(prev => completeLocationAction(prev, locationId));

    // Unlock next location if it exists
    const nextLocationId = getNextLocationId(locations, locationId);
    if (nextLocationId) {
      unlockLocation(nextLocationId);
    }

    // Add credits and points
    addCredits(50);
    addPoints(50);
    
    // Set story phase to reward
    setStoryPhase('reward');
  };

  const setCurrentLocation = (locationId: string) => {
    setCurrentLocationId(locationId);
    setCharacter(prev => {
      const updatedCharacter = setCurrentLocationAction(prev, locationId);
      return {
        ...updatedCharacter,
        currentStoryPhase: 'introduction'
      };
    });
  };

  const addCredits = (amount: number) => {
    setCharacter(prev => addCreditsAction(prev, amount));
  };

  const addStar = () => {
    setCharacter(prev => addStarAction(prev));
  };

  const getCurrentLocation = () => {
    return getLocationById(locations, currentLocationId);
  };

  const getNextLocation = () => {
    return getNextLocationByCurrentId(locations, currentLocationId);
  };
  
  const setStoryPhase = (phase: StoryPhase) => {
    setCharacter(prev => ({
      ...prev,
      currentStoryPhase: phase
    }));
  };
  
  const getStoryline = (phase: StoryPhase) => {
    const location = getCurrentLocation();
    if (location?.storylines?.[phase]) {
      const stories = location.storylines[phase];
      const randomIndex = Math.floor(Math.random() * stories.length);
      return stories[randomIndex];
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
      getNextLocation,
      setStoryPhase,
      getStoryline
    }}>
      {children}
    </AdventureContext.Provider>
  );
};
