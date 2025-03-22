
import { useState } from 'react';
import { Word } from '../../../utils/game';
import { 
  useGameInput, 
  useGameTimer, 
  useGameLifecycle, 
  useGameHints,
  useGameGuide
} from './spelling-game';

export const useSpellingGame = (
  words: Word[],
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void
) => {
  // Use our smaller, focused hooks
  const {
    userInput,
    setUserInput,
    inputStatus,
    setInputStatus,
    isCheckingAnswer,
    setIsCheckingAnswer,
    checkAnswer
  } = useGameInput();
  
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
  } = useGameLifecycle(words);
  
  const { elapsedTime, resetTimer } = useGameTimer(gameFinished);
  
  const {
    showHint,
    showHintButton,
    handleShowHint,
    resetHints
  } = useGameHints();
  
  const {
    showGuide,
    guideMessage,
    showGuideWithMessage
  } = useGameGuide();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingAnswer(true);
    
    if (!currentWord) return;
    
    const isCorrect = checkAnswer(currentWord, userInput);
    
    setInputStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      recordCorrectAnswer(currentWord);
    } else {
      recordIncorrectAnswer(currentWord, userInput);
    }
    
    setUserInput('');
    
    setTimeout(() => {
      setIsCheckingAnswer(false);
      setInputStatus(null);
      moveToNextWord();
    }, 1500);
  };
  
  const handlePlayAgainClick = () => {
    resetGame();
    resetTimer();
    resetHints();
    setUserInput('');
  };
  
  const handleSkipClick = () => {
    if (!currentWord) return;
    setUserInput('');
    moveToNextWord();
  };
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };

  return {
    // State
    currentWord,
    userInput,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    elapsedTime,
    isCheckingAnswer,
    inputStatus,
    showHint,
    showHintButton,
    remainingLives,
    showGuide,
    guideMessage,
    
    // Actions
    setUserInput,
    handleSubmit,
    handlePlayAgainClick,
    handleSkipClick,
    handleShowHint,
    handleAdventureReturn,
    showGuideWithMessage
  };
};
