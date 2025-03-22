
import { useState, useEffect } from 'react';
import { Word, useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';

export const useAudioControls = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { selectedLanguage } = useGameStore();
  
  useEffect(() => {
    // Cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
    toast({
      title: audioEnabled ? "Audio Disabled" : "Audio Enabled",
      description: audioEnabled ? "Text-to-speech has been turned off." : "Text-to-speech has been turned on.",
      duration: 2000,
    });
  };
  
  const speakWord = (word: Word) => {
    if (!audioEnabled || !selectedLanguage) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(word.text);
      utterance.lang = selectedLanguage.id;
      
      // Get available voices and try to find a matching one for the language
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(voice => 
        voice.lang.startsWith(selectedLanguage.id) || 
        selectedLanguage.id.startsWith(voice.lang.split('-')[0])
      );
      
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }
      
      // Set speaking state
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error('Speech synthesis error');
        toast({
          title: "Pronunciation Error",
          description: `Couldn't pronounce "${word.text}" in ${selectedLanguage.name}`,
          variant: "destructive",
          duration: 3000,
        });
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported in this browser');
      toast({
        title: "Speech Not Supported",
        description: "Your browser doesn't support text-to-speech functionality",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return {
    audioEnabled,
    isSpeaking,
    toggleAudio,
    speakWord
  };
};
