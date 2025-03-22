
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flag, Trophy, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Location } from '../../contexts/AdventureContext';
import { terrainIcons } from './TerrainBackground';

interface AdventureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogType: 'intro' | 'reward';
  currentLocation: Location;
  rewardPoints?: number;
  onContinue: () => void;
}

const AdventureDialog: React.FC<AdventureDialogProps> = ({
  open,
  onOpenChange,
  dialogType,
  currentLocation,
  rewardPoints = 0,
  onContinue
}) => {
  const terrainIcon = terrainIcons[currentLocation.terrain];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onOpenChange(false);
              onContinue();
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
  );
};

export default AdventureDialog;
