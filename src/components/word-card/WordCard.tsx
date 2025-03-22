
import React from 'react';
import { motion } from 'framer-motion';
import { Word } from '../../utils/game';
import { 
  WordCardImage, 
  WordCardButtons, 
  WordHint, 
  DifficultyIndicator,
  WordDisplay,
  defaultImages
} from './';

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
  const [isFlipped, setIsFlipped] = React.useState(false);

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
        <DifficultyIndicator difficulty={word.difficulty} />
        <WordCardButtons 
          onSpeakClick={handleSpeakClick} 
          onHintClick={handleHintClick}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center h-40">
        <WordCardImage text={word.text} imageUrl={imageUrl} />
        <WordDisplay text={word.text} revealed={revealed} />
        <WordHint hint={word.hint} showHint={showHint} />
      </div>
    </motion.div>
  );
};

export default WordCard;

