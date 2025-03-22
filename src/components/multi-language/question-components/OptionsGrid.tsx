
import React from 'react';
import { Word } from '../../../utils/game/types';
import OptionButton from './OptionButton';

interface OptionsGridProps {
  options: Word[];
  targetLanguageId: string;
  onSelect: (option: Word) => void;
}

const OptionsGrid: React.FC<OptionsGridProps> = ({ 
  options, 
  targetLanguageId, 
  onSelect 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options?.map((option, index) => (
        <OptionButton
          key={index}
          option={option}
          languageId={targetLanguageId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default OptionsGrid;
