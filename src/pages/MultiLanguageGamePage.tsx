
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { MultiLanguageGameContainer } from '../components/multi-language';
import { Language } from '../utils/game/types';
import { MultiLanguageWordList } from '../components/multi-language/types';

interface LocationState {
  selectedLanguages: Language[];
  selectedWordLists: MultiLanguageWordList[];
}

const MultiLanguageGamePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  // If there's no state or no selected languages, redirect to the main page
  if (!state || !state.selectedLanguages || state.selectedLanguages.length === 0) {
    return <Navigate to="/" replace />;
  }
  
  return <MultiLanguageGameContainer 
    selectedLanguages={state.selectedLanguages}
    selectedWordLists={state.selectedWordLists}
  />;
};

export default MultiLanguageGamePage;
