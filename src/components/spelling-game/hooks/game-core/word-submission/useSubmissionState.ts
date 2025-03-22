
import { useState } from 'react';

/**
 * Hook for managing submission state during word validation
 * 
 * This hook centralizes state related to the submission process:
 * - Tracking local correctness state
 * - Managing the submission checking process
 */
export const useSubmissionState = () => {
  // Track whether answer is being checked
  const [isCheckingAnswer, setIsCheckingAnswer] = useState<boolean>(false);
  
  // Track local correctness state for word progression
  const [localIsCorrect, setLocalIsCorrect] = useState<boolean>(false);
  
  return {
    isCheckingAnswer,
    setIsCheckingAnswer,
    localIsCorrect,
    setLocalIsCorrect
  };
};
