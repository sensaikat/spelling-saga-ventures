
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
    // Add more test cases for comprehensive testing
    { text: 'কুকুর', expected: 'bn' }, // dog in Bengali
    { text: 'হাতি', expected: 'bn' },  // elephant in Bengali
    { text: 'बाघ', expected: 'hi' },   // tiger in Hindi
    { text: 'كلب', expected: 'ar' },   // dog in Arabic
  ];
  
  console.group('Language Detection Test');
  let passCount = 0;
  testCases.forEach(test => {
    const word = { text: test.text } as Word;
    const result = getLanguageIdFromContext(word, null);
    const passed = result === test.expected;
    
    if (passed) passCount++;
    
    console.log(`Text: ${test.text}`);
    console.log(`Detected: ${result}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Result: ${passed ? '✅ PASS' : '❌ FAIL'}`);
    console.log('---');
  });
  
  console.log(`Summary: ${passCount}/${testCases.length} tests passed (${Math.round(passCount/testCases.length*100)}%)`);
  console.groupEnd();
  
  // Run all tests in sequence
  console.log('\n🧪 Running all available tests:');
  if (typeof window !== 'undefined') {
    (window as any).testNormalization();
    (window as any).testBengaliAnimalValidation();
  }
  
  return 'Language detection test complete. Check console for results.';
};

// Make it accessible from the global scope for testing
if (typeof window !== 'undefined') {
  (window as any).testLanguageDetection = testLanguageDetection;
  
  // Add a comprehensive test runner that executes all tests
  (window as any).runAllTests = () => {
    console.group('🧪 Comprehensive Language Testing Suite');
    console.log('Running all language detection, normalization, and validation tests...');
    (window as any).testLanguageDetection();
    (window as any).testNormalization();
    (window as any).testBengaliAnimalValidation();
    console.log('All tests completed!');
    console.groupEnd();
    return 'All tests executed. Check console for detailed results.';
  };
}
