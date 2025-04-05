
import { useCallback } from 'react';
import { Word } from '../../../utils/game';
import { useGameAnalytics } from './game-state/useGameAnalytics';
import { validateWordSubmission } from './game-core/utils/wordValidator';

interface UseWordSubmissionProps {
  currentWord: Word | null;
  selectedLanguage: string | null;
  userInput: string;
  setUserInput: (input: string) => void;
  setIsCorrect: (isCorrect: boolean | null) => void;
  setShowResult: (show: boolean) => void;
  setScore: (score: number) => void;
  score: number;
  setCorrectWords: (words: Word[]) => void;
  correctWords: Word[];
  setIncorrectWords: (words: Word[]) => void;
  incorrectWords: Word[];
  setRemainingLives: (lives: number) => void;
  remainingLives: number;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
  addPlayerPoints?: (points: number) => void;
}

export const useWordSubmission = ({
  currentWord,
  selectedLanguage,
  userInput,
  setUserInput,
  setIsCorrect,
  setShowResult,
  setScore,
  score,
  setCorrectWords,
  correctWords,
  setIncorrectWords,
  incorrectWords,
  setRemainingLives,
  remainingLives,
  updateProgress = () => {},
  addPlayerPoints = () => {}
}: UseWordSubmissionProps) => {
  const { recordWordAttempt } = useGameAnalytics();

  // Handle form submission
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    
    if (!currentWord) return;
    
    // Get the user input from the form
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInputValue = formData.get('wordInput')?.toString() || '';
    
    // Use the enhanced word validator - now with better Bengali support
    const isCorrectAnswer = validateWordSubmission(userInputValue, currentWord, selectedLanguage);
    
    // Record the attempt in analytics
    recordWordAttempt(currentWord, isCorrectAnswer, selectedLanguage);
    
    // Update UI
    setIsCorrect(isCorrectAnswer);
    setShowResult(true);
    
    // Update score and progress
    if (isCorrectAnswer) {
      // Fix: Use direct value instead of a function for setScore
      const newScore = score + 10;
      setScore(newScore);
      addPlayerPoints(2);
      setCorrectWords([...correctWords, currentWord]);
    } else {
      // Fix: Use direct value instead of a function for setRemainingLives
      const newLives = remainingLives - 1;
      setRemainingLives(newLives);
      setIncorrectWords([...incorrectWords, currentWord]);
    }
    
    // Update progress in game store
    if (currentWord.id) {
      updateProgress(currentWord.id, isCorrectAnswer);
    }
  }, [
    currentWord,
    selectedLanguage,
    correctWords,
    incorrectWords,
    score,
    remainingLives,
    setIsCorrect,
    setShowResult,
    setScore,
    addPlayerPoints,
    setCorrectWords,
    setRemainingLives,
    setIncorrectWords,
    updateProgress,
    recordWordAttempt
  ]);

  return {
    handleSubmit
  };
};
