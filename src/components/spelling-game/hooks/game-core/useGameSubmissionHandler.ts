
import { useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameSettings } from './useGameSettings';
import { useWordValidator } from './word-submission/useWordValidator';
import { useWordProgression } from './word-submission/useWordProgression';
import { useGameScoring } from './word-submission/useGameScoring';

/**
 * Props for the useGameSubmissionHandler hook
 * @interface UseGameSubmissionHandlerProps
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
 * This hook coordinates the different aspects of word submission:
 * - Validating user answers
 * - Updating game state based on correctness
 * - Managing progression to next word
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
  
  // Hook for validating word submissions
  const { validateSubmission } = useWordValidator({
    recordWordAttempt,
    trackWord,
    selectedLanguage
  });
  
  // Hook for updating score and lives
  const { handleCorrectAnswer, handleIncorrectAnswer } = useGameScoring({
    score,
    setScore,
    remainingLives,
    setRemainingLives,
    addPlayerPoints,
    updateProgress
  });
  
  // Local state for tracking current answer correctness for word progression
  const [localIsCorrect, setLocalIsCorrect] = useState<boolean>(false);
  
  // Hook for managing word progression
  const { progressToNextWord } = useWordProgression({
    filteredWords,
    currentWordIndex,
    setCurrentWordIndex,
    setUserInput,
    setShowHint,
    setGameCompleted,
    remainingLives,
    isCorrect: localIsCorrect
  });
  
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
    
    // Validate the submission
    const isCorrect = validateSubmission(userInput, currentWord);
    
    // Update UI state
    setIsCorrect(isCorrect);
    setShowResult(true);
    setLocalIsCorrect(isCorrect);
    
    // Update score or lives based on correctness
    if (isCorrect) {
      handleCorrectAnswer(currentWord.id);
    } else {
      handleIncorrectAnswer(currentWord.id);
    }
    
    // Move to next word after delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      setIsCheckingAnswer(false);
      
      progressToNextWord();
    }, resultDelay || settings.resultDisplayDuration);
  }, [
    currentWord,
    isCheckingAnswer,
    setIsCheckingAnswer,
    validateSubmission,
    setIsCorrect,
    setShowResult,
    setLocalIsCorrect,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    resultDelay,
    settings.resultDisplayDuration,
    setShowHint,
    progressToNextWord
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

// Add missing imports
import { useState } from 'react';
