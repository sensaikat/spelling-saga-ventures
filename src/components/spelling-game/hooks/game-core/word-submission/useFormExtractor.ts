
import { useCallback } from 'react';

/**
 * Hook for extracting form data from submission events
 * 
 * This hook handles extracting and normalizing user input from form submissions
 */
export const useFormExtractor = () => {
  /**
   * Extracts user input from a form submission event
   */
  const extractUserInput = useCallback((e: React.FormEvent): string => {
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    return formData.get('wordInput')?.toString() || '';
  }, []);
  
  return {
    extractUserInput
  };
};
