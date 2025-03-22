
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

  // Determine difficulty color
  const difficultyColor = 
    word.difficulty === 'easy' ? 'bg-game-green' : 
    word.difficulty === 'medium' ? 'bg-game-yellow' : 
    'bg-game-red';

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
      
      <div className="flex flex-col items-center justify-center h-32">
        {word.image && (
          <img 
            src={word.image} 
            alt={word.text} 
            className="w-16 h-16 object-contain mb-4" 
          />
        )}
        
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
