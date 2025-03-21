
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGameStore } from '../utils/gameData';

// Types for our adventure system
export type TerrainType = 'forest' | 'desert' | 'river' | 'mountain' | 'castle' | 'space';
export type RoomType = 'bedroom' | 'kitchen' | 'livingRoom' | 'garden' | 'school' | 'market' | 'park' | 'busStop';

export interface Location {
  id: string;
  name: string;
  room: RoomType;
  terrain: TerrainType;
  description: string;
  challengeDescription: string;
  isLocked: boolean;
  isCompleted: boolean;
  requiredPoints: number;
  imagePath?: string;
}

interface Character {
  name: string;
  avatar: string;
  currentLocation: string;
  inventory: string[];
  credits: number;
  stars: number;
}

interface AdventureContextType {
  locations: Location[];
  currentLocationId: string;
  character: Character;
  unlockLocation: (locationId: string) => void;
  completeLocation: (locationId: string) => void;
  setCurrentLocation: (locationId: string) => void;
  addCredits: (amount: number) => void;
  addStar: () => void;
  getCurrentLocation: () => Location | undefined;
  getNextLocation: () => Location | undefined;
}

const defaultCharacter: Character = {
  name: 'Explorer',
  avatar: '👦',
  currentLocation: 'bedroom',
  inventory: [],
  credits: 0,
  stars: 0,
};

// Initialize with some default locations
const defaultLocations: Location[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    room: 'bedroom',
    terrain: 'forest',
    description: 'Your cozy bedroom has transformed into an enchanted forest with tall, magical trees!',
    challengeDescription: 'Learn the names of forest animals in your chosen language to navigate through.',
    isLocked: false,
    isCompleted: false,
    requiredPoints: 0,
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    room: 'kitchen',
    terrain: 'desert',
    description: 'The kitchen has become a vast desert with sand dunes and an oasis in the distance!',
    challengeDescription: 'Collect the names of food items to find water in the desert.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 50,
  },
  {
    id: 'livingRoom',
    name: 'Living Room',
    room: 'livingRoom',
    terrain: 'river',
    description: 'The living room is now a rushing river with waterfalls and whirlpools!',
    challengeDescription: 'Learn water-related words to safely navigate the river currents.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 100,
  },
  {
    id: 'garden',
    name: 'Garden',
    room: 'garden',
    terrain: 'mountain',
    description: 'Your garden has transformed into towering mountains with snow-capped peaks!',
    challengeDescription: 'Master nature vocabulary to climb to the mountain summit.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 150,
  },
  {
    id: 'school',
    name: 'School',
    room: 'school',
    terrain: 'castle',
    description: 'Your school is now a magnificent castle with towers and a moat!',
    challengeDescription: 'Learn academic words to solve the castle\'s ancient riddles.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 200,
  },
  {
    id: 'market',
    name: 'Market',
    room: 'market',
    terrain: 'space',
    description: 'The market has become an interstellar trading post in outer space!',
    challengeDescription: 'Master shopping and trading vocabulary to barter with alien merchants.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 250,
  },
];

export const AdventureContext = createContext<AdventureContextType>({} as AdventureContextType);

export const AdventureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [currentLocationId, setCurrentLocationId] = useState<string>('bedroom');
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const { addPoints } = useGameStore();

  // Load saved state from localStorage
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

  // Save state to localStorage
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

    // Find the next location and unlock it
    const currentIndex = locations.findIndex(loc => loc.id === locationId);
    if (currentIndex >= 0 && currentIndex < locations.length - 1) {
      const nextLocation = locations[currentIndex + 1];
      unlockLocation(nextLocation.id);
    }

    // Award 50 credits for completing a location
    addCredits(50);
    
    // Also add points to the main game store
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

export const useAdventure = () => useContext(AdventureContext);
