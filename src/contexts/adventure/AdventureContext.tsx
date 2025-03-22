
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

export const AdventureContext = createContext<AdventureContextType>({
  // Provide default values to prevent undefined errors
  locations: defaultLocations,
  currentLocationId: 'bedroom',
  character: defaultCharacter,
  unlockLocation: () => {},
  completeLocation: () => {},
  setCurrentLocation: () => {},
  addCredits: () => {},
  addStar: () => {},
  getCurrentLocation: () => undefined,
  getNextLocation: () => undefined,
  setStoryPhase: () => {},
  getStoryline: () => undefined
});

export const AdventureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [currentLocationId, setCurrentLocationId] = useState<string>('bedroom');
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const { addPoints } = useGameStore();

  // Load saved adventure state
  useEffect(() => {
    const savedState = loadAdventureState();
    if (savedState) {
      setLocations(savedState.locations || defaultLocations);
      setCharacter(savedState.character || defaultCharacter);
      setCurrentLocationId(savedState.currentLocationId || 'bedroom');
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
      // Ensure we have a valid character object
      const validCharacter = prev || {...defaultCharacter};
      const updatedCharacter = setCurrentLocationAction(validCharacter, locationId);
      return {
        ...updatedCharacter,
        currentStoryPhase: 'introduction'
      };
    });
  };

  const addCredits = (amount: number) => {
    setCharacter(prev => {
      // Ensure we have a valid character object
      const validCharacter = prev || {...defaultCharacter};
      return addCreditsAction(validCharacter, amount);
    });
  };

  const addStar = () => {
    setCharacter(prev => {
      // Ensure we have a valid character object
      const validCharacter = prev || {...defaultCharacter};
      return addStarAction(validCharacter);
    });
  };

  const getCurrentLocation = () => {
    return getLocationById(locations, currentLocationId);
  };

  const getNextLocation = () => {
    return getNextLocationByCurrentId(locations, currentLocationId);
  };
  
  const setStoryPhase = (phase: StoryPhase) => {
    setCharacter(prev => {
      // Ensure we have a valid character object
      const validCharacter = prev || {...defaultCharacter};
      return {
        ...validCharacter,
        currentStoryPhase: phase
      };
    });
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
