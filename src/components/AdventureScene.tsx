
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Star, Trophy, Sparkles, Flag, Volume2 } from 'lucide-react';
import { useAdventure, Location } from '../contexts/AdventureContext';
import { useGameStore } from '../utils/gameData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

// Background images for each terrain type
const terrainBackgrounds = {
  forest: 'bg-gradient-to-b from-green-200 to-green-600 bg-[url("/forest-bg.png")] bg-cover bg-blend-soft-light',
  desert: 'bg-gradient-to-b from-yellow-200 to-amber-600 bg-[url("/desert-bg.png")] bg-cover bg-blend-soft-light',
  river: 'bg-gradient-to-b from-blue-200 to-blue-600 bg-[url("/river-bg.png")] bg-cover bg-blend-soft-light',
  mountain: 'bg-gradient-to-b from-slate-200 to-slate-600 bg-[url("/mountain-bg.png")] bg-cover bg-blend-soft-light',
  castle: 'bg-gradient-to-b from-purple-200 to-purple-600 bg-[url("/castle-bg.png")] bg-cover bg-blend-soft-light',
  space: 'bg-gradient-to-b from-indigo-200 to-indigo-800 bg-[url("/space-bg.png")] bg-cover bg-blend-soft-light',
};

// Sound effects for the adventure
const terrainIcons = {
  forest: '🌳',
  desert: '🏜️',
  river: '🌊',
  mountain: '⛰️',
  castle: '🏰',
  space: '🚀',
};

const terrainCompanions = {
  forest: '🦊',
  desert: '🐪',
  river: '🐠',
  mountain: '🦅',
  castle: '🐉',
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
  const [showTips, setShowTips] = useState(false);
  
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
  const terrainIcon = terrainIcons[currentLocation.terrain];
  const companion = terrainCompanions[currentLocation.terrain];
  
  return (
    <>
      <div className={`min-h-screen ${terrainBackground} p-4 relative overflow-hidden`}>
        {/* Floating particles for added magic */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30 w-3 h-3"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50], 
                opacity: [null, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-panel rounded-2xl p-6 shadow-xl mb-6 border border-white/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-display font-bold">{currentLocation.name}</h1>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <span>{character.avatar}</span>
                  <span className="font-medium">{character.name}</span>
                  <span>•</span>
                  <span>{selectedLanguage?.flag}</span>
                  <span>{selectedLanguage?.name}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <motion.button 
                  className="p-3 rounded-full bg-white/50 backdrop-blur-sm text-blue-700 hover:bg-blue-200 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTips(!showTips)}
                >
                  <Volume2 size={20} />
                </motion.button>
                <motion.button 
                  className="p-3 rounded-full bg-white/50 backdrop-blur-sm text-blue-700 hover:bg-blue-200 shadow-md"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onReturnToMap}
                >
                  <MapPin size={20} />
                </motion.button>
              </div>
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute -right-2 -top-2 text-4xl floating-element">
                {terrainIcon}
              </div>
              
              <h2 className="font-display text-xl mb-3 text-gray-800">Your Adventure</h2>
              <p className="mb-4 text-gray-700">{currentLocation.description}</p>
              <motion.div 
                className="italic text-gray-700 bg-white/50 p-4 rounded-lg border border-white/30"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3 mt-1">{companion}</span>
                  <div>
                    <p className="font-medium mb-1">Your mission:</p>
                    <p>{currentLocation.challengeDescription}</p>
                  </div>
                </div>
              </motion.div>
              
              {showTips && (
                <motion.div 
                  className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                    <Sparkles size={16} className="mr-2" /> Tips for Success
                  </h3>
                  <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                    <li>Listen carefully to the pronunciations</li>
                    <li>Take your time to spell each word correctly</li>
                    <li>Use hints if you're stuck - but only 3 times!</li>
                    <li>Try to remember patterns in the language</li>
                  </ul>
                </motion.div>
              )}
            </div>
            
            <div className="flex justify-center">
              <motion.button
                className="primary-button flex items-center gap-2 text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartChallenge}
              >
                Begin Challenge <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 right-10 text-6xl"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            {companion}
          </motion.div>
        </div>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-display">
              {dialogType === 'intro' 
                ? `Welcome to ${currentLocation.name}!` 
                : '🎉 Challenge Complete!'}
            </DialogTitle>
          </DialogHeader>
          
          {dialogType === 'intro' ? (
            <div className="space-y-4 text-center">
              <div className="text-6xl flex justify-center mb-4">
                {terrainIcon}
              </div>
              <p className="font-medium">{currentLocation.description}</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="font-bold text-blue-800">{currentLocation.challengeDescription}</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-32 h-32 mx-auto mb-6"
              >
                <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-20" />
                <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy size={64} className="text-white drop-shadow-md" />
                </div>
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-display font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                You earned {rewardPoints} points!
              </motion.h3>
              
              <p className="text-sm text-gray-600">
                You've conquered this location and unlocked new adventures!
              </p>
              
              <div className="flex justify-center gap-4 mt-6">
                <motion.div 
                  className="bg-blue-100 rounded-xl px-5 py-3 flex items-center shadow-md"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Trophy size={22} className="mr-2 text-blue-600" />
                  <div className="text-left">
                    <div className="text-xs text-blue-600">REWARD</div>
                    <div className="font-bold text-blue-800">+{rewardPoints} credits</div>
                  </div>
                </motion.div>
                
                {rewardPoints >= 80 && (
                  <motion.div 
                    className="bg-yellow-100 rounded-xl px-5 py-3 flex items-center shadow-md"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Star size={22} className="mr-2 text-yellow-600 fill-yellow-500" />
                    <div className="text-left">
                      <div className="text-xs text-yellow-600">BONUS</div>
                      <div className="font-bold text-yellow-800">+1 star</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-center">
            <Button 
              className="rounded-full font-medium px-6"
              onClick={() => {
                setShowDialog(false);
                if (dialogType === 'reward') {
                  onReturnToMap();
                }
              }}
            >
              {dialogType === 'intro' ? (
                <span className="flex items-center">Let's Go! <Flag className="ml-2 h-4 w-4" /></span>
              ) : (
                <span className="flex items-center">Continue Adventure <ChevronRight className="ml-1 h-4 w-4" /></span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdventureScene;
