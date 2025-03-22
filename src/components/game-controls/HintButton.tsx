
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface HintButtonProps {
  onHint: () => void;
  hintsUsed: number;
  maxHints: number;
  isPlaying: boolean;
}

export const HintButton: React.FC<HintButtonProps> = ({
  onHint,
  hintsUsed,
  maxHints,
  isPlaying,
}) => {
  const handleHintClick = () => {
    if (hintsUsed < maxHints) {
      onHint();
    } else {
      toast({
        title: "No hints left",
        description: "You've used all your available hints for this game.",
        duration: 3000,
      });
    }
  };
  
  return (
    <motion.button
      onClick={handleHintClick}
      disabled={hintsUsed >= maxHints || !isPlaying}
      className={`game-control-button ${hintsUsed >= maxHints ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={hintsUsed < maxHints ? { scale: 1.1 } : {}}
      whileTap={hintsUsed < maxHints ? { scale: 0.9 } : {}}
      title="Get hint"
    >
      <HelpCircle size={20} />
      <span className="text-xs bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
        {maxHints - hintsUsed}
      </span>
    </motion.button>
  );
};
