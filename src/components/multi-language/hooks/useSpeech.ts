
import { useState } from 'react';

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = (text: string, languageId: string) => {
    if (!text || !languageId) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageId;
      
      // Set speaking state
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error('Speech synthesis error');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported in this browser');
    }
  };
  
  return { speakWord, isSpeaking };
};
