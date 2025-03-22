
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-2xl mb-8">Page not found</p>
      
      <Button variant="default" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
