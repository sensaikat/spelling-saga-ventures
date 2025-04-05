
import { Word, Language } from '../../../../../utils/game';
import { normalizeTextForComparison } from './textNormalizer';
import { getLanguageIdFromContext } from './languageUtils';

/**
 * Validates if the user's input matches the expected word text
 * 
 * @param {string} userInput - User's submitted answer
 * @param {Word} word - The word to check against
 * @param {Language | string | null} selectedLanguage - The selected language context
 * @returns {boolean} Whether the answer is correct
 */
export const validateWordSubmission = (
  userInput: string, 
  word: Word,
  selectedLanguage: Language | string | null
): boolean => {
  const languageId = getLanguageIdFromContext(word, selectedLanguage);
  
  // Normalize both the expected answer and user input for proper comparison
  const normalizedAnswer = normalizeTextForComparison(word.text, languageId);
  const normalizedInput = normalizeTextForComparison(userInput, languageId);
  
  // For debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`Language: ${languageId}`);
    console.log(`Original word: ${word.text}, Normalized: ${normalizedAnswer}`);
    console.log(`Original input: ${userInput}, Normalized: ${normalizedInput}`);
    console.log(`Comparison result: ${normalizedInput === normalizedAnswer}`);
  }
  
  return normalizedInput === normalizedAnswer;
};
