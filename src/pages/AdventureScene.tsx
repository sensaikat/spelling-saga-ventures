
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureScene from '../components/AdventureScene';
import SpellingGame from './SpellingGame';
import { useAdventure } from '../contexts/adventure/useAdventure';
import GuideCharacter from '../components/GuideCharacter';
import { MagicItemType } from '../components/MagicItems';
import { toast } from '@/components/ui/use-toast';
import { Language, useGameStore } from '../utils/game';

// Import our new components
import LanguageSelectorModal from '../components/adventure/LanguageSelectorModal';
import AdventureMagicItems from '../components/adventure/AdventureMagicItems';
import LanguageIndicator from '../components/adventure/LanguageIndicator';

const AdventureScenePage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();
  const { setCurrentLocation, getCurrentLocation } = useAdventure();
  const [showGame, setShowGame] = useState(false);
  const [activeMagicItem, setActiveMagicItem] = useState<MagicItemType | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const { selectLanguage } = useGameStore();
  
  const currentLocation = getCurrentLocation();
  
  // Set the current location based on the URL param
  useEffect(() => {
    if (locationId) {
      setCurrentLocation(locationId);
    }
  }, [locationId, setCurrentLocation]);
  
  const handleStartChallenge = () => {
    if (!selectedLanguage) {
      toast({
        title: "Language Required",
        description: "Please select a language first to start the challenge.",
        variant: "destructive"
      });
      return;
    }
    setShowGame(true);
  };
  
  const handleReturnToMap = () => {
    navigate('/adventure');
  };
  
  const handleGameComplete = (score: number) => {
    // Convert score to a percentage (assuming max score is 100)
    const percentage = Math.min(100, score);
    setShowGame(false);
    // We'll use this score to award rewards
  };

  const handleUseMagicItem = (type: MagicItemType) => {
    setActiveMagicItem(type);
  };
  
  const handleGuideUseMagicItem = () => {
    // Randomly choose a magic item when the guide suggests using one
    const items: MagicItemType[] = ['lens', 'specs', 'wand'];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    handleUseMagicItem(randomItem);
  };
  
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    selectLanguage(language);
    setShowLanguageSelector(false);
  };
  
  return (
    <div className="min-h-screen">
      {showGame ? (
        <>
          <SpellingGame 
            isAdventure={true} 
            onAdventureComplete={(score) => handleGameComplete(score)} 
          />
          <GuideCharacter 
            terrain={currentLocation?.terrain}
            isAdventure={true}
            onUseMagicItem={handleGuideUseMagicItem}
          />
        </>
      ) : (
        <>
          {showLanguageSelector ? (
            <LanguageSelectorModal 
              onSelect={handleLanguageSelect}
              onSkip={() => setShowLanguageSelector(false)}
              currentLocation={currentLocation}
            />
          ) : (
            <>
              <AdventureScene 
                onStartChallenge={handleStartChallenge}
                onReturnToMap={handleReturnToMap}
              />
              <GuideCharacter 
                terrain={currentLocation?.terrain}
                isAdventure={true}
                onUseMagicItem={handleGuideUseMagicItem}
              />
              
              {/* Magic items toolbar */}
              <AdventureMagicItems onUseMagicItem={handleUseMagicItem} />
              
              {/* Selected language indicator */}
              {selectedLanguage && (
                <LanguageIndicator 
                  language={selectedLanguage}
                  onChangeLanguage={() => setShowLanguageSelector(true)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdventureScenePage;
