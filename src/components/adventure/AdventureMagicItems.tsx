
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MagicItems, { MagicItemType } from '../MagicItems';
import { toast } from '@/components/ui/use-toast';

interface AdventureMagicItemsProps {
  onUseMagicItem: (type: MagicItemType) => void;
}

const AdventureMagicItems: React.FC<AdventureMagicItemsProps> = ({ onUseMagicItem }) => {
  const [activeMagicItem, setActiveMagicItem] = useState<MagicItemType | null>(null);

  const handleUseMagicItem = (type: MagicItemType) => {
    setActiveMagicItem(type);
    onUseMagicItem(type);
    
    // Show different messages based on the magic item used
    let message = "";
    switch(type) {
      case 'lens':
        message = "Magic lens activated! Look closely to reveal hidden clues.";
        break;
      case 'specs':
        message = "Magic specs on! You can now see special word patterns.";
        break;
      case 'wand':
        message = "Magic wand ready! Wave it to get extra help with tricky words.";
        break;
    }
    
    toast({
      title: "✨ Magic Item Activated!",
      description: message,
      duration: 3000,
    });
    
    // Auto-deactivate after a few seconds
    setTimeout(() => {
      setActiveMagicItem(null);
    }, 10000);
  };

  return (
    <motion.div 
      className="fixed bottom-6 left-6 z-40 flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <MagicItems 
        type="lens" 
        onUse={() => handleUseMagicItem('lens')}
        isActive={activeMagicItem === 'lens'}
      />
      <MagicItems 
        type="specs" 
        onUse={() => handleUseMagicItem('specs')}
        isActive={activeMagicItem === 'specs'}
      />
      <MagicItems 
        type="wand" 
        onUse={() => handleUseMagicItem('wand')}
        isActive={activeMagicItem === 'wand'}
      />
    </motion.div>
  );
};

export default AdventureMagicItems;
