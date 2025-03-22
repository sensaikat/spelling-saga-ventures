
import { useCallback } from 'react';
import { useGameStateManagement } from '../useGameStateManagement';
import { useGameInitialization } from '../useGameInitialization';
import { useGameTimeHandling } from '../useGameTimeHandling';
import { useWordTracking } from '../useWordTracking';
import { useGameAnalytics } from '../../game-state/useGameAnalytics';
import { useGameSettings } from '../useGameSettings';

/**
 * Hook for integrating all game component hooks
 * 
 * This hook centralizes the initialization of all specialized game hooks
 * to provide a unified interface for the game core.
 * 
 * @param {Object} options - Configuration options
 * @returns Object containing all initialized game component hooks
 */
export const useGameComponents = ({
  words = [],
  initialTime,
  gameCompleted,
  onTimeout = () => {},
  customSettings = {}
}) => {
  // Initialize game settings
  const { settings } = useGameSettings({ 
    overrides: {
      ...(initialTime ? { initialTime } : {}),
      ...customSettings
    }
  });
  
  // Initialize game state hooks
  const {
    userInput,
    setUserInput,
    isCorrect,
    setIsCorrect,
    showResult,
    setShowResult,
    showHint,
    setShowHint,
    gameCompleted: internalGameCompleted,
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

  // Game initialization
  const {
    currentWord,
    setCurrentWord,
    wordCount,
    filteredWords
  } = useGameInitialization({ words });
  
  // Track correct and incorrect words
  const {
    correctWords,
    incorrectWords,
    trackWord,
    resetWordTracking
  } = useWordTracking();
  
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
    isGameCompleted: gameCompleted || internalGameCompleted,
    onTimeout
  });
  
  return {
    // Game settings
    settings,
    
    // Game state
    userInput,
    setUserInput,
    isCorrect,
    setIsCorrect,
    showResult,
    setShowResult,
    showHint,
    setShowHint,
    gameCompleted: internalGameCompleted,
    setGameCompleted,
    score,
    setScore,
    remainingLives,
    setRemainingLives,
    isCheckingAnswer,
    setIsCheckingAnswer,
    resetGameState,
    
    // Game initialization
    currentWord,
    setCurrentWord,
    wordCount,
    filteredWords,
    
    // Word tracking
    correctWords,
    incorrectWords,
    trackWord,
    resetWordTracking,
    
    // Analytics
    recordWordAttempt,
    incrementHintCounter,
    
    // Time handling
    timeRemaining,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
