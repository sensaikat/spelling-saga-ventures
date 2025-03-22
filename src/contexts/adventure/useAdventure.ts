
import { useContext } from 'react';
import { AdventureContext } from './AdventureContext';
import { AdventureContextType } from './types';

export const useAdventure = (): AdventureContextType => useContext(AdventureContext);
