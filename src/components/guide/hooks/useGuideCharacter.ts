
import { useCallback } from 'react';
import { UseGuideCharacterProps } from '../types';
import { useGuideState } from './useGuideState';
import { useGuideMessages } from './useGuideMessages';
import { useGuideAppearance } from './useGuideAppearance';
import { useGuideAppearances } from './useGuideAppearances';
import { useGuideNavigation } from './useGuideNavigation';

export const useGuideCharacter = ({
  selectedAvatar,
  terrain = 'forest',
  selectedLanguage,
  proactiveMessage,
  isAdventure = false,
  navigateTo
}: UseGuideCharacterProps) => {
  // Use smaller, focused hooks
  const {
    showMessage,
    setShowMessage,
    currentTip,
    setCurrentTip,
    magicItemUsed,
    greetingType,
    setGreetingType,
    toggleMagicItem
  } = useGuideState();
  
  const { avatarKey, languageCode } = useGuideAppearance({
    selectedAvatar,
    terrain,
    selectedLanguage
  });
  
  const { handleGuideClick } = useGuideAppearances({
    proactiveMessage
  });
  
  const { handleNavigate } = useGuideNavigation({
    navigateTo
  });
  
  const { getContextualTip } = useGuideMessages();
  
  // Handle magic item usage
  const handleUseMagicItem = useCallback(() => {
    toggleMagicItem(true);
  }, [toggleMagicItem]);
  
  // Show a specific message
  const showSpecificMessage = useCallback((message: string) => {
    setCurrentTip(message);
    setShowMessage(true);
  }, [setCurrentTip, setShowMessage]);
  
  return {
    // State
    showMessage,
    setShowMessage,
    currentTip,
    setCurrentTip,
    magicItemUsed,
    greetingType,
    setGreetingType,
    languageCode,
    avatarKey,
    
    // Actions
    handleUseMagicItem,
    showSpecificMessage,
    handleGuideClick,
    handleNavigate,
    navigateTo: handleNavigate,
    getContextualTip
  };
};
