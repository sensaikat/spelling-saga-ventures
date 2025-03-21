
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, Compass } from 'lucide-react';
import AdventureMap from '../components/AdventureMap';
import { useAdventure } from '../contexts/AdventureContext';

const AdventureMapPage = () => {
  const navigate = useNavigate();
  const { setCurrentLocation, character } = useAdventure();
  
  const handleLocationSelect = (locationId: string) => {
    setCurrentLocation(locationId);
    navigate(`/adventure/${locationId}`);
  };
  
  // Staggered animation for child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 relative overflow-hidden">
      {/* Background elements to add adventure feel */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12">
        🧭
      </div>
      <div className="absolute bottom-10 right-10 text-8xl opacity-10 -rotate-12">
        🗺️
      </div>
      <div className="absolute top-1/4 right-20 text-5xl opacity-10">
        ⛰️
      </div>
      <div className="absolute bottom-1/4 left-20 text-7xl opacity-10">
        🌊
      </div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <motion.div 
          className="mb-6 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <button 
              onClick={() => navigate('/')} 
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Compass className="text-purple-600" size={20} />
              <span className="font-medium text-gray-800">
                {character.name}'s Adventures
              </span>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full shadow-lg">
              <h1 className="text-3xl font-display font-bold flex items-center justify-center text-gray-800">
                <Map size={24} className="mr-3 text-blue-500" />
                Adventure Map
              </h1>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
        >
          <AdventureMap onLocationSelect={handleLocationSelect} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdventureMapPage;
