
import { useState, useEffect, useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameInitialization } from './useGameInitialization';
import { useGameStateManagement } from './useGameStateManagement';
import { useGameSubmissionHandler } from './useGameSubmissionHandler';
import { useGameTimeHandling } from './useGameTimeHandling';
import { useWordTracking } from './useWordTracking';
import { useGameAnalytics } from '../game-state/useGameAnalytics';

/**
 * Props for the useGameCore hook
 * @interface GameCoreProps
 * @property {Word[]} words - Array of words for the game
 * @property {Language | string | null} selectedLanguage - Selected language
 * @property {Function} onGameComplete - Callback for game completion
 * @property {boolean} isAdventure - Whether in adventure mode
 * @property {Function} addPlayerPoints - Function to add player points
 * @property {Function} updateProgress - Function to update progress
 */
interface GameCoreProps {
  words: Word[];
  selectedLanguage?: Language | string | null;
  onGameComplete?: (score: number) => void;
  isAdventure?: boolean;
  addPlayerPoints?: (points: number) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
}

/**
 * Core hook for the spelling game
 * 
 * This hook integrates all the game functionality:
 * - Word initialization and management
 * - Game state management (score, lives, etc.)
 * - Game time handling (countdown timer)
 * - Word submission and validation
 * - Word tracking for statistics
 * - Game analytics
 * 
 * It serves as the central coordinator for the spelling game,
 * delegating specific functionality to specialized hooks.
 * 
 * @param {GameCoreProps} props - Game configuration
 * @returns Complete game state and control functions
 */
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
  
  /**
   * Shows a hint for the current word and records analytics
   */
  const handleShowHint = useCallback(() => {
    incrementHintCounter();
    setShowHint(true);
  }, [incrementHintCounter, setShowHint]);
  
  /**
   * Resets the game to start over
   */
  const handlePlayAgainClick = useCallback(() => {
    resetGameState();
    setCurrentWordIndex(0);
    resetWordTracking();
    resetTimer(60);
  }, [resetGameState, setCurrentWordIndex, resetWordTracking, resetTimer]);
  
  /**
   * Handles returning from adventure mode
   */
  const handleAdventureReturn = useCallback(() => {
    setGameCompleted(false);
    if (onGameComplete) {
      onGameComplete(score);
    }
  }, [onGameComplete, score, setGameCompleted]);
  
  /**
   * Handles form submission with analytics tracking
   */
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
