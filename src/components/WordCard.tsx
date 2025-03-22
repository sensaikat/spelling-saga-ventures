
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

  // Default image if none is provided
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

  // Determine difficulty color
  const difficultyColor = 
    word.difficulty === 'easy' ? 'bg-game-green' : 
    word.difficulty === 'medium' ? 'bg-game-yellow' : 
    'bg-game-red';

  // Use provided image or get from default mapping or use placeholder
  const imageUrl = word.image || defaultImages[word.text.toLowerCase()] || 'https://images.unsplash.com/photo-1472396961693-142e6e269027';

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
              target.src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027';
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
