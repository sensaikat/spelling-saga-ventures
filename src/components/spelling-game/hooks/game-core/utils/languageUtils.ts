
import { Word, Language } from '../../../../../utils/game';

/**
 * Gets the language ID from the context
 * 
 * @param {Word} word - The word object
 * @param {Language | string | null} selectedLanguage - The currently selected language
 * @returns {string} The language ID to use for validation
 */
export const getLanguageIdFromContext = (
  word: Word,
  selectedLanguage: Language | string | null
): string => {
  // First priority: use the word's own language if defined
  if (word.language) {
    return word.language;
  }
  
  // Second priority: use the selected language
  if (typeof selectedLanguage === 'string') {
    return selectedLanguage;
  }
  
  if (selectedLanguage && typeof selectedLanguage === 'object' && selectedLanguage.id) {
    return selectedLanguage.id;
  }
  
  // Detect language from word text
  if (word.text) {
    // Bengali character range: \u0980-\u09FF
    if (/[\u0980-\u09FF]/.test(word.text)) {
      return 'bn';
    }
    
    // Hindi character range: \u0900-\u097F
    if (/[\u0900-\u097F]/.test(word.text)) {
      return 'hi';
    }
    
    // Arabic character range: \u0600-\u06FF
    if (/[\u0600-\u06FF]/.test(word.text)) {
      return 'ar';
    }
  }
  
  // Default to English if no language can be determined
  return 'en';
};

/**
 * Test function for language detection
 */
export const testLanguageDetection = () => {
  const testCases = [
    { text: 'বিড়াল', expected: 'bn' },
    { text: 'बिल्ली', expected: 'hi' },
    { text: 'cat', expected: 'en' },
    { text: 'قطة', expected: 'ar' },
  ];
  
  console.group('Language Detection Test');
  testCases.forEach(test => {
    const word = { text: test.text } as Word;
    const result = getLanguageIdFromContext(word, null);
    console.log(`Text: ${test.text}`);
    console.log(`Detected: ${result}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Result: ${result === test.expected ? 'PASS ✓' : 'FAIL ✗'}`);
    console.log('---');
  });
  console.groupEnd();
  
  return 'Test complete. Check console for results.';
};

// Make it accessible from the global scope for testing
if (typeof window !== 'undefined') {
  (window as any).testLanguageDetection = testLanguageDetection;
}
