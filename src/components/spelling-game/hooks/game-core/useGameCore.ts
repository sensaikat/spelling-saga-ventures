
import { useState, useEffect, useCallback } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameInitialization } from './useGameInitialization';
import { useGameStateManagement } from './useGameStateManagement';
import { useGameWordActions } from './useGameWordActions';
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
    currentIndex: currentWordIndex,
    setCurrentIndex: setCurrentWordIndex,
    remainingLives,
    setRemainingLives,
    isCheckingAnswer,
    setIsCheckingAnswer
  } = useGameStateManagement();

  // Track correct and incorrect words
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  
  // Game analytics
  const { recordWordAttempt, incrementHintCounter } = useGameAnalytics();
  
  // Time handling - using a simplified approach for this fix
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);
  
  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);
  
  const resetTimer = useCallback((newTime: number = 60) => {
    setTimeRemaining(newTime);
    setIsTimerRunning(false);
  }, []);
  
  const handleTimeout = useCallback(() => {
    setGameCompleted(true);
  }, [setGameCompleted]);
  
  // Word actions
  const {
    handleSubmit: wordSubmitHandler,
    handleSkip: wordSkipHandler
  } = useGameWordActions(
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
  );
  
  // Additional handlers
  const handleShowHint = useCallback(() => {
    incrementHintCounter();
    setShowHint(true);
  }, [incrementHintCounter, setShowHint]);
  
  const handlePlayAgainClick = useCallback(() => {
    setGameCompleted(false);
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setRemainingLives(3);
    setCorrectWords([]);
    setIncorrectWords([]);
    resetTimer(60);
  }, [
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setIsCorrect,
    setShowResult,
    setShowHint,
    setScore,
    setRemainingLives,
    resetTimer
  ]);
  
  const handleAdventureReturn = useCallback(() => {
    setGameCompleted(false);
    if (onGameComplete) {
      onGameComplete(score);
    }
  }, [onGameComplete, score, setGameCompleted]);
  
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
