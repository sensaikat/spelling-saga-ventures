
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '../utils/game';
import { Volume, HelpCircle } from 'lucide-react';

interface WordCardProps {
  word: Word;
  revealed?: boolean;
  onClick?: () => void;
  onSpeakClick?: () => void;
  onHintClick?: () => void;
  showHint?: boolean;
  className?: string;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  revealed = true,
  onClick,
  onSpeakClick,
  onHintClick,
  showHint = false,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!revealed) {
      setIsFlipped(!isFlipped);
    }
    if (onClick) onClick();
  };

  const handleSpeakClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSpeakClick) onSpeakClick();
  };

  const handleHintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onHintClick) onHintClick();
  };

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

  // Determine difficulty color
  const difficultyColor = 
    word.difficulty === 'easy' ? 'bg-game-green' : 
    word.difficulty === 'medium' ? 'bg-game-yellow' : 
    'bg-game-red';

  // Use provided image or get from default mapping or use placeholder
  const imageUrl = word.image || defaultImages[word.text.toLowerCase()] || 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';

  return (
    <motion.div
      className={`relative game-card ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className={`flex justify-between items-start mb-2`}>
        <div className={`h-2 w-16 rounded-full ${difficultyColor} opacity-70`} />
        <div className="flex space-x-2">
          {onHintClick && (
            <motion.button
              className="text-gray-600 hover:text-game-yellow"
              onClick={handleHintClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Get a hint"
            >
              <HelpCircle size={20} />
            </motion.button>
          )}
          {onSpeakClick && (
            <motion.button
              className="text-gray-600 hover:text-game-blue"
              onClick={handleSpeakClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Listen to pronunciation"
            >
              <Volume size={20} />
            </motion.button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center h-40">
        <div className="mb-3 w-20 h-20 overflow-hidden rounded-md flex items-center justify-center bg-gray-50">
          <img 
            src={imageUrl} 
            alt={word.text} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
            }}
          />
        </div>
        
        <h3 className="text-2xl font-medium text-center">
          {revealed ? word.text : '????????'}
        </h3>
        
        {showHint && word.hint && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm bg-yellow-50 text-gray-700 mt-2 p-2 rounded-md text-center border border-yellow-200"
          >
            {word.hint}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default WordCard;
