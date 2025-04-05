
import { Word, Language } from '../../../../../utils/game';
import { normalizeTextForComparison } from './textNormalizer';
import { getLanguageIdFromContext } from './languageUtils';
import { vocabularyTranslations } from '../../../../../utils/translations/vocabularyTranslations';

/**
 * Debug helper function to log validation details when needed
 */
const logValidationDebug = (word: Word, userInput: string, languageId: string, isCorrect: boolean) => {
  if (process.env.NODE_ENV === 'development') {
    console.group('Word Validation Debug');
    console.log(`Word: ${word.text} (${word.language || languageId})`);
    console.log(`Category: ${word.category || 'unknown'}`);
    console.log(`User input: ${userInput}`);
    console.log(`Result: ${isCorrect ? 'Correct ✓' : 'Incorrect ✗'}`);
    
    // Special details for Bengali words
    if (languageId === 'bn' || word.language === 'bn') {
      console.log(`Bengali word detected, showing character codes:`);
      console.log(`Word: ${Array.from(word.text).map(c => c + ' (U+' + c.charCodeAt(0).toString(16).padStart(4, '0').toUpperCase() + ')')}`);
      console.log(`Input: ${Array.from(userInput).map(c => c + ' (U+' + c.charCodeAt(0).toString(16).padStart(4, '0').toUpperCase() + ')')}`);
    }
    console.groupEnd();
  }
};

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
  // Early return if either input is empty
  if (!userInput?.trim() || !word?.text?.trim()) {
    return false;
  }
  
  const languageId = getLanguageIdFromContext(word, selectedLanguage);
  
  // Normalize both the expected answer and user input for proper comparison
  const normalizedAnswer = normalizeTextForComparison(word.text, languageId);
  const normalizedInput = normalizeTextForComparison(userInput, languageId);
  
  // Direct comparison first
  let isCorrect = normalizedInput === normalizedAnswer;
  
  // Bengali special case - try extra normalization
  if (!isCorrect && (languageId === 'bn' || word.language === 'bn')) {
    // Try additional Bengali-specific normalization
    const specialNormalizedAnswer = normalizeTextForComparison(word.text, 'bn-special');
    const specialNormalizedInput = normalizeTextForComparison(userInput, 'bn-special');
    isCorrect = specialNormalizedInput === specialNormalizedAnswer;
  }
  
  // If not correct directly, check if it matches animal names in vocabulary translations
  if (!isCorrect && word.category === 'animal') {
    // Look for the English equivalent in vocabularyTranslations for animal names
    // First check all animal entries in the vocabulary translations
    const animalEntries = Object.entries(vocabularyTranslations).filter(([key, translations]) => {
      // Filter only animal entries
      return key && translations.en && (
        // Check if this entry has our target language
        languageId in translations || 'bn' in translations
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
      
      // Special case for Bengali words
      const isBengaliWord = word.language === 'bn';
      
      if (wordMatchesThisAnimal || isEnglishWordWithForeignAnswer || isBengaliWord) {
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
        
        // Extra check specifically for Bengali
        if (!isCorrect && (languageId === 'bn' || word.language === 'bn' || userInput.match(/[\u0980-\u09FF]/))) {
          if (translations.bn && normalizeTextForComparison(translations.bn, 'bn-special') === normalizeTextForComparison(userInput, 'bn-special')) {
            isCorrect = true;
            console.log('Bengali special match found!');
          }
        }
        
        if (isCorrect) break; // Stop checking if we found a match
      }
    }
  }
  
  // Log detailed validation info
  logValidationDebug(word, userInput, languageId, isCorrect);
  
  return isCorrect;
};

/**
 * Test function to validate Bengali animal names
 * Can be called from browser console for debugging
 */
export const testBengaliAnimalValidation = () => {
  const bengaliAnimals = [
    { text: 'বিড়াল', expected: 'cat' },
    { text: 'কুকুর', expected: 'dog' },
    { text: 'হাতি', expected: 'elephant' },
    { text: 'বাঘ', expected: 'tiger' },
    { text: 'সিংহ', expected: 'lion' },
    { text: 'খরগোশ', expected: 'rabbit' },
  ];
  
  console.group('Bengali Animal Validation Test');
  bengaliAnimals.forEach(animal => {
    const word = { 
      id: 'test', 
      text: animal.expected,
      language: 'en',
      category: 'animal'
    } as Word;
    
    const result = validateWordSubmission(animal.text, word, 'en');
    console.log(`Testing ${animal.text} ↔ ${animal.expected}: ${result ? 'PASS ✓' : 'FAIL ✗'}`);
    
    // Test reverse (English → Bengali)
    const reverseWord = {
      id: 'test',
      text: animal.text,
      language: 'bn',
      category: 'animal'
    } as Word;
    
    const reverseResult = validateWordSubmission(animal.expected, reverseWord, 'bn');
    console.log(`Testing reverse ${animal.expected} ↔ ${animal.text}: ${reverseResult ? 'PASS ✓' : 'FAIL ✗'}`);
  });
  console.groupEnd();
  
  return 'Test complete. Check console for results.';
};

// Make it accessible from the global scope for testing
if (typeof window !== 'undefined') {
  (window as any).testBengaliAnimalValidation = testBengaliAnimalValidation;
}
