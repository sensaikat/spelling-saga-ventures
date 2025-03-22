
import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdventureActionsProps {
  isAdventure: boolean;
  onUseMagicItem: () => void;
}

export const AdventureActions: React.FC<AdventureActionsProps> = ({
  isAdventure,
  onUseMagicItem
}) => {
  if (!isAdventure) {
    return null;
  }
  
  return (
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
  );
};
