import { useState, useEffect, useCallback } from 'react';
import { Word } from '../../../utils/game';
import { useGameAnalytics } from './game-state/useGameAnalytics';
import { useWordActions } from './game-state/useWordActions';
import { useGameTimer } from './game-state/useGameTimer';
import { useWordSubmission } from './game-state/useWordSubmission';
import { Language } from '../../../utils/game/types';
import { usePlayer } from '../../../../contexts/player/PlayerContext';

interface UseSpellingGameProps {
  words: Word[];
  initialLives?: number;
  selectedLanguage: Language | null | string;
}

export const useSpellingGame = ({
  words,
  initialLives = 3,
  selectedLanguage
}: UseSpellingGameProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(initialLives);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showAlphabetHelper, setShowAlphabetHelper] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const { addPlayerPoints } = usePlayer();
  
  const currentWord = words[currentWordIndex];
  const filteredWords = words.filter(word => word.language === (typeof selectedLanguage === 'string' ? selectedLanguage : selectedLanguage?.id));
  
  const { recordWordAttempt } = useGameAnalytics();
  const { updateProgress } = useWordActions();
  
  const { 
    isTimerRunning, 
    timeRemaining, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useGameTimer({
    onTimeUp: () => {
      if (currentWord) {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent, userInput);
      }
    },
  });
  
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
    setRemainingLives(initialLives);
    resetTimer();
  };
  
  const handleAdventureReturn = () => {
    setGameCompleted(false);
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
    setCursorPosition(e.target.value.length);
  };

  const handleCharacterClick = (char: string) => {
    const input = userInput;
    const newCursorPosition = cursorPosition + 1;
    const output = input.slice(0, cursorPosition) + char + input.slice(cursorPosition);
    setUserInput(output);
    setCursorPosition(newCursorPosition);
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
    handleSubmit: (e: React.FormEvent) => handleSubmit(e, userInput),
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
    resetTimer
  };
};
