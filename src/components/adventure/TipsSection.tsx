
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TipsSectionProps {
  visible: boolean;
}

const TipsSection: React.FC<TipsSectionProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
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
  );
};

export default TipsSection;
