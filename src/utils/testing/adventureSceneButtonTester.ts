
// Specific test utilities for Adventure Scene buttons
export const testAdventureSceneButtons = () => {
  console.group('🎮 Testing Adventure Scene Buttons');
  
  // Test Talk to Guide button
  const talkToGuideButton = document.querySelector('button:has(svg + span):contains("Talk to Guide")') ||
                           Array.from(document.querySelectorAll('button')).find(btn => 
                             btn.textContent?.includes('Talk to Guide'));
  
  if (talkToGuideButton) {
    console.log('Found "Talk to Guide" button');
    try {
      (talkToGuideButton as HTMLElement).click();
      console.log('✅ Talk to Guide button clicked successfully');
    } catch (error) {
      console.error('❌ Error clicking Talk to Guide button:', error);
    }
  } else {
    console.warn('⚠️ Talk to Guide button not found');
  }
  
  // Test Find Hidden Objects button
  const findObjectsButton = document.querySelector('button:has(svg + span):contains("Find Hidden Objects")') ||
                           Array.from(document.querySelectorAll('button')).find(btn => 
                             btn.textContent?.includes('Find Hidden Objects'));
  
  if (findObjectsButton) {
    console.log('Found "Find Hidden Objects" button');
    try {
      (findObjectsButton as HTMLElement).click();
      console.log('✅ Find Hidden Objects button clicked successfully');
    } catch (error) {
      console.error('❌ Error clicking Find Hidden Objects button:', error);
    }
  } else {
    console.warn('⚠️ Find Hidden Objects button not found');
  }
  
  // Test magic item buttons
  const magicButtons = document.querySelectorAll('[data-magic-item], .magic-item-button');
  console.log(`Found ${magicButtons.length} magic item buttons`);
  
  magicButtons.forEach((button, index) => {
    try {
      (button as HTMLElement).click();
      console.log(`✅ Magic item button ${index + 1} clicked successfully`);
    } catch (error) {
      console.error(`❌ Error clicking magic item button ${index + 1}:`, error);
    }
  });
  
  console.groupEnd();
};

// Make it globally available
if (typeof window !== 'undefined') {
  (window as any).testAdventureButtons = testAdventureSceneButtons;
}
