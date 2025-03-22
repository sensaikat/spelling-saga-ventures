
import { useState, useEffect, useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameInitialization } from './useGameInitialization';
import { useGameStateManagement } from './useGameStateManagement';
import { useGameSubmissionHandler } from './useGameSubmissionHandler';
import { useGameTimeHandling } from './useGameTimeHandling';
import { useWordTracking } from './useWordTracking';
import { useGameAnalytics } from '../game-state/useGameAnalytics';
import { useGameEvents } from './useGameEvents';
import { useGameReset } from './useGameReset';
import { useGameSettings } from './useGameSettings';

/**
 * Props for the useGameCore hook
 * @interface GameCoreProps
 * @property {Word[]} words - Array of words for the game
 * @property {Language | string | null} selectedLanguage - Selected language
 * @property {Function} onGameComplete - Callback for game completion
 * @property {boolean} isAdventure - Whether in adventure mode
 * @property {Function} addPlayerPoints - Function to add player points
 * @property {Function} updateProgress - Function to update progress
 * @property {Partial<GameSettings>} gameSettings - Optional custom game settings
 */
interface GameCoreProps {
  words: Word[];
  selectedLanguage?: Language | string | null;
  onGameComplete?: (score: number) => void;
  isAdventure?: boolean;
  addPlayerPoints?: (points: number) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
  gameSettings?: Partial<import('./useGameSettings').GameSettings>;
}

/**
 * Core hook for the spelling game
 * 
 * This hook integrates all the game functionality by composing specialized hooks
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
  updateProgress = () => {},
  gameSettings = {}
}: GameCoreProps) => {
  // Get centralized game settings
  const { settings } = useGameSettings({ overrides: gameSettings });
  
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
  } = useGameStateManagement({ 
    initialLives: settings.initialLives 
  });

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
  
  // Time handling
  const {
    timeRemaining,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  } = useGameTimeHandling({
    initialTime: settings.initialTime,
    isGameCompleted: gameCompleted,
    onTimeout: () => setGameCompleted(true)
  });
  
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
    setIsCheckingAnswer,
    resultDelay: settings.resultDisplayDuration
  });
  
  // Game events
  const { handleAdventureReturn } = useGameEvents({
    onGameComplete,
    score,
    setGameCompleted,
    isAdventure,
    addPlayerPoints
  });
  
  // Game reset
  const { handlePlayAgainClick } = useGameReset({
    resetGameState,
    resetWordTracking,
    setCurrentWordIndex,
    resetTimer,
    initialTime: settings.initialTime
  });
  
  /**
   * Shows a hint for the current word and records analytics
   */
  const handleShowHint = useCallback(() => {
    incrementHintCounter();
    setShowHint(true);
  }, [incrementHintCounter, setShowHint]);
  
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
