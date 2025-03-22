
import { useCallback, useEffect } from 'react';
import { Word } from '../../../../utils/game';
import { 
  useSubmissionHandler, 
  useWordNavigation,
  useGameLifecycleActions
} from './actions';

interface UseSpellingGameActionsProps {
  words: Word[];
  isAdventure: boolean;
  onAdventureComplete?: (score: number) => void;
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  isCorrect: boolean | null;
  setIsCorrect: (correct: boolean | null) => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  gameCompleted: boolean;
  setGameCompleted: (completed: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  remainingLives: number;
  setRemainingLives: (lives: number) => void;
  correctWords: Word[];
  setCorrectWords: (words: Word[]) => void;
  incorrectWords: Word[];
  setIncorrectWords: (words: Word[]) => void;
}

export const useSpellingGameActions = ({
  words,
  isAdventure,
  onAdventureComplete,
  currentWordIndex,
  setCurrentWordIndex,
  userInput,
  setUserInput,
  isCorrect,
  setIsCorrect,
  showResult,
  setShowResult,
  showHint,
  setShowHint,
  gameCompleted,
  setGameCompleted,
  score,
  setScore,
  remainingLives,
  setRemainingLives,
  correctWords,
  setCorrectWords,
  incorrectWords,
  setIncorrectWords
}: UseSpellingGameActionsProps) => {
  // Get current word and filtered words list
  const currentWord = words[currentWordIndex] || null;
  const filteredWords = words.filter(word => word);
  
  // Submission handling
  const { handleSubmit } = useSubmissionHandler({
    currentWord,
    score,
    remainingLives,
    correctWords,
    incorrectWords,
    setIsCorrect,
    setShowResult,
    setScore,
    setCorrectWords,
    setIncorrectWords,
    setRemainingLives
  });
  
  // Word navigation
  const { handleSkip, handleNextWord } = useWordNavigation({
    currentWord,
    filteredWords,
    currentWordIndex,
    remainingLives,
    incorrectWords,
    setCurrentWordIndex,
    setUserInput,
    setShowHint,
    setGameCompleted,
    setRemainingLives,
    setIncorrectWords,
    setShowResult,
    setIsCorrect
  });
  
  // Game lifecycle actions
  const { 
    handlePlayAgainClick, 
    handleAdventureReturn,
    handleShowHint
  } = useGameLifecycleActions({
    isAdventure,
    onAdventureComplete,
    score,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setIsCorrect,
    setShowResult,
    setShowHint,
    setScore,
    setRemainingLives,
    setCorrectWords,
    setIncorrectWords
  });
  
  // Handle moving to next word after showing result
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        handleNextWord(isCorrect || false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect, handleNextWord]);
  
  return {
    currentWord,
    handleSubmit,
    handleSkip,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn
  };
};
