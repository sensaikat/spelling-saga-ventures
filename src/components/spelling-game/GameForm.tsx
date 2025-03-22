
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import WordCard from '../../components/WordCard';
import { Word } from '../../utils/game';

interface GameFormProps {
  currentWord: Word;
  userInput: string;
  setUserInput: (value: string) => void;
  showResult: boolean;
  isCorrect: boolean | null;
  handleSubmit: (e: React.FormEvent) => void;
  speakWord: (word: Word) => void;
  showHint: boolean;
  handleShowHint: () => void;
  showAlphabetHelper: boolean;
  handleAlphabetHelperToggle: () => void;
  handleInputSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCursorPosition: number;
}

export const GameForm: React.FC<GameFormProps> = ({
  currentWord,
  userInput,
  setUserInput,
  showResult,
  isCorrect,
  handleSubmit,
  speakWord,
  showHint,
  handleShowHint,
  showAlphabetHelper,
  handleAlphabetHelperToggle,
  handleInputSelect,
  handleInputChange,
  setCursorPosition,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Early return if currentWord is undefined
  if (!currentWord) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Loading word...</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex justify-center mb-6">
          <WordCard 
            word={currentWord} 
            revealed={showResult} 
            onSpeakClick={() => speakWord(currentWord)}
            onHintClick={handleShowHint}
            showHint={showHint}
            className="w-full max-w-sm"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full max-w-md mb-2 relative">
            <Input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onClick={handleInputSelect}
              onKeyUp={handleInputSelect}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                isCorrect === null 
                  ? 'border-gray-300 focus:border-game-blue' 
                  : isCorrect 
                    ? 'border-game-green bg-green-50' 
                    : 'border-game-red bg-red-50'
              }`}
              placeholder="Type the word..."
              disabled={showResult}
            />
            
            <button 
              type="button" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-game-blue"
              onClick={() => speakWord(currentWord)}
            >
              <Volume size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <button
              type="button"
              onClick={handleAlphabetHelperToggle}
              className="text-xs text-gray-600 hover:text-game-blue underline"
            >
              {showAlphabetHelper ? "Hide alphabet helper" : "Show alphabet helper"}
            </button>
          </div>
          
          <div className="flex gap-4">
            {!showResult && (
              <motion.button
                type="submit"
                className="primary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!userInput.trim()}
              >
                Check
              </motion.button>
            )}
          </div>
        </form>
        
        <AnimatePresence>
          {showResult && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {isCorrect ? (
                <motion.div 
                  className="inline-flex items-center bg-green-100 text-green-800 py-2 px-4 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Check size={18} className="mr-2" />
                  Correct!
                </motion.div>
              ) : (
                <motion.div 
                  className="inline-flex items-center bg-red-100 text-red-800 py-2 px-4 rounded-full"
                  animate={{ x: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <X size={18} className="mr-2" />
                  Incorrect! The answer is: {currentWord.text}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
