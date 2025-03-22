
import { useEffect } from 'react';
import { Word, useGameStore } from '../../../../utils/game';
import { useGameAnalytics } from './useGameAnalytics';
import { useGameProgress } from './useGameProgress';
import { useGameDifficulty } from './useGameDifficulty';
import { useGameSession } from './useGameSession';
import { useGameState } from './useGameState';
import { useWordSubmission } from './useWordSubmission';
import { useGameTimer } from '../useGameTimer';
import { useLocalStorage } from '@/hooks/use-localStorage';
import { toast } from '@/hooks/use-toast';

export const useGameCore = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  const { selectedLanguage } = useGameStore();
  
  // Get timer settings from local storage
  const [timerSettings] = useLocalStorage('spelling-game-timer-settings', {
    enabled: true,
    defaultSeconds: 30,
    showWarnings: true,
    autoSkip: false
  });
  
  // Import functionality from other hooks
  const { recordWordAttempt } = useGameAnalytics();
  const { updateProgress, addPlayerPoints } = useGameProgress();
  const { filteredWords, setFilteredWords, difficultyLevel, handleDifficultyChange } = useGameDifficulty(
    initialWords,
    selectedLanguage,
    useGameStore.getState().currentWordList
  );
  
  const { initializeSession, checkGameLimits, navigate } = useGameSession(isAdventure);
  
  const {
    currentWordIndex,
    setCurrentWordIndex,
    userInput,
    setUserInput,
    isCorrect,
    setIsCorrect,
    showResult,
    setShowResult,
    gameCompleted,
    setGameCompleted,
    score,
    setScore,
    remainingLives,
    setRemainingLives,
    showHint,
    setShowHint,
    resetGameState,
    handlePlayAgain
  } = useGameState();
  
  // Initialize timer with settings
  const { 
    timeRemaining, 
    isRunning, 
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
        handleSkip();
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
  
  const currentWord = filteredWords[currentWordIndex];
  
  const { handleSubmit, handleSkip } = useWordSubmission({
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
    selectedLanguage
  });
  
  // Initial setup
  useEffect(() => {
    initializeSession();
  }, [
    selectedLanguage,
    navigate,
    isAdventure
  ]);
  
  // Reset timer when moving to a new word
  useEffect(() => {
    if (currentWord && !showResult && !gameCompleted) {
      resetTimer(timerSettings.defaultSeconds);
      if (timerSettings.enabled) {
        startTimer();
      }
    } else if (showResult || gameCompleted) {
      pauseTimer();
    }
  }, [currentWord, currentWordIndex, showResult, gameCompleted, timerSettings.enabled]);
  
  const handleShowHint = () => {
    setShowHint(true);
  };
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };
  
  // Wrapped handleSkip to also reset timer
  const handleSkipWithTimer = () => {
    handleSkip();
    resetTimer(timerSettings.defaultSeconds);
    if (timerSettings.enabled) {
      startTimer();
    }
  };
  
  // Wrapped handleSubmit to also handle timer
  const handleSubmitWithTimer = (e: React.FormEvent, input: string) => {
    handleSubmit(e, input);
    pauseTimer(); // Pause timer when checking answer
  };
  
  return {
    currentWord,
    userInput,
    setUserInput,
    isCorrect,
    showResult,
    gameCompleted,
    score,
    remainingLives,
    showHint,
    difficultyLevel,
    currentWordIndex,
    filteredWords,
    // Timer states
    timeRemaining,
    isTimerRunning: isRunning,
    // Handlers with timer integration
    handlePlayAgain: () => handlePlayAgain(checkGameLimits),
    handleSubmit: (e: React.FormEvent) => handleSubmitWithTimer(e, userInput),
    handleDifficultyChange,
    handleSkip: handleSkipWithTimer,
    handleShowHint,
    handleAdventureReturn
  };
};
