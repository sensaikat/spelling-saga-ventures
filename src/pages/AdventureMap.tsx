
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AdventureMap from '../components/AdventureMap';
import { useAdventure } from '../contexts/AdventureContext';

const AdventureMapPage = () => {
  const navigate = useNavigate();
  const { setCurrentLocation } = useAdventure();
  
  const handleLocationSelect = (locationId: string) => {
    setCurrentLocation(locationId);
    navigate(`/adventure/${locationId}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          className="mb-6 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Home</span>
          </button>
        </motion.div>
        
        <AdventureMap onLocationSelect={handleLocationSelect} />
      </div>
    </div>
  );
};

export default AdventureMapPage;
