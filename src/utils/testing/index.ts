
// Export all testing utilities
export { ButtonTester, globalButtonTester } from './buttonTester';
export { testAdventureSceneButtons } from './adventureSceneButtonTester';
export { testPictureQuestions, testSpecificLanguageCombinations } from './pictureQuestionTester';

// Consolidated test runner
export const runAllAppTests = () => {
  console.clear();
  console.log('🚀 Running Complete Application Test Suite...\n');
  
  // Import and run all tests
  if (typeof window !== 'undefined') {
    // Run UI tests
    (window as any).runUITests?.();
    
    // Run adventure-specific tests
    setTimeout(() => {
      (window as any).testAdventureButtons?.();
    }, 1000);
    
    // Run picture question tests
    setTimeout(() => {
      (window as any).testPictureQuestions?.();
    }, 1500);
    
    // Run language tests
    setTimeout(() => {
      (window as any).runAllTests?.();
      (window as any).testPictureQuestionValidation?.();
    }, 2000);
  }
};

// Make consolidated test runner globally available
if (typeof window !== 'undefined') {
  (window as any).runAllAppTests = runAllAppTests;
  
  // Add specific picture question test runner
  (window as any).runPictureQuestionTests = () => {
    console.clear();
    console.log('🖼️ Running Picture Question Tests...\n');
    (window as any).testPictureQuestions?.();
    (window as any).testSpecificLanguageCombinations?.();
    (window as any).testPictureQuestionValidation?.();
  };
}
