
import { useState } from 'react';

export const useGameStateManagement = () => {
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  return {
    userInput,
    setUserInput,
    score,
    setScore,
    currentIndex,
    setCurrentIndex,
    isCorrect,
    setIsCorrect,
    showResult,
    setShowResult,
    remainingLives,
    setRemainingLives,
    showHint,
    setShowHint,
    isCheckingAnswer,
    setIsCheckingAnswer,
    gameCompleted,
    setGameCompleted
  };
};
