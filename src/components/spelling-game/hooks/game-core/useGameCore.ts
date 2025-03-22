
import { useState, useEffect, useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameInitialization } from './useGameInitialization';
import { useGameStateManagement } from './useGameStateManagement';
import { useGameSubmissionHandler } from './useGameSubmissionHandler';
import { useGameTimeHandling } from './useGameTimeHandling';
import { useWordTracking } from './useWordTracking';
import { useGameAnalytics } from '../game-state/useGameAnalytics';

interface GameCoreProps {
  words: Word[];
  selectedLanguage?: Language | string | null;
  onGameComplete?: (score: number) => void;
  isAdventure?: boolean;
  addPlayerPoints?: (points: number) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
}

export const useGameCore = ({
  words = [],
  selectedLanguage = null,
  onGameComplete = () => {},
  isAdventure = false,
  addPlayerPoints = () => {},
  updateProgress = () => {}
}: GameCoreProps) => {
  // Initialize game state
  const {
    currentWord,
    setCurrentWord,
    wordCount,
    filteredWords
  } = useGameInitialization({ words });
  
  // Game state management
  const {
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
    isCheckingAnswer,
    setIsCheckingAnswer,
    resetGameState
  } = useGameStateManagement();

  // Track correct and incorrect words
  const {
    correctWords,
    incorrectWords,
    trackWord,
    resetWordTracking
  } = useWordTracking();
  
  // Current word index to track progress
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Game analytics
  const { recordWordAttempt, incrementHintCounter } = useGameAnalytics();
  
  // Game submission handler
  const {
    handleSubmit: wordSubmitHandler,
    handleSkip: wordSkipHandler
  } = useGameSubmissionHandler({
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
    setIsCheckingAnswer
  });
  
  // Time handling
  const {
    timeRemaining,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  } = useGameTimeHandling({
    initialTime: 60,
    isGameCompleted: gameCompleted,
    onTimeout: () => setGameCompleted(true)
  });
  
  // Additional handlers
  const handleShowHint = useCallback(() => {
    incrementHintCounter();
    setShowHint(true);
  }, [incrementHintCounter, setShowHint]);
  
  const handlePlayAgainClick = useCallback(() => {
    resetGameState();
    setCurrentWordIndex(0);
    resetWordTracking();
    resetTimer(60);
  }, [resetGameState, setCurrentWordIndex, resetWordTracking, resetTimer]);
  
  const handleAdventureReturn = useCallback(() => {
    setGameCompleted(false);
    if (onGameComplete) {
      onGameComplete(score);
    }
  }, [onGameComplete, score, setGameCompleted]);
  
  // Wrap word actions to include analytics
  const handleSubmit = useCallback((e: React.FormEvent) => {
    wordSubmitHandler(e);
  }, [wordSubmitHandler]);
  
  // Set current word based on index
  useEffect(() => {
    if (filteredWords.length > 0 && currentWordIndex < filteredWords.length) {
      setCurrentWord(filteredWords[currentWordIndex]);
    }
  }, [currentWordIndex, filteredWords, setCurrentWord]);
  
  return {
    // Game state
    currentWord,
    userInput,
    setUserInput,
    isCorrect,
    showResult,
    showHint,
    gameCompleted,
    score,
    wordCount,
    currentWordIndex,
    remainingLives,
    correctWords,
    incorrectWords,
    timeRemaining,
    isTimerRunning,
    
    // Game actions
    handleSubmit,
    handleSkip: wordSkipHandler,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
