
import { useState, useEffect, useRef } from 'react';
import { Word, useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';
import { soundEffects } from '../../../utils/audio';

export const useAudioControls = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { selectedLanguage } = useGameStore();
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    // Preload voices when component mounts
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    
    // Cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
    
    // Play a sound effect to confirm the toggle
    if (!audioEnabled) {
      const audio = new Audio(soundEffects.click);
      audio.volume = 0.5;
      audio.play().catch(err => console.error("Audio toggle error:", err));
    }
    
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
      
      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(word.text);
      utterance.lang = selectedLanguage.id;
      speechSynthRef.current = utterance;
      
      // Safely get available voices with a retry mechanism
      let voices = window.speechSynthesis.getVoices();
      
      if (voices.length === 0) {
        // If voices aren't loaded yet, wait a moment and try again
        setTimeout(() => {
          voices = window.speechSynthesis.getVoices();
          tryToSetVoice(voices, utterance, selectedLanguage.id);
          speakUtterance(utterance, word);
        }, 100);
      } else {
        // Voices are already loaded
        tryToSetVoice(voices, utterance, selectedLanguage.id);
        speakUtterance(utterance, word);
      }
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
  
  const tryToSetVoice = (voices: SpeechSynthesisVoice[], utterance: SpeechSynthesisUtterance, languageId: string) => {
    // Try to find a matching voice for the language
    const matchingVoice = voices.find(voice => 
      voice.lang.startsWith(languageId) || 
      languageId.startsWith(voice.lang.split('-')[0])
    );
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
  };
  
  const speakUtterance = (utterance: SpeechSynthesisUtterance, word: Word) => {
    // Set speaking state
    setIsSpeaking(true);
    
    // Add event handlers
    utterance.onend = () => {
      setIsSpeaking(false);
      speechSynthRef.current = null;
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      speechSynthRef.current = null;
      console.error('Speech synthesis error');
      toast({
        title: "Pronunciation Error",
        description: `Couldn't pronounce "${word.text}" in ${selectedLanguage?.name}`,
        variant: "destructive",
        duration: 3000,
      });
    };
    
    // Try to speak with error handling
    try {
      window.speechSynthesis.speak(utterance);
      
      // Safari bug workaround: if speech doesn't start within 500ms, try again
      setTimeout(() => {
        if (isSpeaking && !window.speechSynthesis.speaking) {
          window.speechSynthesis.speak(utterance);
        }
      }, 500);
    } catch (err) {
      console.error("Speech synthesis error:", err);
      setIsSpeaking(false);
      speechSynthRef.current = null;
    }
  };
  
  return {
    audioEnabled,
    isSpeaking,
    toggleAudio,
    speakWord
  };
};
