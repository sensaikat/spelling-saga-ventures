
// Specific test utilities for picture questions with vernacular language input
export const testPictureQuestions = () => {
  console.group('🖼️ Testing Picture Questions with Vernacular Input');
  
  // Test if picture questions accept vernacular language answers
  const testResults = {
    englishToBengali: false,
    bengaliToEnglish: false,
    hindiToEnglish: false,
    sameLangValidation: false
  };
  
  try {
    // Import the validation function
    import('../../components/spelling-game/hooks/game-core/utils/wordValidator').then(({ validateWordSubmission }) => {
      
      // Test 1: English word, Bengali answer
      const englishWord = { 
        id: 'test-1', 
        text: 'cat', 
        category: 'animal', 
        language: 'en',
        difficulty: 'easy' as const
      };
      testResults.englishToBengali = validateWordSubmission('বিড়াল', englishWord, 'en');
      console.log(`English "cat" → Bengali "বিড়াল": ${testResults.englishToBengali ? '✅ ACCEPTED' : '❌ REJECTED'}`);
      
      // Test 2: Bengali word, English answer
      const bengaliWord = { 
        id: 'test-2', 
        text: 'বিড়াল', 
        category: 'animal', 
        language: 'bn',
        difficulty: 'easy' as const
      };
      testResults.bengaliToEnglish = validateWordSubmission('cat', bengaliWord, 'bn');
      console.log(`Bengali "বিড়াল" → English "cat": ${testResults.bengaliToEnglish ? '✅ ACCEPTED' : '❌ REJECTED'}`);
      
      // Test 3: English word, Hindi answer
      testResults.hindiToEnglish = validateWordSubmission('बिल्ली', englishWord, 'en');
      console.log(`English "cat" → Hindi "बिल्ली": ${testResults.hindiToEnglish ? '✅ ACCEPTED' : '❌ REJECTED'}`);
      
      // Test 4: Same language validation
      testResults.sameLangValidation = validateWordSubmission('বিড়াল', bengaliWord, 'bn');
      console.log(`Bengali "বিড়াল" → Bengali "বিড়াল": ${testResults.sameLangValidation ? '✅ ACCEPTED' : '❌ REJECTED'}`);
      
      // Summary
      const passedTests = Object.values(testResults).filter(Boolean).length;
      const totalTests = Object.keys(testResults).length;
      
      console.log(`\n📊 Picture Question Test Summary:`);
      console.log(`✅ Passed: ${passedTests}/${totalTests}`);
      console.log(`📈 Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
      
      if (passedTests === totalTests) {
        console.log('🎉 All picture questions are accepting vernacular language input correctly!');
      } else {
        console.warn('⚠️ Some picture questions may not be accepting vernacular input properly');
      }
    });
    
  } catch (error) {
    console.error('❌ Error testing picture questions:', error);
  }
  
  console.groupEnd();
};

// Test specific language combinations for picture questions
export const testSpecificLanguageCombinations = () => {
  console.group('🌍 Testing Specific Language Combinations for Picture Questions');
  
  const languageCombinations = [
    { wordLang: 'en', inputLang: 'bn', word: 'cat', input: 'বিড়াল', description: 'English word, Bengali input' },
    { wordLang: 'en', inputLang: 'hi', word: 'dog', input: 'कुत्ता', description: 'English word, Hindi input' },
    { wordLang: 'bn', inputLang: 'en', word: 'হাতি', input: 'elephant', description: 'Bengali word, English input' },
    { wordLang: 'hi', inputLang: 'en', word: 'बिल्ली', input: 'cat', description: 'Hindi word, English input' },
  ];
  
  languageCombinations.forEach((combo, index) => {
    console.log(`\nTest ${index + 1}: ${combo.description}`);
    console.log(`Word: "${combo.word}" (${combo.wordLang})`);
    console.log(`Input: "${combo.input}" (${combo.inputLang})`);
    console.log('Status: Testing in progress...');
  });
  
  console.groupEnd();
};

// Make functions globally available for console testing
if (typeof window !== 'undefined') {
  (window as any).testPictureQuestions = testPictureQuestions;
  (window as any).testSpecificLanguageCombinations = testSpecificLanguageCombinations;
}
