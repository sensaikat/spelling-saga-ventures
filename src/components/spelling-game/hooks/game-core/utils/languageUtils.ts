
import { Word, Language } from '../../../../../utils/game';

/**
 * Determines the appropriate language ID from either the word or the selected language
 * 
 * @param {Word} word - The current word
 * @param {Language | string | null} selectedLanguage - The selected language
 * @returns {string} The language ID to use
 */
export const getLanguageIdFromContext = (
  word: Word,
  selectedLanguage: Language | string | null
): string => {
  // First try to get language from the word itself
  if (word.language) {
    return word.language;
  }
  
  // Then try to extract from selectedLanguage
  if (typeof selectedLanguage === 'object' && selectedLanguage) {
    return selectedLanguage.id;
  }
  
  if (typeof selectedLanguage === 'string') {
    return selectedLanguage;
  }
  
  // Default to English
  return 'en';
};
