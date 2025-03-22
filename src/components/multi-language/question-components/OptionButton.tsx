
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
  
  return (
    <motion.button
      className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-game-blue hover:shadow-md transition-all flex flex-col items-center justify-center h-24"
      onClick={() => onSelect(option)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <p className="text-lg font-medium mb-1">{option.text}</p>
      {option.hint && <p className="text-xs text-gray-500">{option.hint}</p>}
      <button 
        className={`mt-2 p-1 rounded-full ${isSpeaking ? 'bg-game-blue/10 text-game-blue' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors`}
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
