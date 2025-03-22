
import React from 'react';

interface WordDisplayProps {
  text: string;
  revealed: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ text, revealed }) => {
  return (
    <h3 className="text-2xl font-medium text-center">
      {revealed ? text : '????????'}
    </h3>
  );
};
