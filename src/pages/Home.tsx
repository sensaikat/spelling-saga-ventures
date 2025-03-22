
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Welcome to Language Adventure</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link to="/adventure" className="w-full">
          <Button variant="default" size="lg" className="w-full h-24 text-xl">
            Start Adventure
          </Button>
        </Link>
        
        <Link to="/game" className="w-full">
          <Button variant="default" size="lg" className="w-full h-24 text-xl">
            Play Games
          </Button>
        </Link>
        
        <Link to="/settings" className="w-full">
          <Button variant="outline" size="lg" className="w-full h-24 text-xl">
            Settings
          </Button>
        </Link>
        
        <Link to="/subscription" className="w-full">
          <Button variant="outline" size="lg" className="w-full h-24 text-xl">
            Subscription
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
