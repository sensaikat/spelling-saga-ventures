import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import ResolutionSettings from '../components/settings/ResolutionSettings';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-6 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <ResolutionSettings />
        
        {/* Other settings could go here */}
        
        <div className="mt-8">
          <Button variant="default" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
