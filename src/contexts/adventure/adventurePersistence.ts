
import { Location, Character } from './types';

interface SavedAdventureState {
  locations: Location[];
  character: Character;
  currentLocationId: string;
}

export const saveAdventureState = (
  locations: Location[],
  character: Character,
  currentLocationId: string
): void => {
  const adventureState: SavedAdventureState = {
    locations,
    character,
    currentLocationId
  };
  
  try {
    localStorage.setItem('languageAdventure', JSON.stringify(adventureState));
  } catch (e) {
    console.error("Error saving adventure state:", e);
  }
};

export const loadAdventureState = (): SavedAdventureState | null => {
  try {
    const savedAdventure = localStorage.getItem('languageAdventure');
    if (savedAdventure) {
      return JSON.parse(savedAdventure);
    }
  } catch (e) {
    console.error("Error loading saved adventure:", e);
  }
  return null;
};
