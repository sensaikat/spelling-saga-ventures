
import { useState, useEffect, useCallback } from 'react';
import { Word } from '../../../utils/game';
import { useGameAnalytics } from './game-state/useGameAnalytics';
import { useGameProgress } from './game-state/useGameProgress';
import { useGameTimer } from './useGameTimer';
import { Language } from '../../../utils/game/types';

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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(3);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showAlphabetHelper, setShowAlphabetHelper] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [inputStatus, setInputStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState('');
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  
  const currentWord = words[currentWordIndex] || null;
  const { recordWordAttempt } = useGameAnalytics();
  const { updateProgress, addPlayerPoints } = useGameProgress();
  
  const handleTimeout = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const { 
    timeRemaining, 
    isRunning: isTimerRunning, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useGameTimer({
    enabled: true,
    initialTime: 60,
    onTimerEnd: handleTimeout,
  });
  
  // Filter words with appropriate field
  const filteredWords = words.filter(word => word);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord) return;
    
    // Get the user input from the form
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInput = formData.get('wordInput')?.toString() || '';
    
    const isCorrect = userInput.trim().toLowerCase() === currentWord.text.toLowerCase();
    
    setIsCorrect(isCorrect);
    setShowResult(true);
    
    // Update score
    if (isCorrect) {
      setScore(score + 10);
      addPlayerPoints(2);
      setCorrectWords(prev => [...prev, currentWord]);
    } else {
      setRemainingLives(remainingLives - 1);
      setIncorrectWords(prev => [...prev, currentWord]);
    }
    
    // Update progress
    if (currentWord.id) {
      updateProgress(currentWord.id, isCorrect);
    }
    
    // Move to next word after a delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      
      if (currentWordIndex >= filteredWords.length - 1 || (remainingLives <= 1 && !isCorrect)) {
        // Game over
        setGameCompleted(true);
      } else if (isCorrect || remainingLives > 1) {
        // Move to next word
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
      }
    }, 1500);
  };
  
  const handleSkip = () => {
    if (!currentWord) return;
    
    // Reduce lives
    setRemainingLives(remainingLives - 1);
    setIncorrectWords(prev => [...prev, currentWord]);
    
    // Check if game is over
    if (remainingLives <= 1) {
      setGameCompleted(true);
      return;
    }
    
    // Move to next word
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  };
  
  const handleShowHint = () => {
    setShowHint(true);
  };
  
  const handlePlayAgainClick = () => {
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
    resetTimer();
  };
  
  const handleAdventureReturn = () => {
    setGameCompleted(false);
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };
  
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
  
  const showGuideWithMessage = (message: string) => {
    setGuideMessage(message);
    setShowGuide(true);
    
    // Hide guide after a delay
    setTimeout(() => {
      setShowGuide(false);
    }, 5000);
  };
  
  return {
    currentWord,
    userInput,
    setUserInput,
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
    handleSubmit,
    handleSkipClick: handleSkip,
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
