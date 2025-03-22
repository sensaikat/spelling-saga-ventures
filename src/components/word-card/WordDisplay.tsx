
import React from 'react';

interface WordDisplayProps {
  text: string;
  revealed: boolean;
  language?: string;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ 
  text, 
  revealed, 
  language
}) => {
  // Get text direction based on language
  const textDirection = language && ["ar", "ur", "he"].includes(language) ? "rtl" : "ltr";
  
  return (
    <h3 
      className="text-2xl font-medium text-center"
      dir={textDirection}
      lang={language || undefined}
    >
      {revealed ? text : '????????'}
    </h3>
  );
};
