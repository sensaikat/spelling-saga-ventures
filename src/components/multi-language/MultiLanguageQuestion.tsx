
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Word } from '../../utils/game/types';
import { MultiLanguageQuestion as QuestionType } from './types';

interface MultiLanguageQuestionProps {
  question: QuestionType;
  onAnswer: (selectedWord: Word) => void;
}

const MultiLanguageQuestion: React.FC<MultiLanguageQuestionProps> = ({
  question,
  onAnswer
}) => {
  const { sourceLanguage, targetLanguage, sourceWord, options } = question;
  
  const speakWord = (text: string, languageId: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageId;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <motion.div
      className="max-w-2xl mx-auto glass-panel p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-medium mb-2">Translate this word</h2>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="px-2 py-1 bg-blue-100 rounded-full flex items-center gap-1">
            <span>{sourceLanguage.flag}</span>
            <span>{sourceLanguage.name}</span>
          </span>
          <span>→</span>
          <span className="px-2 py-1 bg-purple-100 rounded-full flex items-center gap-1">
            <span>{targetLanguage.flag}</span>
            <span>{targetLanguage.name}</span>
          </span>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-white rounded-lg px-8 py-4 shadow-sm border border-gray-200 inline-block">
            <h3 className="text-2xl font-medium">{sourceWord.text}</h3>
          </div>
          <button 
            className="ml-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => speakWord(sourceWord.text, sourceLanguage.id)}
          >
            <Volume2 size={20} />
          </button>
        </div>
        
        {sourceWord.hint && (
          <p className="text-sm text-gray-600 italic">Hint: {sourceWord.hint}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {options?.map((option, index) => (
          <motion.button
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-game-blue hover:shadow-md transition-all"
            onClick={() => onAnswer(option)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-lg font-medium mb-1">{option.text}</p>
            <button 
              className="mt-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                speakWord(option.text, targetLanguage.id);
              }}
            >
              <Volume2 size={16} />
            </button>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MultiLanguageQuestion;
