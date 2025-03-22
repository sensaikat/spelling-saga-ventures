
import React from 'react';
import RealWordCard from './word-card/WordCard';
import { Word } from '../utils/game';

interface WordCardProps {
  word: Word;
  revealed?: boolean;
  onClick?: () => void;
  onSpeakClick?: () => void;
  onHintClick?: () => void;
  showHint?: boolean;
  className?: string;
}

// This is a wrapper component that maintains the same API
// but delegates to our refactored implementation
const WordCard: React.FC<WordCardProps> = (props) => {
  return <RealWordCard {...props} />;
};

export default WordCard;
