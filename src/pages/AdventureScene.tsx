
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdventureProvider } from '../contexts/adventure/AdventureContext';
import { Button } from '../components/ui/button';
import AnimatedCompanion from '../components/adventure/AnimatedCompanion';
import { TerrainType } from '../contexts/adventure/types';

const AdventureScenePage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  
  // Ensure locationId is a valid TerrainType
  const terrain = ['forest', 'desert', 'river', 'mountain', 'castle', 'space', 'bedroom'].includes(locationId || '')
    ? locationId as TerrainType
    : 'forest';

  return (
    <AdventureProvider>
      <div className="h-screen relative overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute top-4 left-4 z-10">
          <Button variant="outline" onClick={() => navigate('/adventure')}>
            Back to Map
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-4xl font-bold mb-8 capitalize">
            {locationId} Adventure
          </h1>
          
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-6 max-w-lg w-full shadow-lg">
            <p className="text-lg mb-4">
              You are exploring the {locationId}. What would you like to do?
            </p>
            
            <div className="flex flex-col gap-4 mt-6">
              <Button variant="default">Explore</Button>
              <Button variant="secondary">Talk to Guide</Button>
              <Button variant="outline">Find Hidden Objects</Button>
            </div>
          </div>
        </div>
        
        <AnimatedCompanion terrain={terrain} />
      </div>
    </AdventureProvider>
  );
};

export default AdventureScenePage;
