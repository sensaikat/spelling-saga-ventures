// Comprehensive button and interaction testing utility
export class ButtonTester {
  private testResults: { [key: string]: boolean } = {};
  private errors: string[] = [];

  // Test basic button functionality
  testButton(buttonElement: HTMLElement, buttonName: string): boolean {
    try {
      console.log(`Testing button: ${buttonName}`);
      
      // Check if button exists
      if (!buttonElement) {
        this.errors.push(`Button "${buttonName}" not found`);
        return false;
      }

      // Check if button is enabled
      if (buttonElement.hasAttribute('disabled')) {
        this.errors.push(`Button "${buttonName}" is disabled`);
        return false;
      }

      // Simulate click
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      
      buttonElement.dispatchEvent(clickEvent);
      
      console.log(`✅ Button "${buttonName}" clicked successfully`);
      this.testResults[buttonName] = true;
      return true;
    } catch (error) {
      console.error(`❌ Error testing button "${buttonName}":`, error);
      this.errors.push(`Button "${buttonName}" failed: ${error}`);
      this.testResults[buttonName] = false;
      return false;
    }
  }

  // Test tab functionality
  testTab(tabElement: HTMLElement, tabName: string): boolean {
    try {
      console.log(`Testing tab: ${tabName}`);
      
      if (!tabElement) {
        this.errors.push(`Tab "${tabName}" not found`);
        return false;
      }

      // Simulate tab click
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      
      tabElement.dispatchEvent(clickEvent);
      
      // Check if tab became active
      setTimeout(() => {
        const isActive = tabElement.getAttribute('data-state') === 'active' || 
                        tabElement.classList.contains('active') ||
                        tabElement.getAttribute('aria-selected') === 'true';
        
        if (isActive) {
          console.log(`✅ Tab "${tabName}" activated successfully`);
          this.testResults[tabName] = true;
        } else {
          console.warn(`⚠️ Tab "${tabName}" may not have activated properly`);
          this.testResults[tabName] = false;
        }
      }, 100);

      return true;
    } catch (error) {
      console.error(`❌ Error testing tab "${tabName}":`, error);
      this.errors.push(`Tab "${tabName}" failed: ${error}`);
      this.testResults[tabName] = false;
      return false;
    }
  }

  // Test all buttons on current page
  testAllButtons(): void {
    console.group('🧪 Testing All Buttons');
    
    const buttons = document.querySelectorAll('button');
    let testedCount = 0;
    
    buttons.forEach((button, index) => {
      const buttonText = button.textContent?.trim() || `Button-${index}`;
      const buttonId = button.id || `button-${index}`;
      
      // Skip hidden or invisible buttons
      if (button.offsetParent === null) {
        console.log(`⏭️ Skipping hidden button: ${buttonText}`);
        return;
      }
      
      this.testButton(button as HTMLElement, buttonText);
      testedCount++;
    });
    
    console.log(`\n📊 Tested ${testedCount} buttons`);
    console.groupEnd();
  }

  // Test all tabs on current page
  testAllTabs(): void {
    console.group('🧪 Testing All Tabs');
    
    const tabs = document.querySelectorAll('[role="tab"], .tab-trigger, [data-tab]');
    let testedCount = 0;
    
    tabs.forEach((tab, index) => {
      const tabText = tab.textContent?.trim() || `Tab-${index}`;
      const tabId = tab.id || `tab-${index}`;
      
      // Skip hidden tabs
      if ((tab as HTMLElement).offsetParent === null) {
        console.log(`⏭️ Skipping hidden tab: ${tabText}`);
        return;
      }
      
      this.testTab(tab as HTMLElement, tabText);
      testedCount++;
    });
    
    console.log(`\n📊 Tested ${testedCount} tabs`);
    console.groupEnd();
  }

  // Test form submissions
  testForms(): void {
    console.group('🧪 Testing Forms');
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
      const formId = form.id || `form-${index}`;
      console.log(`Testing form: ${formId}`);
      
      try {
        // Check if form has required fields
        const requiredFields = form.querySelectorAll('[required]');
        console.log(`Form ${formId} has ${requiredFields.length} required fields`);
        
        // Test form validation
        const isValid = form.checkValidity();
        console.log(`Form ${formId} validation: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        
        this.testResults[`form-${formId}`] = isValid;
      } catch (error) {
        console.error(`❌ Error testing form ${formId}:`, error);
        this.errors.push(`Form ${formId} failed: ${error}`);
      }
    });
    
    console.groupEnd();
  }

  // Generate test report
  generateReport() {
    console.group('📋 Test Results Summary');
    
    const totalTests = Object.keys(this.testResults).length;
    const passedTests = Object.values(this.testResults).filter(result => result).length;
    const failedTests = totalTests - passedTests;
    
    console.log(`\n📊 Overall Results:`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
    
    if (this.errors.length > 0) {
      console.group('❌ Errors Found:');
      this.errors.forEach(error => console.error(error));
      console.groupEnd();
    }
    
    console.log('\n🔍 Detailed Results:');
    Object.entries(this.testResults).forEach(([testName, result]) => {
      console.log(`${result ? '✅' : '❌'} ${testName}`);
    });
    
    console.groupEnd();
    
    return {
      totalTests,
      passedTests,
      failedTests,
      successRate: Math.round((passedTests / totalTests) * 100),
      errors: this.errors,
      results: this.testResults
    };
  }

  // Run comprehensive test suite
  runAllTests(): void {
    console.clear();
    console.log('🚀 Starting Comprehensive UI Test Suite...\n');
    
    // Reset previous results
    this.testResults = {};
    this.errors = [];
    
    // Run all tests
    this.testAllButtons();
    this.testAllTabs();
    this.testForms();
    
    // Generate report
    setTimeout(() => {
      this.generateReport();
    }, 500);
  }
}

// Create global tester instance
export const globalButtonTester = new ButtonTester();

// Make it available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).buttonTester = globalButtonTester;
  (window as any).runUITests = () => globalButtonTester.runAllTests();
  (window as any).testButtons = () => globalButtonTester.testAllButtons();
  (window as any).testTabs = () => globalButtonTester.testAllTabs();
  (window as any).testForms = () => globalButtonTester.testForms();
}
