
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, MessageCircle, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GuideAppearance } from '../types';

interface GuideBubbleProps {
  showMessage: boolean;
  currentTip: string;
  guide: GuideAppearance;
  isAdventure?: boolean;
  onClose: () => void;
  onUseMagicItem: () => void;
}

export const GuideBubble: React.FC<GuideBubbleProps> = ({
  showMessage,
  currentTip,
  guide,
  isAdventure = false,
  onClose,
  onUseMagicItem
}) => {
  const bubbleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    }
  };

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          className={`fixed bottom-24 right-8 max-w-xs p-4 rounded-xl rounded-br-none shadow-lg z-40 ${guide.color}`}
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={onClose}
          >
            <X size={12} />
          </Button>
          
          <div className="flex items-start gap-2">
            <div className="pt-1">
              {(guide.personality === 'wise') ? (
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
                onClick={onUseMagicItem}
              >
                <Wand2 size={12} className="mr-1" /> Use Magic Lens
              </Button>
              <span className="text-xs opacity-70">Tap me anytime!</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
