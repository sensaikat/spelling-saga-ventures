
import React, { useState } from 'react';
import { useAdventureScene } from '../hooks/useAdventureScene';
import TerrainBackground from './adventure/TerrainBackground';
import AdventureHeader from './adventure/AdventureHeader';
import AdventureContent from './adventure/AdventureContent';
import AdventureDialog from './adventure/AdventureDialog';
import AdventureMagicItems from './adventure/AdventureMagicItems';
import { Button } from './ui/button';
import { MessageCircle, Search } from 'lucide-react';
import { GuideCharacter } from './guide';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

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
  
  const [showGuide, setShowGuide] = useState(false);
  const [showHiddenObjectsHint, setShowHiddenObjectsHint] = useState(false);

  const handleTalkToGuide = () => {
    setShowGuide(true);
    toast({
      title: "Guide says:",
      description: "Hello! I'm here to help you with your adventure. What would you like to know?",
      duration: 5000,
    });
  };

  const handleFindHiddenObjects = () => {
    setShowHiddenObjectsHint(true);
    handleUseMagicItem('lens');
    toast({
      title: "Hidden Objects:",
      description: "Look carefully around the scene! Objects might be hidden in unexpected places.",
      duration: 5000,
    });
  };
  
  if (!currentLocation) return null;
  
  return (
    <>
      <TerrainBackground terrain={currentLocation.terrain}>
        <ScrollArea className="h-[calc(100vh-4rem)] px-2">
          <div className="max-w-4xl mx-auto pb-20">
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

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={handleTalkToGuide}
              >
                <MessageCircle size={18} />
                Talk to Guide
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={handleFindHiddenObjects}
              >
                <Search size={18} />
                Find Hidden Objects
              </Button>
            </div>
          </div>
        </ScrollArea>
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

      {showGuide && (
        <div className="fixed bottom-4 right-4 z-50">
          <GuideCharacter
            selectedAvatar={currentLocation.terrain}
            isAdventure={true}
            onUseMagicItem={() => handleUseMagicItem('wand')}
            proactiveMessage={
              currentLocation.storylines?.[character.currentStoryPhase]?.[0] || 
              "Welcome to your adventure! I'm here to help you explore."
            }
          />
        </div>
      )}
    </>
  );
};

export default AdventureScene;
