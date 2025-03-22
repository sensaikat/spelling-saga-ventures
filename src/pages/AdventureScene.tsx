
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdventureProvider } from '../contexts/adventure/AdventureContext';
import { Button } from '../components/ui/button';
import AnimatedCompanion from '../components/adventure/AnimatedCompanion';
import { TerrainType } from '../contexts/adventure/types';
import AdventureSceneComponent from '../components/AdventureScene';
import { ScrollArea } from '../components/ui/scroll-area';

const AdventureScenePage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [showChallenge, setShowChallenge] = useState(false);
  
  // Ensure locationId is a valid TerrainType
  const terrain = ['forest', 'desert', 'river', 'mountain', 'castle', 'space', 'bedroom'].includes(locationId || '')
    ? locationId as TerrainType
    : 'forest';

  const handleStartChallenge = () => {
    setShowChallenge(true);
  };

  const handleReturnToMap = () => {
    navigate('/adventure');
  };

  return (
    <AdventureProvider>
      {!showChallenge ? (
        <AdventureSceneComponent
          onStartChallenge={handleStartChallenge}
          onReturnToMap={handleReturnToMap}
        />
      ) : (
        <div className="h-screen relative overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute top-4 left-4 z-10">
            <Button variant="outline" onClick={() => setShowChallenge(false)}>
              Back to Scene
            </Button>
          </div>
          
          <ScrollArea className="h-full">
            <div className="flex flex-col items-center justify-center min-h-full p-6">
              <h1 className="text-4xl font-bold mb-8 capitalize">
                {locationId} Challenge
              </h1>
              
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-6 max-w-lg w-full shadow-lg">
                <p className="text-lg mb-4">
                  This is where the language challenge for the {locationId} would appear.
                </p>
              </div>
            </div>
          </ScrollArea>
          
          <AnimatedCompanion terrain={terrain} />
        </div>
      )}
    </AdventureProvider>
  );
};

export default AdventureScenePage;
