
import { useEffect } from 'react';
import { Word, useGameStore } from '../../../../utils/game';
import { useGameAnalytics } from './useGameAnalytics';
import { useGameProgress } from './useGameProgress';
import { useGameDifficulty } from './useGameDifficulty';
import { useGameSession } from './useGameSession';
import { useGameState } from './useGameState';
import { useWordSubmission } from './useWordSubmission';

export const useGameCore = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  const { selectedLanguage } = useGameStore();
  
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
  
  const handleShowHint = () => {
    setShowHint(true);
  };
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
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
    handlePlayAgain: () => handlePlayAgain(checkGameLimits),
    handleSubmit: (e: React.FormEvent) => handleSubmit(e, userInput),
    handleDifficultyChange,
    handleSkip,
    handleShowHint,
    handleAdventureReturn
  };
};
