
import { useEffect } from 'react';
import { Word } from '../../../utils/game';
import { useGameAnalytics } from './game-state/useGameAnalytics';
import { useSpellingGameState } from './spelling-game/useSpellingGameState';
import { useSpellingGameActions } from './spelling-game/useSpellingGameActions';
import { useSpellingGameTimer } from './spelling-game/useSpellingGameTimer';

interface UseSpellingGameProps {
  words: Word[];
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

export const useSpellingGame = (
  words: Word[] = [],
  isAdventure: boolean = false,
  onAdventureComplete?: (score: number) => void
) => {
  const { recordWordAttempt } = useGameAnalytics();
  
  // Get game state from the hook
  const {
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
    setIncorrectWords,
    showGuide,
    guideMessage,
    showGuideWithMessage
  } = useSpellingGameState();

  // Get game actions from the hook
  const {
    currentWord,
    handleSubmit,
    handleSkip: handleSkipClick,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn
  } = useSpellingGameActions({
    words,
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
  
  // Get timer functionality from the hook
  const {
    timeRemaining,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer
  } = useSpellingGameTimer({
    handleSubmit,
    gameCompleted
  });
  
  // Set up audio control state
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showAlphabetHelper, setShowAlphabetHelper] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [inputStatus, setInputStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  const handleAlphabetHelperToggle = () => {
    setShowAlphabetHelper(!showAlphabetHelper);
  };

  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const start = target.selectionStart;
    setCursorPosition(start !== null ? start : target.value.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionEnd || e.target.value.length);
  };

  const handleCharacterClick = (char: string) => {
    const newInput = userInput.slice(0, cursorPosition) + char + userInput.slice(cursorPosition);
    setUserInput(newInput);
    setCursorPosition(cursorPosition + 1);
  };
  
  return {
    currentWord,
    userInput,
    isCorrect,
    showResult,
    showHint,
    gameCompleted,
    score,
    remainingLives,
    audioEnabled,
    showAlphabetHelper,
    isCheckingAnswer,
    timeRemaining,
    isTimerRunning,
    cursorPosition,
    inputStatus,
    correctWords,
    incorrectWords,
    showGuide,
    guideMessage,
    
    setUserInput,
    handleSubmit,
    handleSkipClick,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn,
    toggleAudio,
    handleAlphabetHelperToggle,
    handleInputSelect,
    handleInputChange,
    handleCharacterClick,
    startTimer,
    pauseTimer,
    resetTimer,
    showGuideWithMessage
  };
};

// Add missing useState import
import { useState } from 'react';
