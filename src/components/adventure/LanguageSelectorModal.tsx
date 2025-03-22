
import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../utils/game';
import LanguageSelector from '../LanguageSelector';
import { toast } from '@/components/ui/use-toast';

interface LanguageSelectorModalProps {
  onSelect: (language: Language) => void;
  onSkip: () => void;
  currentLocation?: { name: string };
}

const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  onSelect,
  onSkip,
  currentLocation
}) => {
  const handleLanguageSelect = (language: Language) => {
    onSelect(language);
    
    toast({
      title: `${language.name} Selected`,
      description: `You will play the adventure in ${language.name} (${language.nativeName}).`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Choose Your Adventure Language</h1>
        <p className="text-gray-600">
          Select the language you want to practice during your adventure
          {currentLocation ? ` in ${currentLocation.name}` : ''}.
        </p>
      </motion.div>
      
      <LanguageSelector onSelect={handleLanguageSelect} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-8"
      >
        <button 
          className="text-blue-500 underline" 
          onClick={onSkip}
        >
          Skip language selection
        </button>
      </motion.div>
    </div>
  );
};

export default LanguageSelectorModal;
