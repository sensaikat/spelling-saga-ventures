
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Game: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-6 bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold mb-6">Language Games</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Spelling Game', 'Word Match', 'Vocabulary Quiz', 'Sentence Builder'].map(game => (
          <Button 
            key={game}
            variant="outline" 
            className="h-40 text-xl hover:bg-primary/10"
          >
            {game}
          </Button>
        ))}
      </div>
      
      <div className="mt-8">
        <Button variant="default" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Game;
