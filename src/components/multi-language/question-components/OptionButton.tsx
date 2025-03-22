
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useSpeech } from '../hooks/useSpeech';

interface OptionButtonProps {
  option: Word;
  languageId: string;
  onSelect: (option: Word) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, languageId, onSelect }) => {
  const { speakWord, isSpeaking } = useSpeech();
  
  // Default image mapping
  const defaultImages: Record<string, string> = {
    'apple': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    'cat': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'dog': 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8',
    'elephant': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    'flower': 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    'giraffe': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50',
    'house': 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
    'manzana': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'plátano': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    'gato': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'perro': 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8',
    'elefante': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    'flor': 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    'jirafa': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50',
    'casa': 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
    'सेब': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'केला': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    'बिल्ली': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'कुत्ता': 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8',
    'हाथी': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    'फूल': 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  };
  
  // Use provided image or get from default mapping or use placeholder
  const imageUrl = option.image || defaultImages[option.text.toLowerCase()] || 'https://images.unsplash.com/photo-1472396961693-142e6e269027';
  
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
            target.src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027';
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
