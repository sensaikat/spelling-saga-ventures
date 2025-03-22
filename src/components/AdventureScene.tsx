
import React, { useState, useEffect } from 'react';
import { useAdventure } from '../contexts/adventure/useAdventure';
import { useGameStore } from '../utils/game';
import { toast } from '@/components/ui/use-toast';
import { WordCard } from './word-card';

// Import the refactored components
import TerrainBackground from './adventure/TerrainBackground';
import AdventureHeader from './adventure/AdventureHeader';
import AdventureContent from './adventure/AdventureContent';
import AdventureDialog from './adventure/AdventureDialog';

const AdventureScene: React.FC<{
  onStartChallenge: () => void;
  onReturnToMap: () => void;
}> = ({ onStartChallenge, onReturnToMap }) => {
  const { getCurrentLocation, character, completeLocation, addCredits, addStar } = useAdventure();
  const { selectedLanguage } = useGameStore();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'intro' | 'reward'>('intro');
  const [rewardPoints, setRewardPoints] = useState(0);
  const [showTips, setShowTips] = useState(false);
  
  const currentLocation = getCurrentLocation();
  
  useEffect(() => {
    setDialogType('intro');
    setShowDialog(true);
  }, []);
  
  if (!currentLocation) return null;
  
  const handleCompleteChallenge = (points: number) => {
    setRewardPoints(points);
    setDialogType('reward');
    setShowDialog(true);
    
    completeLocation(currentLocation.id);
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
    if (dialogType === 'reward') {
      onReturnToMap();
    }
  };
  
  return (
    <>
      <TerrainBackground terrain={currentLocation.terrain}>
        <div className="max-w-4xl mx-auto">
          <AdventureHeader
            currentLocation={currentLocation}
            character={character}
            selectedLanguage={selectedLanguage}
            onReturnToMap={onReturnToMap}
            onToggleTips={() => setShowTips(!showTips)}
            showTips={showTips}
          />
          
          <AdventureContent
            currentLocation={currentLocation}
            showTips={showTips}
            onStartChallenge={onStartChallenge}
          />
        </div>
      </TerrainBackground>
      
      <AdventureDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        dialogType={dialogType}
        currentLocation={currentLocation}
        rewardPoints={rewardPoints}
        onContinue={handleContinue}
      />
    </>
  );
};

export default AdventureScene;
