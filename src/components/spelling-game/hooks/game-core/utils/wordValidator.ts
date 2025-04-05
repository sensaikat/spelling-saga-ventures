
import { Word, Language } from '../../../../../utils/game';
import { normalizeTextForComparison } from './textNormalizer';
import { getLanguageIdFromContext } from './languageUtils';
import { vocabularyTranslations } from '../../../../../utils/translations/vocabularyTranslations';

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
  
  // Check if this is an animal name with possible translation variations
  let isCorrect = normalizedInput === normalizedAnswer;
  
  // If not correct directly, check if it matches animal names in vocabulary translations
  if (!isCorrect && word.category === 'animal') {
    // Look for the English equivalent in vocabularyTranslations
    const animalEntries = Object.entries(vocabularyTranslations).filter(([key, translations]) => {
      return translations.en && (
        // Try to match by either vernacular word or English word
        (languageId !== 'en' && translations[languageId] === word.text) || 
        (translations.en.toLowerCase() === word.text.toLowerCase())
      );
    });
    
    // If we found a match in vocabulary translations
    if (animalEntries.length > 0) {
      const [animalKey, translations] = animalEntries[0];
      
      // Check if user input matches any translation for this animal
      const possibleTranslations = Object.entries(translations)
        .filter(([lang, _]) => lang === languageId || lang === 'en')
        .map(([_, text]) => normalizeTextForComparison(text as string, languageId));
      
      isCorrect = possibleTranslations.includes(normalizedInput);
    }
  }
  
  // For debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`Language: ${languageId}`);
    console.log(`Original word: ${word.text}, Normalized: ${normalizedAnswer}`);
    console.log(`Original input: ${userInput}, Normalized: ${normalizedInput}`);
    console.log(`Is animal: ${word.category === 'animal'}`);
    console.log(`Comparison result: ${isCorrect}`);
  }
  
  return isCorrect;
};
