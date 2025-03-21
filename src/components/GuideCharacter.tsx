
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Lightbulb, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TerrainType } from '../contexts/AdventureContext';

// Different guide appearances based on terrain
const guideAppearances = {
  forest: { emoji: '👧', name: 'Flora', color: 'bg-green-100 border-green-300 text-green-800' },
  desert: { emoji: '👦', name: 'Sandy', color: 'bg-amber-100 border-amber-300 text-amber-800' },
  river: { emoji: '🧒', name: 'Marina', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  mountain: { emoji: '👧', name: 'Sierra', color: 'bg-slate-100 border-slate-300 text-slate-800' },
  castle: { emoji: '👑', name: 'Reggie', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  space: { emoji: '👽', name: 'Nova', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  default: { emoji: '🧙‍♂️', name: 'Wizzy', color: 'bg-violet-100 border-violet-300 text-violet-800' }
};

// Types of tips the guide can provide
const tipTypes = [
  "Remember to listen carefully to the pronunciation!",
  "Take your time with each word, no need to rush.",
  "Look for patterns in the spelling.",
  "If you're stuck, try sounding out the word slowly.",
  "You can use your magic specs to see special hints!",
  "Practice makes perfect - keep trying!",
  "Great job! You're doing amazing!",
  "Your magic lens can help reveal hidden letters.",
  "When in doubt, break the word into smaller parts.",
  "You're on an adventure - enjoy the journey!"
];

interface GuideCharacterProps {
  terrain?: TerrainType;
  isAdventure?: boolean;
  onUseMagicItem?: () => void;
}

const GuideCharacter: React.FC<GuideCharacterProps> = ({ 
  terrain = 'forest',
  isAdventure = true,
  onUseMagicItem
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [magicItemUsed, setMagicItemUsed] = useState(false);
  
  const guide = guideAppearances[terrain] || guideAppearances.default;
  
  // Randomly show guide messages
  useEffect(() => {
    const randomAppearance = Math.random() > 0.7;
    if (randomAppearance && !showMessage) {
      const timer = setTimeout(() => {
        const randomTip = tipTypes[Math.floor(Math.random() * tipTypes.length)];
        setCurrentTip(randomTip);
        setShowMessage(true);
      }, 5000 + Math.random() * 15000); // Random time between 5-20 seconds
      
      return () => clearTimeout(timer);
    }
  }, [showMessage]);
  
  const handleUseMagicItem = () => {
    setMagicItemUsed(true);
    if (onUseMagicItem) {
      onUseMagicItem();
    }
    
    // Reset the magic item after a delay
    setTimeout(() => {
      setMagicItemUsed(false);
    }, 5000);
  };
  
  return (
    <>
      {/* Floating guide character */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 1 }}
      >
        <div className="relative">
          {/* Magic lens/specs */}
          <motion.div
            className={`absolute -top-16 -left-10 p-3 rounded-full ${
              magicItemUsed ? 'bg-yellow-200' : 'bg-white'
            } shadow-md cursor-pointer`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={handleUseMagicItem}
            animate={magicItemUsed ? {
              boxShadow: ['0px 0px 8px rgba(255,220,100,0.8)', '0px 0px 16px rgba(255,220,100,0.8)', '0px 0px 8px rgba(255,220,100,0.8)'],
            } : {}}
            transition={{ repeat: magicItemUsed ? Infinity : 0, duration: 1.5 }}
          >
            <div className="relative">
              <Wand2 size={24} className={magicItemUsed ? 'text-yellow-600' : 'text-gray-600'} />
              {magicItemUsed && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Sparkles size={32} className="text-yellow-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Guide character bubble */}
          <motion.div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
              showMessage ? 'border-4' : 'border-2'
            } shadow-lg cursor-pointer relative ${guide.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!showMessage) {
                const randomTip = tipTypes[Math.floor(Math.random() * tipTypes.length)];
                setCurrentTip(randomTip);
                setShowMessage(true);
              }
            }}
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
          >
            {guide.emoji}
            
            {/* Pulsing effect around the character */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ 
                boxShadow: ['0px 0px 0px rgba(255,255,255,0)', '0px 0px 10px rgba(255,255,255,0.5)', '0px 0px 0px rgba(255,255,255,0)'],
                scale: [1, 1.1, 1]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            
            {!showMessage && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Message bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className={`fixed bottom-24 right-8 max-w-xs p-4 rounded-xl rounded-br-none shadow-lg z-40 ${guide.color}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => setShowMessage(false)}
            >
              <X size={12} />
            </Button>
            
            <div className="flex items-start gap-2">
              <div className="pt-1">
                {guide.emoji === '👑' ? (
                  <Lightbulb className="text-yellow-600 h-5 w-5" />
                ) : (
                  <MessageCircle className="text-blue-600 h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium mb-1">{guide.name} says:</p>
                <p className="text-sm">{currentTip}</p>
              </div>
            </div>
            
            {isAdventure && (
              <motion.div
                className="mt-3 pt-3 border-t border-white/30 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleUseMagicItem}
                >
                  <Wand2 size={12} className="mr-1" /> Use Magic Lens
                </Button>
                <span className="text-xs opacity-70">Tap me anytime!</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideCharacter;
