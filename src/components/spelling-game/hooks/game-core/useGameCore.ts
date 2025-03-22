
import { useCallback } from 'react';
import { Word } from '../../../../utils/game';
import { Language } from '../../../../utils/game/types';
import { useGameInitialization } from './useGameInitialization';
import { useGameStateManagement } from './useGameStateManagement';
import { useGameTimeHandling } from './useGameTimeHandling';
import { useGameWordActions } from './useGameWordActions';
import { useGameAnalytics } from '../game-state/useGameAnalytics';

interface UseGameCoreProps {
  words: Word[];
  selectedLanguage: Language | null | string;
  onGameComplete: (score: number) => void;
  isAdventure?: boolean;
  addPlayerPoints: (points: number) => void;
  updateProgress: (wordId: string, isCorrect: boolean) => void;
}

interface GameCore {
  currentWord: Word | null;
  userInput: string;
  setUserInput: (input: string) => void;
  score: number;
  wordCount: number;
  currentIndex: number;
  isCorrect: boolean | null;
  showResult: boolean;
  remainingLives: number;
  showHint: boolean;
  isCheckingAnswer: boolean;
  gameCompleted: boolean;
  isTimerRunning: boolean;
  timeRemaining: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSkipClick: () => void;
  handleShowHint: () => void;
  handlePlayAgainClick: () => void;
}

export const useGameCore = (props: UseGameCoreProps): GameCore => {
  const { words, selectedLanguage, onGameComplete, isAdventure, addPlayerPoints, updateProgress } = props;
  
  // Initialize game
  const { 
    currentWord, 
    setCurrentWord, 
    wordCount, 
    setWordCount, 
    filteredWords 
  } = useGameInitialization(words);
  
  // Game state management
  const {
    userInput,
    setUserInput,
    score,
    setScore,
    currentIndex,
    setCurrentIndex,
    isCorrect,
    setIsCorrect,
    showResult,
    setShowResult,
    remainingLives,
    setRemainingLives,
    showHint,
    setShowHint,
    isCheckingAnswer,
    setIsCheckingAnswer,
    gameCompleted,
    setGameCompleted
  } = useGameStateManagement();
  
  const { recordWordAttempt } = useGameAnalytics();
  
  // Handle timeout callback
  const handleTimeout = useCallback(() => {
    if (currentWord) {
      const formEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(formEvent);
    }
  }, [currentWord]);
  
  // Game timer
  const {
    isTimerRunning,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer
  } = useGameTimeHandling(handleTimeout);
  
  // Game word actions
  const { handleSubmit, handleSkip } = useGameWordActions(
    currentWord,
    filteredWords,
    currentIndex,
    setCurrentIndex,
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
    selectedLanguage
  );
  
  // Show hint action
  const handleShowHint = useCallback(() => {
    setShowHint(true);
  }, [setShowHint]);
  
  // Play again action
  const handlePlayAgainClick = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setWordCount(filteredWords.length);
    setRemainingLives(3);
    setGameCompleted(false);
    setUserInput('');
    setIsCorrect(null);
    setShowHint(false);
    
    if (filteredWords.length > 0) {
      setCurrentWord(filteredWords[0]);
    }
  }, [filteredWords, setCurrentIndex, setScore, setWordCount, setRemainingLives, setGameCompleted, setUserInput, setIsCorrect, setShowHint, setCurrentWord]);
  
  return {
    currentWord,
    userInput,
    setUserInput,
    score,
    wordCount,
    currentIndex,
    isCorrect,
    showResult,
    remainingLives,
    showHint,
    isCheckingAnswer,
    gameCompleted,
    isTimerRunning,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer,
    handleSubmit,
    handleSkipClick: handleSkip,
    handleShowHint,
    handlePlayAgainClick
  };
};
