
import { useState } from 'react';

/**
 * Hook for managing UI-related game state
 * 
 * This hook centralizes all UI-specific state variables:
 * - Hint visibility
 * - Answer checking state
 * 
 * @returns UI state variables and setters
 */
export const useGameUIState = () => {
  const [showHint, setShowHint] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  
  /**
   * Resets all UI state variables to their initial values
   */
  const resetUIState = () => {
    setShowHint(false);
    setIsCheckingAnswer(false);
  };
  
  return {
    // State values
    showHint,
    setShowHint,
    isCheckingAnswer,
    setIsCheckingAnswer,
    
    // Helper functions
    resetUIState
  };
};
