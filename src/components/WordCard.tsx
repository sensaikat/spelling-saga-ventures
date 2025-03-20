
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '../utils/gameData';
import { VolumeUp } from 'lucide-react';

interface WordCardProps {
  word: Word;
  revealed?: boolean;
  onClick?: () => void;
  onSpeakClick?: () => void;
  className?: string;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  revealed = true,
  onClick,
  onSpeakClick,
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
        {onSpeakClick && (
          <motion.button
            className="text-gray-600 hover:text-game-blue"
            onClick={handleSpeakClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <VolumeUp size={20} />
          </motion.button>
        )}
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
        
        {word.hint && (
          <p className="text-sm text-gray-500 mt-2 text-center">{word.hint}</p>
        )}
      </div>
    </motion.div>
  );
};

export default WordCard;
