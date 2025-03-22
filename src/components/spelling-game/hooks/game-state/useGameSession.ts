
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../../../utils/game';
import { useSubscriptionStore } from '../../../../utils/subscription';
import { useToast } from '../../../../hooks/use-toast';

export const useGameSession = (isAdventure: boolean) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    checkAndUpdateStreak
  } = useGameStore();
  
  const { 
    remainingDailyGames,
    decrementDailyGames,
    checkAccess,
    limits
  } = useSubscriptionStore();
  
  // Initialize game session
  const initializeSession = () => {
    if (!isAdventure && (!selectedLanguage || !selectedGameMode || !currentWordList)) {
      navigate('/');
      return false;
    }
    
    // Check if adventure mode is accessible
    if (isAdventure && !checkAccess('adventureMode')) {
      toast({
        title: "Premium Feature",
        description: "Adventure mode is only available for premium subscribers",
        variant: "destructive",
      });
      navigate('/');
      return false;
    }
    
    // Update streak when starting a game
    checkAndUpdateStreak();
    
    // Check daily game limits
    if (!limits.gamePlay.unlimited && remainingDailyGames <= 0) {
      toast({
        title: "Daily limit reached",
        description: "You've used all your free games for today. Upgrade to play more!",
        variant: "destructive",
      });
      navigate('/subscription');
      return false;
    }
    
    // Decrement daily game count
    if (!limits.gamePlay.unlimited) {
      decrementDailyGames();
    }
    
    return true;
  };
  
  const checkGameLimits = () => {
    // Check daily game limits before restarting
    if (!limits.gamePlay.unlimited && remainingDailyGames <= 0) {
      toast({
        title: "Daily limit reached",
        description: "You've used all your free games for today. Upgrade to play more!",
        variant: "destructive",
      });
      navigate('/subscription');
      return false;
    }
    
    // Decrement daily game count if not unlimited
    if (!limits.gamePlay.unlimited) {
      decrementDailyGames();
    }
    
    return true;
  };
  
  return {
    initializeSession,
    checkGameLimits,
    navigate
  };
};
