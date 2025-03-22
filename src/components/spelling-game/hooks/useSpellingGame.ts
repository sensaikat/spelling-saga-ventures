
import { useState, useEffect } from 'react';
import { Word } from '../../../utils/game';
import { useGameStore } from '../../../utils/game';
import { toast } from '@/hooks/use-toast';
import { 
  useGameInput, 
  useGameTimer as useGameTimerOld, 
  useGameLifecycle, 
  useGameHints,
  useGameGuide,
  useGameCulture
} from './spelling-game';
import { useGameHandlers } from './spelling-game/useGameHandlers';
import { useGameInitializer } from './spelling-game/useGameInitializer';
import { useGameTimer } from './useGameTimer';
import { useLocalStorage } from '@/hooks/use-localStorage';

export const useSpellingGame = (
  initialWords: Word[] = [], 
  isAdventure: boolean = false,
  onAdventureComplete?: (score: number) => void
) => {
  const { selectedLanguage } = useGameStore();
  
  // Get timer settings from local storage
  const [timerSettings] = useLocalStorage('spelling-game-timer-settings', {
    enabled: true,
    defaultSeconds: 30,
    showWarnings: true,
    autoSkip: false
  });
  
  // Game lifecycle hook
  const {
    currentWord,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    remainingLives,
    resetGame,
    moveToNextWord,
    recordCorrectAnswer,
    recordIncorrectAnswer,
    setGameFinished
  } = useGameLifecycle(initialWords);
  
  // Game input hook
  const {
    userInput,
    inputStatus,
    isCheckingAnswer,
    setUserInput,
    checkAnswer,
    clearInput
  } = useGameInput();
  
  // Old timer hook (for compatibility)
  const {
    startTimer: startTimerOld,
    stopTimer: stopTimerOld,
    resetTimer: resetTimerOld
  } = useGameTimerOld(gameFinished);
  
  // New timer hook
  const { 
    timeRemaining, 
    isRunning: isTimerRunning, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useGameTimer({
    defaultTime: timerSettings.defaultSeconds,
    isEnabled: timerSettings.enabled,
    onTimeUp: () => {
      if (timerSettings.autoSkip) {
        // Auto-skip to next word
        toast({
          title: "Time's up!",
          description: "Moving to the next word...",
        });
        handleSkipClick();
      } else {
        // Just notify the user
        toast({
          title: "Time's up!",
          description: "Please submit your answer or skip this word.",
          variant: "destructive",
        });
      }
    }
  });
  
  // Game hints hook
  const {
    showHint,
    handleShowHint,
    maxHints,
    hintsUsed
  } = useGameHints();
  
  // Game guide hook
  const {
    showGuide,
    showGuideWithMessage,
    hideGuide
  } = useGameGuide();
  
  // Game culture hook
  const {
    getRandomPrompt,
    getEncouragement,
    getFunFact,
    getContextualHint
  } = useGameCulture(selectedLanguage);
  
  // Game handlers
  const {
    handleSubmit: handleSubmitAction,
    handleSkipClick: handleSkipAction,
    handleGameComplete,
    handleAdventureReturn
  } = useGameHandlers({
    currentWord,
    isCheckingAnswer,
    moveToNextWord,
    recordCorrectAnswer,
    recordIncorrectAnswer,
    setGameFinished,
    stopTimer: stopTimerOld,
    getEncouragement,
    getFunFact,
    getContextualHint,
    clearInput,
    showGuideWithMessage,
    hideGuide,
    remainingLives,
    isAdventure,
    onAdventureComplete,
    score
  });
  
  // Wrap the handleSubmit to include the current userInput and timer
  const handleSubmit = (e: React.FormEvent) => {
    handleSubmitAction(e, userInput, checkAnswer);
    pauseTimer(); // Pause the timer when checking answer
  };
  
  // Wrap the handleSkip to also reset the timer
  const handleSkipClick = () => {
    handleSkipAction();
    
    // Reset and restart timer for next word
    if (timerSettings.enabled && !gameFinished) {
      resetTimer(timerSettings.defaultSeconds);
      startTimer();
    }
  };
  
  // Game initializer
  useGameInitializer({
    startTimer: startTimerOld,
    stopTimer: stopTimerOld,
    showGuideWithMessage,
    hideGuide,
    selectedLanguage,
    currentWord
  });
  
  // Timer management based on game state
  useEffect(() => {
    if (currentWord && !isCheckingAnswer && !gameFinished) {
      if (timerSettings.enabled) {
        startTimer();
      }
    } else if (isCheckingAnswer || gameFinished) {
      pauseTimer();
    }
  }, [currentWord, isCheckingAnswer, gameFinished, timerSettings.enabled]);
  
  // Handle playing again with timer reset
  const handlePlayAgainClick = () => {
    resetGame();
    resetTimerOld();
    resetTimer(timerSettings.defaultSeconds);
    clearInput();
  };
  
  return {
    currentWord,
    userInput,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    isCheckingAnswer,
    inputStatus,
    showHint,
    remainingLives,
    showGuide,
    hintsUsed,
    maxHints,
    timeRemaining,
    isTimerRunning,
    
    setUserInput,
    handleSubmit,
    handleSkipClick,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn,
    showGuideWithMessage
  };
};
