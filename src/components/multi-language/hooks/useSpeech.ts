
import { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakWord = (text: string, languageId: string) => {
    if (!text || !languageId) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageId;
      utteranceRef.current = utterance;
      
      // Safely get available voices with a retry mechanism
      let voices = window.speechSynthesis.getVoices();
      
      if (voices.length === 0) {
        // If voices aren't loaded yet, wait a moment and try again
        setTimeout(() => {
          voices = window.speechSynthesis.getVoices();
          tryToSetVoice(voices, utterance, languageId);
          speakUtterance(utterance, text);
        }, 100);
      } else {
        // Voices are already loaded
        tryToSetVoice(voices, utterance, languageId);
        speakUtterance(utterance, text);
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
  
  const speakUtterance = (utterance: SpeechSynthesisUtterance, text: string) => {
    // Set speaking state
    setIsSpeaking(true);
    
    // Add event handlers
    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
      console.error('Speech synthesis error');
      toast({
        title: "Pronunciation Error",
        description: `Couldn't pronounce "${text}"`,
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
      utteranceRef.current = null;
    }
  };
  
  return { 
    speakWord, 
    isSpeaking,
    cancelSpeech: () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        utteranceRef.current = null;
      }
    }
  };
};
