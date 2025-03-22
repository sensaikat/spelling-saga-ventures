
import { useState, useEffect } from 'react';
import { useGameStore } from '../../../utils/game';
import { GreetingType } from '../types';
import { getTipsByPersonality, getGuideGreeting, getRandomTip } from '../utils/tipUtils';

interface UseGuideCharacterProps {
  selectedAvatar?: string;
  terrain?: string;
  selectedLanguage?: string;
  proactiveMessage?: string;
}

export const useGuideCharacter = ({
  selectedAvatar,
  terrain = 'forest',
  selectedLanguage,
  proactiveMessage
}: UseGuideCharacterProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [magicItemUsed, setMagicItemUsed] = useState(false);
  const [greetingType, setGreetingType] = useState<GreetingType>('hello');
  const { selectedLanguage: gameLanguage } = useGameStore();
  
  const avatarKey = selectedAvatar || terrain;
  const languageCode = selectedLanguage || (gameLanguage ? gameLanguage.id.split('-')[0] : 'en');
  
  // Handle proactive messages
  useEffect(() => {
    if (proactiveMessage) {
      setCurrentTip(proactiveMessage);
      setShowMessage(true);
      
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [proactiveMessage]);
  
  // Handle random appearances
  useEffect(() => {
    if (!proactiveMessage) {
      const randomAppearance = Math.random() > 0.7;
      if (randomAppearance && !showMessage) {
        const timer = setTimeout(() => {
          const tipTypes = getTipsByPersonality();
          const randomTip = getRandomTip(tipTypes);
          setCurrentTip(randomTip);
          setGreetingType(Math.random() > 0.8 ? 'wellDone' : 'hello');
          setShowMessage(true);
        }, 5000 + Math.random() * 15000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [showMessage, proactiveMessage]);
  
  const handleUseMagicItem = () => {
    setMagicItemUsed(true);
    setTimeout(() => {
      setMagicItemUsed(false);
    }, 5000);
  };
  
  const showSpecificMessage = (message: string) => {
    setCurrentTip(message);
    setShowMessage(true);
  };
  
  const handleGuideClick = () => {
    if (!showMessage) {
      if (Math.random() > 0.5) {
        const randomType = Math.random() > 0.7 
          ? 'goodbye' 
          : (Math.random() > 0.5 ? 'wellDone' : 'hello');
        
        setGreetingType(randomType as GreetingType);
      } else {
        const tipTypes = getTipsByPersonality();
        const randomTip = getRandomTip(tipTypes);
        setCurrentTip(randomTip);
      }
      setShowMessage(true);
    }
  };

  return {
    showMessage,
    setShowMessage,
    currentTip,
    setCurrentTip,
    magicItemUsed,
    greetingType,
    setGreetingType,
    languageCode,
    avatarKey,
    handleUseMagicItem,
    showSpecificMessage,
    handleGuideClick
  };
};
