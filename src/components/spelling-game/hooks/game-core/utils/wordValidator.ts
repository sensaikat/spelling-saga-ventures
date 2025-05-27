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
    
    // Special details for vernacular languages
    if (['bn', 'hi', 'ta', 'te', 'gu', 'ml', 'kn', 'or', 'pa', 'as'].includes(languageId) || 
        ['bn', 'hi', 'ta', 'te', 'gu', 'ml', 'kn', 'or', 'pa', 'as'].includes(word.language || '')) {
      console.log(`Vernacular language detected, showing character analysis:`);
      console.log(`Word: ${Array.from(word.text || '').map(c => c + ' (U+' + c.charCodeAt(0).toString(16).padStart(4, '0').toUpperCase() + ')')}`);
      console.log(`Input: ${Array.from(userInput || '').map(c => c + ' (U+' + c.charCodeAt(0).toString(16).padStart(4, '0').toUpperCase() + ')')}`);
    }
    console.groupEnd();
  }
};

/**
 * Enhanced validation for picture questions with vernacular language support
 */
const validatePictureQuestion = (
  userInput: string,
  word: Word,
  languageId: string
): boolean => {
  console.log('🖼️ Validating picture question:', {
    wordText: word.text,
    category: word.category,
    userInput,
    languageId
  });

  // Direct text comparison first
  const normalizedAnswer = normalizeTextForComparison(word.text, languageId);
  const normalizedInput = normalizeTextForComparison(userInput, languageId);
  
  if (normalizedInput === normalizedAnswer) {
    console.log('✅ Direct match found');
    return true;
  }

  // For picture questions, check cross-language translations
  if (word.category && vocabularyTranslations) {
    console.log(`🔍 Checking cross-language translations for category: ${word.category}`);
    
    // Find all vocabulary entries that might match this word
    const matchingEntries = Object.entries(vocabularyTranslations).filter(([key, translations]) => {
      if (!translations || typeof translations !== 'object') return false;
      
      // Check if any translation matches the word text
      return Object.values(translations).some(translation => {
        if (typeof translation === 'string') {
          const normalizedTranslation = normalizeTextForComparison(translation, languageId);
          return normalizedTranslation === normalizedAnswer;
        }
        return false;
      });
    });

    console.log(`Found ${matchingEntries.length} matching vocabulary entries`);

    // Check if user input matches any translation of the same concept
    for (const [conceptKey, translations] of matchingEntries) {
      const allTranslations = Object.entries(translations)
        .filter(([lang, text]) => typeof text === 'string')
        .map(([lang, text]) => ({
          lang,
          text: text as string,
          normalized: normalizeTextForComparison(text as string, lang)
        }));

      console.log(`Checking concept "${conceptKey}" with translations:`, allTranslations.map(t => `${t.lang}: ${t.text}`));

      // Check if user input matches any translation
      const matchFound = allTranslations.some(translation => {
        const match = translation.normalized === normalizedInput;
        if (match) {
          console.log(`✅ Cross-language match found: ${userInput} (${languageId}) = ${translation.text} (${translation.lang})`);
        }
        return match;
      });

      if (matchFound) return true;

      // Special handling for vernacular scripts with extra normalization
      if (['bn', 'hi', 'ta', 'te', 'gu', 'ml', 'kn', 'or', 'pa', 'as'].includes(languageId)) {
        const specialNormalizedInput = normalizeTextForComparison(userInput, `${languageId}-special`);
        
        const specialMatchFound = allTranslations.some(translation => {
          if (['bn', 'hi', 'ta', 'te', 'gu', 'ml', 'kn', 'or', 'pa', 'as'].includes(translation.lang)) {
            const specialNormalizedTranslation = normalizeTextForComparison(translation.text, `${translation.lang}-special`);
            const match = specialNormalizedTranslation === specialNormalizedInput;
            if (match) {
              console.log(`✅ Special vernacular match found: ${userInput} = ${translation.text}`);
            }
            return match;
          }
          return false;
        });

        if (specialMatchFound) return true;
      }
    }
  }

  return false;
};

/**
 * Validates if the user's input matches the expected word text
 * Enhanced for picture questions and vernacular language support
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
  
  console.log('🔤 Starting word validation:', {
    userInput,
    wordText: word.text,
    wordLanguage: word.language,
    selectedLanguage: typeof selectedLanguage === 'string' ? selectedLanguage : selectedLanguage?.id,
    detectedLanguageId: languageId,
    category: word.category
  });

  // For picture questions (words with categories), use enhanced validation
  if (word.category) {
    const result = validatePictureQuestion(userInput, word, languageId);
    logValidationDebug(word, userInput, languageId, result);
    return result;
  }

  // For regular text questions, use standard validation
  const normalizedAnswer = normalizeTextForComparison(word.text, languageId);
  const normalizedInput = normalizeTextForComparison(userInput, languageId);
  
  let isCorrect = normalizedInput === normalizedAnswer;
  
  // Vernacular language special case - try extra normalization
  if (!isCorrect && ['bn', 'hi', 'ta', 'te', 'gu', 'ml', 'kn', 'or', 'pa', 'as'].includes(languageId)) {
    const specialNormalizedAnswer = normalizeTextForComparison(word.text, `${languageId}-special`);
    const specialNormalizedInput = normalizeTextForComparison(userInput, `${languageId}-special`);
    isCorrect = specialNormalizedInput === specialNormalizedAnswer;
    
    console.log('🔤 Vernacular special comparison:', {
      original: { word: word.text, input: userInput },
      normalized: { answer: normalizedAnswer, input: normalizedInput, match: normalizedInput === normalizedAnswer },
      special: { answer: specialNormalizedAnswer, input: specialNormalizedInput, match: specialNormalizedInput === specialNormalizedAnswer }
    });
  }
  
  logValidationDebug(word, userInput, languageId, isCorrect);
  return isCorrect;
};

/**
 * Test function specifically for picture questions with vernacular input
 */
export const testPictureQuestionValidation = () => {
  const testCases = [
    // Bengali animal names
    { userInput: 'বিড়াল', word: { text: 'cat', category: 'animal', language: 'en' }, expected: true },
    { userInput: 'cat', word: { text: 'বিড়াল', category: 'animal', language: 'bn' }, expected: true },
    { userInput: 'কুকুর', word: { text: 'dog', category: 'animal', language: 'en' }, expected: true },
    { userInput: 'dog', word: { text: 'কুকুর', category: 'animal', language: 'bn' }, expected: true },
    { userInput: 'হাতি', word: { text: 'elephant', category: 'animal', language: 'en' }, expected: true },
    
    // Hindi animal names  
    { userInput: 'बिल्ली', word: { text: 'cat', category: 'animal', language: 'en' }, expected: true },
    { userInput: 'कुत्ता', word: { text: 'dog', category: 'animal', language: 'en' }, expected: true },
    
    // Same language validation
    { userInput: 'বিড়াল', word: { text: 'বিড়াল', category: 'animal', language: 'bn' }, expected: true },
    { userInput: 'cat', word: { text: 'cat', category: 'animal', language: 'en' }, expected: true },
  ];
  
  console.group('🖼️ Picture Question Validation Test');
  let passCount = 0;
  
  testCases.forEach((test, index) => {
    const word = { id: `test-${index}`, ...test.word } as Word;
    const result = validateWordSubmission(test.userInput, word, word.language);
    const passed = result === test.expected;
    
    if (passed) passCount++;
    
    console.log(`\nTest ${index + 1}:`);
    console.log(`User Input: "${test.userInput}"`);
    console.log(`Word: "${test.word.text}" (${test.word.language})`);
    console.log(`Category: ${test.word.category}`);
    console.log(`Expected: ${test.expected ? 'ACCEPT' : 'REJECT'}`);
    console.log(`Result: ${result ? 'ACCEPTED' : 'REJECTED'}`);
    console.log(`Status: ${passed ? '✅ PASS' : '❌ FAIL'}`);
  });
  
  console.log(`\n📊 Summary: ${passCount}/${testCases.length} tests passed (${Math.round(passCount/testCases.length*100)}%)`);
  console.groupEnd();
  
  return 'Picture question validation test complete. Check console for results.';
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
  
  // Test English → Bengali
  console.log('🔍 Testing English → Bengali translations:');
  bengaliAnimals.forEach(animal => {
    const word = { 
      id: 'test', 
      text: animal.expected,
      language: 'en',
      category: 'animal'
    } as Word;
    
    const result = validateWordSubmission(animal.text, word, 'en');
    console.log(`Testing ${animal.text} ↔ ${animal.expected}: ${result ? '✅ PASS' : '❌ FAIL'}`);
  });
  
  console.log('\n');
  
  // Test Bengali → English
  console.log('🔍 Testing Bengali → English translations:');
  bengaliAnimals.forEach(animal => {
    const reverseWord = {
      id: 'test',
      text: animal.text,
      language: 'bn',
      category: 'animal'
    } as Word;
    
    const reverseResult = validateWordSubmission(animal.expected, reverseWord, 'bn');
    console.log(`Testing ${animal.text} ↔ ${animal.expected}: ${reverseResult ? '✅ PASS' : '❌ FAIL'}`);
  });
  
  // Test Bengali → Bengali (same word)
  console.log('\n');
  console.log('🔍 Testing Bengali → Bengali (identical word):');
  bengaliAnimals.forEach(animal => {
    const bengaliWord = {
      id: 'test',
      text: animal.text,
      language: 'bn',
      category: 'animal'
    } as Word;
    
    const sameResult = validateWordSubmission(animal.text, bengaliWord, 'bn');
    console.log(`Testing ${animal.text} ↔ ${animal.text}: ${sameResult ? '✅ PASS' : '❌ FAIL'}`);
  });
  
  console.groupEnd();
  
  return 'Test complete. Check console for results.';
};

// Make it accessible from the global scope for testing
if (typeof window !== 'undefined') {
  (window as any).testBengaliAnimalValidation = testBengaliAnimalValidation;
}
