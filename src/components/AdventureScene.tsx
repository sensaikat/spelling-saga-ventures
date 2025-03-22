
import React from 'react';
import { useAdventureScene } from '../hooks/useAdventureScene';
import TerrainBackground from './adventure/TerrainBackground';
import AdventureHeader from './adventure/AdventureHeader';
import AdventureContent from './adventure/AdventureContent';
import AdventureDialog from './adventure/AdventureDialog';
import AdventureMagicItems from './adventure/AdventureMagicItems';

const AdventureScene: React.FC<{
  onStartChallenge: () => void;
  onReturnToMap: () => void;
}> = ({ onStartChallenge, onReturnToMap }) => {
  const {
    currentLocation,
    character,
    selectedLanguage,
    showDialog,
    setShowDialog,
    dialogType,
    rewardPoints,
    showTips,
    handleContinue,
    handleUseMagicItem,
    handleToggleTips
  } = useAdventureScene(onStartChallenge, onReturnToMap);
  
  if (!currentLocation) return null;
  
  return (
    <>
      <TerrainBackground terrain={currentLocation.terrain}>
        <div className="max-w-4xl mx-auto">
          <AdventureHeader
            currentLocation={currentLocation}
            character={character}
            selectedLanguage={selectedLanguage}
            onReturnToMap={onReturnToMap}
            onToggleTips={handleToggleTips}
            showTips={showTips}
          />
          
          <AdventureContent
            currentLocation={currentLocation}
            showTips={showTips}
            onStartChallenge={() => {
              onStartChallenge();
            }}
          />
        </div>
      </TerrainBackground>
      
      <AdventureMagicItems onUseMagicItem={handleUseMagicItem} />
      
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
