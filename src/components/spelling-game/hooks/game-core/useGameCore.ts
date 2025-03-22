
import { useState, useEffect, useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameInitialization } from './useGameInitialization';
import { useGameStateManagement } from './useGameStateManagement';
import { useGameWordActions } from './useGameWordActions';
import { useGameTimeHandling } from './useGameTimeHandling';
import { useGameAnalytics } from '../game-state/useGameAnalytics';

interface GameCoreProps {
  words: Word[];
  selectedLanguage: Language | string | null;
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
    setWordCount,
    filteredWords
  } = useGameInitialization(words);
  
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
    currentWordIndex,
    setCurrentWordIndex,
    remainingLives,
    setRemainingLives,
    correctWords,
    setCorrectWords,
    incorrectWords,
    setIncorrectWords
  } = useGameStateManagement();
  
  // Time handling
  const {
    timeRemaining,
    setTimeRemaining,
    isTimerRunning,
    setIsTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  } = useGameTimeHandling();
  
  // Game analytics
  const { recordWordAttempt, incrementHintCounter } = useGameAnalytics();
  
  // Word actions
  const {
    handleSubmit: wordSubmitHandler,
    handleSkip: wordSkipHandler,
    handleShowHint: wordHintHandler,
    handlePlayAgainClick: playAgainHandler,
    handleAdventureReturn: adventureReturnHandler
  } = useGameWordActions({
    words: filteredWords,
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
  });
  
  // Wrap word actions to include analytics
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord) return;
    
    // Get the user input from the form
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInputValue = formData.get('wordInput')?.toString() || '';
    
    const isCorrectAnswer = userInputValue.trim().toLowerCase() === currentWord.text.toLowerCase();
    
    // Record the attempt in analytics
    recordWordAttempt(currentWord, isCorrectAnswer, selectedLanguage);
    
    // Call the original handler
    wordSubmitHandler(e);
    
    // Update progress in the game store
    if (currentWord.id) {
      updateProgress(currentWord.id, isCorrectAnswer);
    }
    
    // Add points if correct
    if (isCorrectAnswer) {
      addPlayerPoints(2);
    }
  }, [currentWord, wordSubmitHandler, recordWordAttempt, selectedLanguage, updateProgress, addPlayerPoints]);
  
  const handleShowHint = useCallback(() => {
    incrementHintCounter();
    wordHintHandler();
  }, [incrementHintCounter, wordHintHandler]);
  
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
    handlePlayAgainClick: playAgainHandler,
    handleAdventureReturn: adventureReturnHandler,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
