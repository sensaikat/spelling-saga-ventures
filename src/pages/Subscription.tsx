
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Subscription: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-6 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Free Plan</h2>
          <p className="mb-4">Access to basic features</p>
          <Button variant="outline" className="w-full">Current Plan</Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 border-primary">
          <h2 className="text-xl font-bold mb-4">Premium Plan</h2>
          <p className="mb-4">Access to all features</p>
          <Button variant="default" className="w-full">Upgrade</Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Family Plan</h2>
          <p className="mb-4">Premium for the whole family</p>
          <Button variant="default" className="w-full">Upgrade</Button>
        </div>
      </div>
      
      <div className="mt-8">
        <Button variant="default" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Subscription;
