
import { useCallback } from 'react';

interface UseSubmissionEffectsProps {
  resultDelay?: number;
  setShowResult: (show: boolean) => void;
  setShowHint: (show: boolean) => void;
  setIsCheckingAnswer: (isChecking: boolean) => void;
  progressToNextWord: () => void;
  defaultDelay?: number;
}

/**
 * Hook for managing timed effects during submission
 * 
 * This hook handles:
 * - Timing for showing/hiding results
 * - Coordinating next word progression after delay
 */
export const useSubmissionEffects = ({
  resultDelay,
  setShowResult,
  setShowHint,
  setIsCheckingAnswer,
  progressToNextWord,
  defaultDelay = 1500
}: UseSubmissionEffectsProps) => {
  /**
   * Schedules UI updates and word progression after submission
   */
  const scheduleResultsAndProgression = useCallback(() => {
    // Move to next word after delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      setIsCheckingAnswer(false);
      
      progressToNextWord();
    }, resultDelay || defaultDelay);
  }, [
    resultDelay,
    defaultDelay,
    setShowResult,
    setShowHint,
    setIsCheckingAnswer,
    progressToNextWord
  ]);
  
  return {
    scheduleResultsAndProgression
  };
};
