
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureScene from '../components/AdventureScene';
import SpellingGame from './SpellingGame';
import { useAdventure } from '../contexts/adventure/useAdventure';
import GuideCharacter from '../components/guide';
import { MagicItemType } from '../components/MagicItems';
import { toast } from '@/components/ui/use-toast';
import { Language, useGameStore } from '../utils/game';
import { StoryPhase } from '../contexts/adventure/types';

// Import our new components
import LanguageSelectorModal from '../components/adventure/LanguageSelectorModal';
import AdventureMagicItems from '../components/adventure/AdventureMagicItems';
import LanguageIndicator from '../components/adventure/LanguageIndicator';

const AdventureScenePage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();
  const { 
    setCurrentLocation, 
    getCurrentLocation, 
    character,
    setStoryPhase,
    getStoryline
  } = useAdventure();
  const [showGame, setShowGame] = useState(false);
  const [activeMagicItem, setActiveMagicItem] = useState<MagicItemType | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const { selectLanguage } = useGameStore();
  const [proactiveMessage, setProactiveMessage] = useState<string | undefined>(undefined);
  
  const currentLocation = getCurrentLocation();
  
  // Set the current location based on the URL param
  useEffect(() => {
    if (locationId) {
      setCurrentLocation(locationId);
    }
  }, [locationId, setCurrentLocation]);
  
  // Trigger proactive storytelling based on the current phase
  useEffect(() => {
    if (character.currentStoryPhase && !showLanguageSelector && currentLocation) {
      const storyline = getStoryline(character.currentStoryPhase);
      if (storyline) {
        setProactiveMessage(storyline);
        
        // Clear the message after it's been shown
        const timer = setTimeout(() => {
          setProactiveMessage(undefined);
        }, 15000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [character.currentStoryPhase, showLanguageSelector, currentLocation, getStoryline]);
  
  // Progress through story phases during the adventure
  useEffect(() => {
    if (!showLanguageSelector && !showGame && character.currentStoryPhase === 'introduction') {
      // After introduction, move to exploration phase after a delay
      const timer = setTimeout(() => {
        setStoryPhase('exploration');
      }, 20000);
      
      return () => clearTimeout(timer);
    }
  }, [showLanguageSelector, showGame, character.currentStoryPhase, setStoryPhase]);
  
  const handleStartChallenge = () => {
    if (!selectedLanguage) {
      toast({
        title: "Language Required",
        description: "Please select a language first to start the challenge.",
        variant: "destructive"
      });
      return;
    }
    setStoryPhase('challenge');
    setShowGame(true);
  };
  
  const handleReturnToMap = () => {
    setStoryPhase('conclusion');
    
    // Give a moment for the conclusion message to be shown
    setTimeout(() => {
      navigate('/adventure');
    }, 5000);
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
            proactiveMessage={proactiveMessage}
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
                proactiveMessage={proactiveMessage}
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
