
import React from 'react';
import { useGameStore } from '../../../../utils/game';
import { vocabularyTranslations } from '../../../../utils/translations/vocabularyTranslations';

interface TranslationHelperProps {
  currentTip: string;
}

export const TranslationHelper: React.FC<TranslationHelperProps> = ({ currentTip }) => {
  const { selectedLanguage } = useGameStore();
  
  // Create a translated tip by looking for vocabulary words and replacing them
  const getTranslatedTip = () => {
    if (!selectedLanguage) return currentTip;
    
    let translatedTip = currentTip;
    
    // Replace each vocabulary word with its translation
    Object.entries(vocabularyTranslations).forEach(([word, translations]) => {
      const langId = selectedLanguage.id;
      if (translations[langId]) {
        // Create a regex that matches the word (case insensitive and as a whole word)
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        translatedTip = translatedTip.replace(regex, `${word} (${translations[langId]})`);
      }
    });
    
    return translatedTip;
  };
  
  const translatedTip = getTranslatedTip();

  return (
    <div className="mt-2 text-sm opacity-80 italic">
      {translatedTip !== currentTip && (
        <div className="border-t border-white/20 pt-2 mt-2">
          {translatedTip}
        </div>
      )}
    </div>
  );
};
