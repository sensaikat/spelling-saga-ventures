
import { useEffect, useCallback } from 'react';
import { useGuideMessages } from './useGuideMessages';
import { useGuideState } from './useGuideState';

interface UseGuideAppearancesProps {
  proactiveMessage?: string;
}

export const useGuideAppearances = ({ proactiveMessage }: UseGuideAppearancesProps = {}) => {
  const { 
    showMessage, 
    setShowMessage, 
    setCurrentTip, 
    setGreetingType
  } = useGuideState();
  
  const { 
    getContextualTip, 
    getNavigationHelp, 
    getRandomPersonalityTip 
  } = useGuideMessages();
  
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
  }, [proactiveMessage, setCurrentTip, setShowMessage]);
  
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
            setCurrentTip(getRandomPersonalityTip());
          }
          
          setGreetingType(Math.random() > 0.8 ? 'wellDone' : 'hello');
          setShowMessage(true);
        }, 5000 + Math.random() * 15000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [
    showMessage, 
    proactiveMessage, 
    getContextualTip, 
    getNavigationHelp, 
    getRandomPersonalityTip,
    setCurrentTip,
    setGreetingType,
    setShowMessage
  ]);
  
  const handleGuideClick = useCallback(() => {
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
          
          setGreetingType(randomType);
        } else {
          setCurrentTip(getRandomPersonalityTip());
        }
      }
      setShowMessage(true);
    }
  }, [
    showMessage,
    getContextualTip,
    getNavigationHelp,
    getRandomPersonalityTip,
    setCurrentTip,
    setGreetingType,
    setShowMessage
  ]);
  
  return {
    handleGuideClick
  };
};
