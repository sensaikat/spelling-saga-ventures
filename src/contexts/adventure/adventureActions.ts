
import { Location, Character } from './types';

export const unlockLocationAction = (
  locations: Location[], 
  locationId: string
): Location[] => {
  return locations.map(loc => 
    loc.id === locationId ? { ...loc, isLocked: false } : loc
  );
};

export const completeLocationAction = (
  locations: Location[],
  locationId: string
): Location[] => {
  return locations.map(loc => 
    loc.id === locationId ? { ...loc, isCompleted: true } : loc
  );
};

export const getNextLocationId = (
  locations: Location[],
  currentLocationId: string
): string | undefined => {
  const currentIndex = locations.findIndex(loc => loc.id === currentLocationId);
  if (currentIndex >= 0 && currentIndex < locations.length - 1) {
    return locations[currentIndex + 1].id;
  }
  return undefined;
};

export const addCreditsAction = (
  character: Character,
  amount: number
): Character => {
  return {
    ...character,
    credits: character.credits + amount
  };
};

export const addStarAction = (
  character: Character
): Character => {
  return {
    ...character,
    stars: character.stars + 1
  };
};

export const setCurrentLocationAction = (
  character: Character,
  locationId: string
): Character => {
  return {
    ...character,
    currentLocation: locationId
  };
};

export const getCurrentLocation = (
  locations: Location[],
  currentLocationId: string
): Location | undefined => {
  return locations.find(loc => loc.id === currentLocationId);
};

export const getNextLocation = (
  locations: Location[],
  currentLocationId: string
): Location | undefined => {
  const currentIndex = locations.findIndex(loc => loc.id === currentLocationId);
  if (currentIndex >= 0 && currentIndex < locations.length - 1) {
    return locations[currentIndex + 1];
  }
  return undefined;
};
