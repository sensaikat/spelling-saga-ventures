
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
    // Look for the English equivalent in vocabularyTranslations for animal names
    // First check all animal entries in the vocabulary translations
    const animalEntries = Object.entries(vocabularyTranslations).filter(([key, translations]) => {
      // Filter only animal entries
      return key && translations.en && (
        // Check if this entry has our target language
        languageId in translations
      );
    });
    
    // For debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`Looking for animal translations. Found ${animalEntries.length} animal entries`);
      console.log(`Word text to check: ${word.text} in language: ${languageId}`);
    }
    
    // Go through all animal translations to find if the user input matches any valid translation
    for (const [animalKey, translations] of animalEntries) {
      // Check if the current word's text matches this animal's entry in the target language
      const wordMatchesThisAnimal = translations[languageId] === word.text;
      
      // Or if we're showing an English word but the user answered in Bengali or another language
      const isEnglishWordWithForeignAnswer = 
        word.language === 'en' && 
        translations.en.toLowerCase() === word.text.toLowerCase();
      
      if (wordMatchesThisAnimal || isEnglishWordWithForeignAnswer) {
        // Get all possible correct translations for this animal
        const allTranslations = Object.entries(translations)
          .map(([lang, text]) => {
            if (typeof text === 'string') {
              return normalizeTextForComparison(text, lang);
            }
            return '';
          })
          .filter(text => text); // Remove empty strings
        
        // Check if user input matches any of these translations
        isCorrect = allTranslations.includes(normalizedInput);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Checking animal: ${animalKey}`);
          console.log(`Possible translations:`, allTranslations);
          console.log(`User input (normalized): ${normalizedInput}`);
          console.log(`Match found: ${isCorrect}`);
        }
        
        if (isCorrect) break; // Stop checking if we found a match
      }
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
