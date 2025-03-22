
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

export interface Character {
  name: string;
  avatar: string;
  currentLocation: string;
  inventory: string[];
  credits: number;
  stars: number;
}

export interface AdventureContextType {
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
