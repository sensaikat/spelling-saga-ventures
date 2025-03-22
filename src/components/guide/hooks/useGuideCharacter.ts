
import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../../../utils/game';
import { GreetingType } from '../types';
import { getTipsByPersonality, getGuideGreeting, getRandomTip } from '../utils/tipUtils';
import { useNavigate } from 'react-router-dom';

interface UseGuideCharacterProps {
  selectedAvatar?: string;
  terrain?: string;
  selectedLanguage?: string;
  proactiveMessage?: string;
  isAdventure?: boolean;
}

export const useGuideCharacter = ({
  selectedAvatar,
  terrain = 'forest',
  selectedLanguage,
  proactiveMessage,
  isAdventure = false
}: UseGuideCharacterProps) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [magicItemUsed, setMagicItemUsed] = useState(false);
  const [greetingType, setGreetingType] = useState<GreetingType>('hello');
  const { selectedLanguage: gameLanguage } = useGameStore();
  
  const avatarKey = selectedAvatar || terrain;
  const languageCode = selectedLanguage || (gameLanguage ? gameLanguage.id.split('-')[0] : 'en');
  
  // Get contextual tips based on current route
  const getContextualTip = useCallback(() => {
    const path = window.location.pathname;
    
    if (path.includes('adventure')) {
      if (path.includes('bedroom')) {
        return "This is the bedroom area. You can learn vocabulary related to furniture and daily routines here.";
      } else if (path.includes('kitchen')) {
        return "Welcome to the kitchen! Here you'll learn words related to food, cooking, and kitchen utensils.";
      } else if (path.includes('garden')) {
        return "The garden is full of new words about plants, nature, and outdoor activities.";
      } else {
        return "Explore different rooms to learn location-specific vocabulary. Each area has unique challenges!";
      }
    } else if (path.includes('game')) {
      return "Challenge yourself with fun word games! Complete challenges to earn points and rewards.";
    } else if (path.includes('progress')) {
      return "Check your progress here. You can see how many words you've learned and your improvement over time.";
    } else if (path.includes('settings')) {
      return "Customize your learning experience in settings. You can change your language, theme, and more.";
    } else {
      return "Welcome to Language Adventure! Choose a room to explore or a game to play to improve your language skills.";
    }
  }, []);
  
  // Navigation assistance
  const getNavigationHelp = useCallback(() => {
    return "Need to go somewhere? You can click any icon in the navigation bar to quickly move between sections!";
  }, []);
  
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
          // Sometimes show contextual tips instead of random ones
          if (Math.random() > 0.5) {
            setCurrentTip(getContextualTip());
          } else if (Math.random() > 0.7) {
            setCurrentTip(getNavigationHelp());
          } else {
            const tipTypes = getTipsByPersonality();
            const randomTip = getRandomTip(tipTypes);
            setCurrentTip(randomTip);
          }
          
          setGreetingType(Math.random() > 0.8 ? 'wellDone' : 'hello');
          setShowMessage(true);
        }, 5000 + Math.random() * 15000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [showMessage, proactiveMessage, getContextualTip, getNavigationHelp]);
  
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
      // On click, prefer contextual tips
      if (Math.random() > 0.3) {
        setCurrentTip(getContextualTip());
      } else if (Math.random() > 0.5) {
        setCurrentTip(getNavigationHelp());
      } else {
        // Sometimes show greetings or tips
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
      }
      setShowMessage(true);
    }
  };
  
  // Handle navigation assistance
  const navigateTo = (path: string) => {
    setShowMessage(false);
    navigate(path);
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
    handleGuideClick,
    navigateTo,
    getContextualTip
  };
};
