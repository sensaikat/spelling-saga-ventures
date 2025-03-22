
import { useState, useEffect } from 'react';
import { useAdventure } from '../contexts/adventure/useAdventure';
import { useGameStore } from '../utils/game';
import { toast } from '@/components/ui/use-toast';
import { MagicItemType } from '../components/MagicItems';

export const useAdventureScene = (onStartChallenge: () => void, onReturnToMap: () => void) => {
  const { 
    getCurrentLocation, 
    character, 
    completeLocation, 
    addCredits, 
    addStar, 
    setStoryPhase 
  } = useAdventure();
  
  const { selectedLanguage } = useGameStore();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'intro' | 'reward'>('intro');
  const [rewardPoints, setRewardPoints] = useState(0);
  const [showTips, setShowTips] = useState(false);
  
  const currentLocation = getCurrentLocation();
  
  useEffect(() => {
    setDialogType('intro');
    setShowDialog(true);
    // After intro dialog is shown, we'll set the story phase
    if (character.currentStoryPhase === 'introduction') {
      setStoryPhase('introduction');
    }
  }, []);
  
  const handleCompleteChallenge = (points: number) => {
    setRewardPoints(points);
    setDialogType('reward');
    setShowDialog(true);
    
    if (currentLocation) {
      completeLocation(currentLocation.id);
    }
    addCredits(points);
    
    if (points >= 80) {
      addStar();
      toast({
        title: "⭐ Star Earned!",
        description: "Great job! You've earned a star for excellent performance!",
        duration: 3000,
      });
    }
  };
  
  const handleContinue = () => {
    if (dialogType === 'intro') {
      // When intro dialog is closed, move to exploration phase
      setStoryPhase('exploration');
    } else if (dialogType === 'reward') {
      onReturnToMap();
    }
  };
  
  const handleUseMagicItem = (type: MagicItemType) => {
    // This can be expanded with specific magic item behaviors
    console.log(`Magic item used: ${type}`);
  };
  
  const handleToggleTips = () => {
    setShowTips(!showTips);
  };
  
  return {
    currentLocation,
    character,
    selectedLanguage,
    showDialog,
    setShowDialog,
    dialogType,
    rewardPoints,
    showTips,
    handleCompleteChallenge,
    handleContinue,
    handleUseMagicItem,
    handleToggleTips
  };
};
