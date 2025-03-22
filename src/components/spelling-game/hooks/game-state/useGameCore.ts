
import { useState, useEffect, useRef } from 'react';
import { Word } from '../../../../utils/game';
import { Language } from '../../../../utils/game/types';
import { useWordActions } from './useWordActions';
import { useGameStatus } from './useGameStatus';
import { useInputHandler } from './useInputHandler';
import { useGameTimer } from './useGameTimer';
import { useGameAnalytics } from './useGameAnalytics';

interface UseGameCoreProps {
  words: Word[];
  selectedLanguage: Language | null | string;
  onGameComplete: (score: number) => void;
  isAdventure?: boolean;
  addPlayerPoints: (points: number) => void;
  updateProgress: (wordId: string, isCorrect: boolean) => void;
}

interface GameCore {
  currentWord: Word | null;
  userInput: string;
  setUserInput: (input: string) => void;
  score: number;
  wordCount: number;
  currentIndex: number;
  isCorrect: boolean | null;
  showResult: boolean;
  remainingLives: number;
  showHint: boolean;
  isCheckingAnswer: boolean;
  gameCompleted: boolean;
  isTimerRunning: boolean;
  timeRemaining: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSkipClick: () => void;
  handleShowHint: () => void;
  handlePlayAgainClick: () => void;
}

export const useGameCore = (props: UseGameCoreProps): GameCore => {
  const { words, selectedLanguage, onGameComplete, isAdventure, addPlayerPoints, updateProgress } = props;
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const filteredWords = words.filter(word => word.text.length > 0);
  
  const { recordWordAttempt } = useGameAnalytics();
  
  useEffect(() => {
    if (filteredWords.length > 0) {
      setCurrentWord(filteredWords[0]);
    }
  }, [filteredWords]);
  
  const handleTimeout = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const { 
    isTimerRunning, 
    timeRemaining, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useGameTimer({
    onTimeUp: handleTimeout,
  });
  
  const { handleSubmit, handleSkip } = useWordActions({
    currentWord,
    filteredWords,
    currentWordIndex: currentIndex,
    setCurrentWordIndex: setCurrentIndex,
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
  
  const { handlePlayAgainClick } = useGameStatus({
    setCurrentWord,
    setCurrentIndex,
    setScore,
    setWordCount,
    setRemainingLives,
    setGameCompleted,
    setUserInput,
    setIsCorrect,
    filteredWords
  });
  
  const handleShowHint = () => {
    setShowHint(true);
  };
  
  return {
    currentWord,
    userInput,
    setUserInput,
    score,
    wordCount,
    currentIndex,
    isCorrect,
    showResult,
    remainingLives,
    showHint,
    isCheckingAnswer,
    gameCompleted,
    isTimerRunning,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer,
    handleSubmit,
    handleSkipClick: handleSkip,
    handleShowHint,
    handlePlayAgainClick
  };
};
