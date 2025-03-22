
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureScene from '../components/AdventureScene';
import SpellingGame from './SpellingGame';
import { useAdventure } from '../contexts/adventure/useAdventure';
import GuideCharacter from '../components/GuideCharacter';
import MagicItems, { MagicItemType } from '../components/MagicItems';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const AdventureScenePage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();
  const { setCurrentLocation, getCurrentLocation } = useAdventure();
  const [showGame, setShowGame] = useState(false);
  const [activeMagicItem, setActiveMagicItem] = useState<MagicItemType | null>(null);
  
  const currentLocation = getCurrentLocation();
  
  // Set the current location based on the URL param
  useEffect(() => {
    if (locationId) {
      setCurrentLocation(locationId);
    }
  }, [locationId, setCurrentLocation]);
  
  const handleStartChallenge = () => {
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
    
    // Show different messages based on the magic item used
    let message = "";
    switch(type) {
      case 'lens':
        message = "Magic lens activated! Look closely to reveal hidden clues.";
        break;
      case 'specs':
        message = "Magic specs on! You can now see special word patterns.";
        break;
      case 'wand':
        message = "Magic wand ready! Wave it to get extra help with tricky words.";
        break;
    }
    
    toast({
      title: "✨ Magic Item Activated!",
      description: message,
      duration: 3000,
    });
    
    // Auto-deactivate after a few seconds
    setTimeout(() => {
      setActiveMagicItem(null);
    }, 10000);
  };
  
  const handleGuideUseMagicItem = () => {
    // Randomly choose a magic item when the guide suggests using one
    const items: MagicItemType[] = ['lens', 'specs', 'wand'];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    handleUseMagicItem(randomItem);
  };
  
  // Fix for infinite update loop - add a dependency array
  useEffect(() => {
    if (locationId) {
      setCurrentLocation(locationId);
    }
  }, [locationId]); // Only run when locationId changes
  
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
          <motion.div 
            className="fixed bottom-6 left-6 z-40 flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <MagicItems 
              type="lens" 
              onUse={() => handleUseMagicItem('lens')}
              isActive={activeMagicItem === 'lens'}
            />
            <MagicItems 
              type="specs" 
              onUse={() => handleUseMagicItem('specs')}
              isActive={activeMagicItem === 'specs'}
            />
            <MagicItems 
              type="wand" 
              onUse={() => handleUseMagicItem('wand')}
              isActive={activeMagicItem === 'wand'}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdventureScenePage;
