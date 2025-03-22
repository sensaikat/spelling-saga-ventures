
import { useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameSettings } from './useGameSettings';

/**
 * Props for the useGameSubmissionHandler hook
 * @interface UseGameSubmissionHandlerProps
 * @property {Word | null} currentWord - Current word being played
 * @property {Word[]} filteredWords - Array of filtered words for the game
 * @property {number} currentWordIndex - Index of current word
 * @property {Function} setCurrentWordIndex - Function to set current word index
 * @property {Function} setUserInput - Function to clear user input
 * @property {Function} setIsCorrect - Function to set correctness state
 * @property {Function} setShowResult - Function to show result
 * @property {Function} setShowHint - Function to reset hint display
 * @property {Function} setGameCompleted - Function to mark game as completed
 * @property {number} score - Current score
 * @property {Function} setScore - Function to update score
 * @property {number} remainingLives - Remaining lives
 * @property {Function} setRemainingLives - Function to update lives
 * @property {Function} recordWordAttempt - Analytics recorder function
 * @property {Function} updateProgress - Progress update function
 * @property {Function} addPlayerPoints - Function to add player points
 * @property {Language | string | null} selectedLanguage - Selected language
 * @property {Function} trackWord - Function to track word for history
 * @property {boolean} isCheckingAnswer - Whether currently checking answer
 * @property {Function} setIsCheckingAnswer - Function to set checking state
 * @property {number} resultDelay - Delay for showing result before moving on
 */
interface UseGameSubmissionHandlerProps {
  currentWord: Word | null;
  filteredWords: Word[];
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setIsCorrect: (correct: boolean | null) => void;
  setShowResult: (show: boolean) => void;
  setShowHint: (show: boolean) => void;
  setGameCompleted: (completed: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  remainingLives: number;
  setRemainingLives: (lives: number) => void;
  recordWordAttempt?: (word: Word, correct: boolean, selectedLanguage: Language | string | null) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
  addPlayerPoints?: (points: number) => void;
  selectedLanguage?: Language | string | null;
  trackWord: (word: Word, isCorrect: boolean) => void;
  isCheckingAnswer: boolean;
  setIsCheckingAnswer: (isChecking: boolean) => void;
  resultDelay?: number;
}

/**
 * Hook for handling word submission and validation
 * 
 * This hook provides functions for:
 * - Submitting answers
 * - Validating correctness
 * - Handling skipped words
 * - Updating game state based on answers
 * 
 * @param {UseGameSubmissionHandlerProps} props - Submission handling configuration
 * @returns Submission handler functions
 */
export const useGameSubmissionHandler = (props: UseGameSubmissionHandlerProps) => {
  const {
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
    resultDelay
  } = props;
  
  // Get game settings
  const { settings } = useGameSettings();
  
  /**
   * Validates and processes a user submission
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord || isCheckingAnswer) return;
    
    setIsCheckingAnswer(true);
    
    // Get the form data
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInput = formData.get('wordInput')?.toString() || '';
    
    // Check answer
    const isCorrect = userInput.trim().toLowerCase() === currentWord.text.trim().toLowerCase();
    
    setIsCorrect(isCorrect);
    setShowResult(true);
    
    // Record analytics if available
    if (recordWordAttempt && currentWord) {
      recordWordAttempt(currentWord, isCorrect, selectedLanguage || null);
    }
    
    // Track word for history
    if (currentWord) {
      trackWord(currentWord, isCorrect);
    }
    
    // Update score
    if (isCorrect) {
      setScore(score + settings.correctAnswerPoints);
      if (addPlayerPoints) {
        addPlayerPoints(settings.playerPointsIncrement);
      }
    } else {
      setRemainingLives(remainingLives - 1);
    }
    
    // Update progress if function is provided
    if (currentWord.id && updateProgress) {
      updateProgress(currentWord.id, isCorrect);
    }
    
    // Move to next word after delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      setIsCheckingAnswer(false);
      
      if (currentWordIndex >= filteredWords.length - 1 || (remainingLives <= 1 && !isCorrect)) {
        // Game over
        setGameCompleted(true);
      } else if (isCorrect || remainingLives > 1) {
        // Move to next word
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
      }
    }, resultDelay || settings.resultDisplayDuration);
  }, [
    currentWord,
    isCheckingAnswer,
    setIsCheckingAnswer,
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
    settings,
    resultDelay
  ]);
  
  /**
   * Skips the current word and updates game state
   */
  const handleSkip = useCallback(() => {
    if (!currentWord) return;
    
    // Record as incorrect if analytics function is provided
    if (recordWordAttempt) {
      recordWordAttempt(currentWord, false, selectedLanguage || null);
    }
    
    // Track word for history
    trackWord(currentWord, false);
    
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
    remainingLives,
    currentWordIndex,
    filteredWords.length,
    recordWordAttempt,
    selectedLanguage,
    trackWord,
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
