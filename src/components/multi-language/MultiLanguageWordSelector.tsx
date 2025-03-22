
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Language, wordLists } from '../../utils/game';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiLanguageWordList } from './types';

interface MultiLanguageWordSelectorProps {
  language: Language;
  onSelectWordList: (wordList: MultiLanguageWordList) => void;
  selectedWordList?: MultiLanguageWordList;
}

const MultiLanguageWordSelector: React.FC<MultiLanguageWordSelectorProps> = ({
  language,
  onSelectWordList,
  selectedWordList
}) => {
  // Get word lists for this language
  const availableWordLists = wordLists[language.id] || [];
  
  const handleSelectWordList = (wordListId: string) => {
    const original = availableWordLists.find(list => list.id === wordListId);
    if (!original) return;
    
    // Create a copy of the word list with a unique ID for multi-language context
    const multiWordList: MultiLanguageWordList = {
      id: `multi-${language.id}-${original.id}`,
      originalId: original.id,
      name: original.name,
      languageId: language.id,
      language: language,
      description: original.description,
      words: original.words,
      difficulty: original.difficulty
    };
    
    onSelectWordList(multiWordList);
  };
  
  return (
    <div className="mb-4 p-4 bg-white/60 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{language.flag}</span>
        <h3 className="font-medium">{language.name}</h3>
      </div>
      
      <Select
        value={selectedWordList?.originalId}
        onValueChange={handleSelectWordList}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Choose a ${language.name} word list`} />
        </SelectTrigger>
        <SelectContent>
          {availableWordLists.map(list => (
            <SelectItem key={list.id} value={list.id}>
              <div className="flex items-center justify-between w-full">
                <span>{list.name}</span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {list.difficulty}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedWordList && (
        <div className="mt-2 text-sm text-gray-600">
          <p>{selectedWordList.description}</p>
          <p className="mt-1 text-xs">
            {selectedWordList.words.length} words • {selectedWordList.difficulty} difficulty
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiLanguageWordSelector;
