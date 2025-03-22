
import React from 'react';
import { motion } from 'framer-motion';
import { Word } from '../../utils/game/types';
import { MultiLanguageQuestion as QuestionType } from './types';
import { QuestionHeader, SourceWord, OptionsGrid } from './question-components';

interface MultiLanguageQuestionProps {
  question: QuestionType;
  onAnswer: (selectedWord: Word) => void;
}

const MultiLanguageQuestion: React.FC<MultiLanguageQuestionProps> = ({
  question,
  onAnswer
}) => {
  const { sourceLanguage, targetLanguage, sourceWord, options } = question;
  
  return (
    <motion.div
      className="max-w-2xl mx-auto glass-panel p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <QuestionHeader 
        sourceLanguage={sourceLanguage} 
        targetLanguage={targetLanguage} 
      />
      
      <SourceWord 
        word={sourceWord} 
        languageId={sourceLanguage.id} 
      />
      
      <OptionsGrid 
        options={options || []} 
        targetLanguageId={targetLanguage.id} 
        onSelect={onAnswer} 
      />
    </motion.div>
  );
};

export default MultiLanguageQuestion;
