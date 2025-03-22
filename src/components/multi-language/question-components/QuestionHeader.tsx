
import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../../utils/game/types';

interface QuestionHeaderProps {
  sourceLanguage: Language;
  targetLanguage: Language;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  sourceLanguage,
  targetLanguage
}) => {
  return (
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
  );
};

export default QuestionHeader;
