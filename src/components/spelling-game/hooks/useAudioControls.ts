
import { useState } from 'react';
import { Word, useGameStore } from '../../../utils/game';

export const useAudioControls = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const { selectedLanguage } = useGameStore();
  
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };
  
  const speakWord = (word: Word) => {
    if (!selectedLanguage) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.text);
      utterance.lang = selectedLanguage.id;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return {
    audioEnabled,
    toggleAudio,
    speakWord
  };
};
