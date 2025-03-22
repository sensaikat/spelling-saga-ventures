
import { useCallback, useState } from 'react';
import { Word, Language } from '../../../../../utils/game';
import { useGameSubmissionHandler } from '../useGameSubmissionHandler';
import { useGameEvents } from '../useGameEvents';
import { useGameReset } from '../useGameReset';

/**
 * Hook for centralizing game action handlers
 * 
 * This hook coordinates all actions that can occur in the game:
 * - Word submission
 * - Word skipping
 * - Showing hints
 * - Game completion
 * - Game reset
 * 
 * @param {Object} options - Game action configuration
 * @returns Object containing all game action handlers
 */
export const useGameActions = ({
  gameComponents,
  selectedLanguage,
  onGameComplete,
  isAdventure,
  addPlayerPoints,
  updateProgress
}) => {
  // Extract required game components
  const {
    currentWord,
    filteredWords,
    userInput,
    setUserInput,
    setIsCorrect,
    setShowResult,
    setShowHint,
    setGameCompleted,
    score,
    setScore,
    remainingLives,
    setRemainingLives,
    resetGameState,
    trackWord,
    recordWordAttempt,
    resetWordTracking,
    incrementHintCounter,
    resetTimer,
    settings,
    isCheckingAnswer,
    setIsCheckingAnswer
  } = gameComponents;
  
  // Track current word index
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
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
  
  return {
    currentWordIndex,
    setCurrentWordIndex,
    handleSubmit,
    handleSkip: wordSkipHandler,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn
  };
};
