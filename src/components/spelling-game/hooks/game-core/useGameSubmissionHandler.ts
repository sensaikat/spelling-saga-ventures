import { useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';

/**
 * Props for the useGameSubmissionHandler hook
 * @interface UseGameSubmissionHandlerProps
 * @property {Word | null} currentWord - Current word being played
 * @property {Word[]} filteredWords - Array of filtered valid words
 * @property {number} currentWordIndex - Current word index in the array
 * @property {Function} setCurrentWordIndex - Function to update current word index
 * @property {Function} setUserInput - Function to update user input
 * @property {Function} setIsCorrect - Function to update correctness state
 * @property {Function} setShowResult - Function to update result visibility
 * @property {Function} setShowHint - Function to update hint visibility
 * @property {Function} setGameCompleted - Function to update game completion state
 * @property {number} score - Current game score
 * @property {Function} setScore - Function to update score
 * @property {number} remainingLives - Remaining player lives
 * @property {Function} setRemainingLives - Function to update remaining lives
 * @property {Function} recordWordAttempt - Optional function to record word attempt analytics
 * @property {Function} updateProgress - Optional function to update progress
 * @property {Function} addPlayerPoints - Optional function to add player points
 * @property {Language | string | null} selectedLanguage - Current selected language
 * @property {Function} trackWord - Optional function to track word history
 * @property {boolean} isCheckingAnswer - Whether an answer is currently being checked
 * @property {Function} setIsCheckingAnswer - Function to update answer checking state
 * @property {number} resultDelay - Delay in ms before moving to the next word (default: 1500)
 */
interface UseGameSubmissionHandlerProps {
  currentWord: Word | null;
  filteredWords: Word[];
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setIsCorrect: (isCorrect: boolean | null) => void;
  setShowResult: (show: boolean) => void;
  setShowHint: (show: boolean) => void;
  setGameCompleted: (completed: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  remainingLives: number;
  setRemainingLives: (lives: number) => void;
  recordWordAttempt?: (word: Word, correct: boolean, selectedLanguage: Language | string) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
  addPlayerPoints?: (points: number) => void;
  selectedLanguage?: Language | null | string;
  trackWord?: (word: Word, isCorrect: boolean) => void;
  isCheckingAnswer: boolean;
  setIsCheckingAnswer: (isChecking: boolean) => void;
  resultDelay?: number;
}

/**
 * Normalizes text for comparison across different languages
 * Handles issues with diacritics, special characters, and other language-specific nuances
 */
const normalizeTextForComparison = (text: string, languageId?: string): string => {
  // Start with basic lowercase and trim
  let normalized = text.toLowerCase().trim();
  
  // For languages that don't differentiate certain characters in normal usage
  if (languageId === 'hi' || languageId === 'bn') {
    // In some Indic languages, remove nuqta dots and normalize similar looking characters
    normalized = normalized.replace(/\u093c/g, '');
  }
  
  // Remove spaces for languages where spaces might be optional or inconsistently used
  if (['zh', 'ja', 'th'].includes(languageId || '')) {
    normalized = normalized.replace(/\s+/g, '');
  }
  
  // Normalize special spacing for languages with complex combining marks
  normalized = normalized.normalize('NFC');
  
  return normalized;
};

/**
 * Hook for handling word submissions and skips
 * 
 * This hook centralizes the game logic for:
 * - Submitting answers and checking correctness
 * - Updating score based on correct/incorrect answers
 * - Managing player lives
 * - Tracking progress through words
 * - Transitioning between words
 * - Determining when the game is completed
 * - Recording analytics and progress updates
 * 
 * @param {UseGameSubmissionHandlerProps} props - Configuration and state setters
 * @returns Functions for handling submissions and skips
 */
export const useGameSubmissionHandler = ({
  currentWord,
  filteredWords,
  currentWordIndex,
  setCurrentWordIndex,
  setUserInput,
  setIsCorrect,
  setShowResult,
  setShowHint,
  setGameCompleted,
  score,
  setScore,
  remainingLives,
  setRemainingLives,
  recordWordAttempt,
  updateProgress,
  addPlayerPoints,
  selectedLanguage,
  trackWord,
  isCheckingAnswer,
  setIsCheckingAnswer,
  resultDelay = 1500
}: UseGameSubmissionHandlerProps) => {
  
  /**
   * Handles the submission of a word answer
   * Checks if the answer is correct and updates game state accordingly
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord || isCheckingAnswer) return;
    
    setIsCheckingAnswer(true);
    
    // Get the user input from the form
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInputValue = formData.get('wordInput')?.toString() || '';
    
    // Get language ID from current word or selected language
    const languageId = currentWord.language || 
                     (typeof selectedLanguage === 'object' && selectedLanguage ? 
                      selectedLanguage.id : 
                      typeof selectedLanguage === 'string' ? 
                      selectedLanguage : 'en');
    
    // Normalize both the expected answer and user input for proper comparison
    const normalizedAnswer = normalizeTextForComparison(currentWord.text, languageId);
    const normalizedInput = normalizeTextForComparison(userInputValue, languageId);
    
    const isCorrectAnswer = normalizedInput === normalizedAnswer;
    
    setIsCorrect(isCorrectAnswer);
    setShowResult(true);
    
    // Record analytics if function is provided
    if (selectedLanguage && recordWordAttempt) {
      recordWordAttempt(currentWord, isCorrectAnswer, selectedLanguage);
    }
    
    // Track the word for game stats
    if (trackWord) {
      trackWord(currentWord, isCorrectAnswer);
    }
    
    // Update score
    if (isCorrectAnswer) {
      setScore(score + 10);
      if (addPlayerPoints) {
        addPlayerPoints(2);
      }
    } else {
      setRemainingLives(remainingLives - 1);
    }
    
    // Update progress if function is provided
    if (currentWord.id && updateProgress) {
      updateProgress(currentWord.id, isCorrectAnswer);
    }
    
    // Move to next word after a delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      setIsCheckingAnswer(false);
      
      if (currentWordIndex >= filteredWords.length - 1 || remainingLives <= 1 && !isCorrectAnswer) {
        // Game over
        setGameCompleted(true);
      } else if (isCorrectAnswer || remainingLives > 1) {
        // Move to next word
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
      }
    }, resultDelay);
  }, [
    currentWord, 
    isCheckingAnswer, 
    filteredWords, 
    currentWordIndex, 
    remainingLives, 
    score, 
    selectedLanguage,
    resultDelay,
    setIsCheckingAnswer,
    setIsCorrect,
    setShowResult,
    recordWordAttempt,
    trackWord,
    setScore,
    addPlayerPoints,
    setRemainingLives,
    updateProgress,
    setShowHint,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput
  ]);
  
  /**
   * Handles skipping the current word
   * Reduces lives and moves to the next word
   */
  const handleSkip = useCallback(() => {
    if (!currentWord || isCheckingAnswer) return;
    
    // Record as incorrect if function is provided
    if (selectedLanguage && recordWordAttempt) {
      recordWordAttempt(currentWord, false, selectedLanguage);
    }
    
    // Track the word for game stats
    if (trackWord) {
      trackWord(currentWord, false);
    }
    
    // Reduce lives
    setRemainingLives(remainingLives - 1);
    
    // Check if game is over
    if (remainingLives <= 1) {
      setGameCompleted(true);
      return;
    }
    
    // Move to next word
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  }, [
    currentWord,
    isCheckingAnswer,
    selectedLanguage,
    recordWordAttempt,
    trackWord,
    remainingLives,
    currentWordIndex,
    filteredWords.length,
    setRemainingLives,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setShowHint
  ]);

  return {
    handleSubmit,
    handleSkip
  };
};
