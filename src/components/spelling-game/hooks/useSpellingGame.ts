
import { useState, useEffect } from 'react';
import { Word } from '../../../utils/game';
import { useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';
import { 
  useGameInput, 
  useGameTimer, 
  useGameLifecycle, 
  useGameHints,
  useGameGuide,
  useGameCulture
} from './spelling-game';
import { useGameHandlers } from './spelling-game/useGameHandlers';
import { useGameInitializer } from './spelling-game/useGameInitializer';

export const useSpellingGame = (
  initialWords: Word[] = [], 
  isAdventure: boolean = false,
  onAdventureComplete?: (score: number) => void
) => {
  const { selectedLanguage } = useGameStore();
  
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
  
  // Game timer hook
  const {
    startTimer,
    stopTimer,
    resetTimer
  } = useGameTimer(gameFinished);
  
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
    handleSkipClick,
    handleGameComplete,
    handleAdventureReturn
  } = useGameHandlers({
    currentWord,
    isCheckingAnswer,
    moveToNextWord,
    recordCorrectAnswer,
    recordIncorrectAnswer,
    setGameFinished,
    stopTimer,
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
  
  // Wrap the handleSubmit to include the current userInput
  const handleSubmit = (e: React.FormEvent) => {
    handleSubmitAction(e, userInput, checkAnswer);
  };
  
  // Game initializer
  useGameInitializer({
    startTimer,
    stopTimer,
    showGuideWithMessage,
    hideGuide,
    selectedLanguage,
    currentWord
  });
  
  // Handle playing again
  const handlePlayAgainClick = () => {
    resetGame();
    resetTimer();
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
    
    setUserInput,
    handleSubmit,
    handleSkipClick,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn,
    showGuideWithMessage
  };
};
