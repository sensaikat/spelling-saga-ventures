
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureScene from '../components/AdventureScene';
import SpellingGame from './SpellingGame';
import { useAdventure } from '../contexts/AdventureContext';

const AdventureScenePage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();
  const { setCurrentLocation } = useAdventure();
  const [showGame, setShowGame] = useState(false);
  
  // Set the current location based on the URL param
  React.useEffect(() => {
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
  
  return (
    <div className="min-h-screen">
      {showGame ? (
        <SpellingGame 
          isAdventure={true} 
          onAdventureComplete={(score) => handleGameComplete(score)} 
        />
      ) : (
        <AdventureScene 
          onStartChallenge={handleStartChallenge}
          onReturnToMap={handleReturnToMap}
        />
      )}
    </div>
  );
};

export default AdventureScenePage;
