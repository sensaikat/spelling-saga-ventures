
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
  
  // Improved image mapping with clearer, more accurate images
  const defaultImages: Record<string, string> = {
    // English
    'apple': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'banana': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'dog': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'elephant': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'flower': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    'giraffe': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600',
    'house': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600',
    'tiger': 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=600',
    'penguin': 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=600',
    'zebra': 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?q=80&w=600',
    'kangaroo': 'https://images.unsplash.com/photo-1590668158521-3501fab07eaf?q=80&w=600',
    'dolphin': 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?q=80&w=600',
    'octopus': 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?q=80&w=600',
    
    // Spanish
    'manzana': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'plátano': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'gato': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'perro': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'elefante': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'flor': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    'jirafa': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600',
    'casa': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600',
    
    // Hindi
    'सेब': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'केला': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'बिल्ली': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'कुत्ता': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'हाथी': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'फूल': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',

    // Additional languages can follow the same pattern
  };
  
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
