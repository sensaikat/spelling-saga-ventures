
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useSpeech } from '../hooks/useSpeech';
import { defaultImages } from '../../word-card/ImageMappings';

interface OptionButtonProps {
  option: Word;
  languageId: string;
  onSelect: (option: Word) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, languageId, onSelect }) => {
  const { speakWord, isSpeaking } = useSpeech();
  
  // Use provided image or get from default mapping or use placeholder
  const imageUrl = option.image || defaultImages[option.text.toLowerCase()] || 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
  
  return (
    <motion.button
      className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-game-blue hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between min-h-[5rem]"
      onClick={() => onSelect(option)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-16 h-16 overflow-hidden rounded-md flex-shrink-0 mb-2 sm:mb-0 sm:mr-3">
        <img 
          src={imageUrl} 
          alt={option.text} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
          }}
        />
      </div>
      
      <div className="flex-1 sm:text-left text-center">
        <p className="text-lg font-medium">{option.text}</p>
        {option.hint && <p className="text-xs text-gray-500">{option.hint}</p>}
      </div>
      
      <button 
        className={`ml-2 p-1 rounded-full ${isSpeaking ? 'bg-game-blue/10 text-game-blue' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors`}
        onClick={(e) => {
          e.stopPropagation();
          speakWord(option.text, languageId);
        }}
        aria-label={`Pronounce ${option.text}`}
      >
        <Volume2 size={16} />
      </button>
    </motion.button>
  );
};

export default OptionButton;

