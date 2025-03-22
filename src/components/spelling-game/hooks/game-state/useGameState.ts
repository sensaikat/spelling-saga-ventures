
import { useState } from 'react';
import { Word } from '../../../../utils/game';

export const useGameState = () => {
  // Game state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  
  const resetGameState = () => {
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setGameCompleted(false);
    setScore(0);
    setRemainingLives(3);
    setShowHint(false);
  };
  
  const handlePlayAgain = (checkGameLimits: () => boolean) => {
    // Check if we can play another game
    if (!checkGameLimits()) {
      return;
    }
    
    setCurrentWordIndex(0);
    resetGameState();
  };
  
  return {
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
  };
};
