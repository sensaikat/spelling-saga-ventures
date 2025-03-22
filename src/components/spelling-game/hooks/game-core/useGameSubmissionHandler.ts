
import { useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';

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
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord || isCheckingAnswer) return;
    
    setIsCheckingAnswer(true);
    
    // Get the user input from the form
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInputValue = formData.get('wordInput')?.toString() || '';
    
    const isCorrectAnswer = userInputValue.trim().toLowerCase() === currentWord.text.toLowerCase();
    
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
