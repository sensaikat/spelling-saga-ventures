
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdventureProvider } from '../contexts/adventure/AdventureContext';
import { Button } from '../components/ui/button';

const Adventure: React.FC = () => {
  const navigate = useNavigate();

  const handleLocationSelect = (locationId: string) => {
    navigate(`/adventure/${locationId}`);
  };

  return (
    <AdventureProvider>
      <div className="h-screen p-6 bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-3xl font-bold mb-6">Choose Your Adventure</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['bedroom', 'forest', 'desert', 'river', 'mountain', 'castle', 'space'].map(location => (
            <Button 
              key={location}
              variant="outline" 
              className="h-40 text-xl capitalize hover:bg-primary/10"
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </Button>
          ))}
        </div>
        
        <div className="mt-8">
          <Button variant="default" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </AdventureProvider>
  );
};

export default Adventure;
