
import { useState, useCallback } from 'react';
import { GreetingType } from '../types';

export const useGuideState = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [magicItemUsed, setMagicItemUsed] = useState(false);
  const [greetingType, setGreetingType] = useState<GreetingType>('hello');

  const showSpecificMessage = useCallback((message: string) => {
    setCurrentTip(message);
    setShowMessage(true);
  }, []);

  const hideMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  const toggleMagicItem = useCallback((used: boolean = true) => {
    setMagicItemUsed(used);
    
    if (used) {
      // Reset magic item state after animation
      setTimeout(() => {
        setMagicItemUsed(false);
      }, 5000);
    }
  }, []);

  return {
    showMessage,
    setShowMessage,
    currentTip,
    setCurrentTip,
    magicItemUsed,
    greetingType,
    setGreetingType,
    showSpecificMessage,
    hideMessage,
    toggleMagicItem
  };
};
