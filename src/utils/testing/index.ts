
// Export all testing utilities
export { ButtonTester, globalButtonTester } from './buttonTester';
export { testAdventureSceneButtons } from './adventureSceneButtonTester';

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
    
    // Run language tests
    setTimeout(() => {
      (window as any).runAllTests?.();
    }, 1500);
  }
};

// Make consolidated test runner globally available
if (typeof window !== 'undefined') {
  (window as any).runAllAppTests = runAllAppTests;
}
