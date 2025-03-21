
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Star, Coffee } from 'lucide-react';
import { useAdventure, Location } from '../contexts/AdventureContext';
import { useGameStore } from '../utils/gameData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

// Background images for each terrain type
const terrainBackgrounds = {
  forest: 'bg-gradient-to-b from-green-200 to-green-600',
  desert: 'bg-gradient-to-b from-yellow-200 to-amber-600',
  river: 'bg-gradient-to-b from-blue-200 to-blue-600',
  mountain: 'bg-gradient-to-b from-slate-200 to-slate-600',
  castle: 'bg-gradient-to-b from-purple-200 to-purple-600',
  space: 'bg-gradient-to-b from-indigo-200 to-indigo-800',
};

// Sound effects for the adventure
const soundEffects = {
  forest: '🐦',
  desert: '🐫',
  river: '💦',
  mountain: '🏔️',
  castle: '🎭',
  space: '👽',
};

interface AdventureSceneProps {
  onStartChallenge: () => void;
  onReturnToMap: () => void;
}

const AdventureScene: React.FC<AdventureSceneProps> = ({ onStartChallenge, onReturnToMap }) => {
  const { getCurrentLocation, character, completeLocation, addCredits, addStar } = useAdventure();
  const { selectedLanguage } = useGameStore();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'intro' | 'reward'>('intro');
  const [rewardPoints, setRewardPoints] = useState(0);
  
  const currentLocation = getCurrentLocation();
  
  useEffect(() => {
    // Show intro dialog when the component mounts
    setDialogType('intro');
    setShowDialog(true);
  }, []);
  
  if (!currentLocation) return null;
  
  const handleCompleteChallenge = (points: number) => {
    setRewardPoints(points);
    setDialogType('reward');
    setShowDialog(true);
    
    // Mark the location as completed
    completeLocation(currentLocation.id);
    
    // Add credits based on points earned
    addCredits(points);
    
    // Add a star if they scored well
    if (points >= 80) {
      addStar();
      toast({
        title: "⭐ Star Earned!",
        description: "Great job! You've earned a star for excellent performance!",
        duration: 3000,
      });
    }
  };
  
  const terrainBackground = terrainBackgrounds[currentLocation.terrain];
  const soundEffect = soundEffects[currentLocation.terrain];
  
  return (
    <>
      <div className={`min-h-screen ${terrainBackground} p-4`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">{currentLocation.name}</h1>
                <p className="text-sm text-gray-600">
                  {character.avatar} {character.name} • {selectedLanguage?.flag} {selectedLanguage?.name}
                </p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={onReturnToMap}
                >
                  <MapPin size={20} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="font-medium text-lg mb-2">The Adventure</h2>
              <p className="mb-4">{currentLocation.description}</p>
              <p className="italic text-gray-700">{currentLocation.challengeDescription}</p>
            </div>
            
            <div className="flex justify-center">
              <motion.button
                className="primary-button flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartChallenge}
              >
                Begin Challenge <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 text-5xl animate-bounce">
            {soundEffect}
          </div>
        </div>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'intro' 
                ? `Welcome to ${currentLocation.name}!` 
                : '🎉 Challenge Complete!'}
            </DialogTitle>
          </DialogHeader>
          
          {dialogType === 'intro' ? (
            <div className="space-y-4">
              <p>{currentLocation.description}</p>
              <p className="font-medium">{currentLocation.challengeDescription}</p>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-4xl mb-4"
              >
                🏆
              </motion.div>
              <h3 className="text-xl font-bold">You earned {rewardPoints} points!</h3>
              <p className="text-sm text-gray-600">
                You've unlocked the next location on your adventure map.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="bg-blue-100 rounded-full px-4 py-2 flex items-center">
                  <span className="mr-2">🪙</span> +{rewardPoints} credits
                </div>
                {rewardPoints >= 80 && (
                  <div className="bg-yellow-100 rounded-full px-4 py-2 flex items-center">
                    <span className="mr-2">⭐</span> +1 star
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setShowDialog(false);
                if (dialogType === 'reward') {
                  onReturnToMap();
                }
              }}
            >
              {dialogType === 'intro' ? 'Let\'s Go!' : 'Continue Adventure'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdventureScene;
