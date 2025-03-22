
import { useState } from 'react';

interface UseGameStateManagementProps {
  initialLives?: number;
}

export const useGameStateManagement = ({ initialLives = 3 }: UseGameStateManagementProps = {}) => {
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [remainingLives, setRemainingLives] = useState(initialLives);
  const [showHint, setShowHint] = useState(false);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Helper function to reset all state
  const resetGameState = () => {
    setUserInput('');
    setScore(0);
    setIsCorrect(null);
    setShowResult(false);
    setRemainingLives(initialLives);
    setShowHint(false);
    setIsCheckingAnswer(false);
    setGameCompleted(false);
  };
  
  return {
    // State values
    userInput,
    setUserInput,
    score,
    setScore,
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
    setGameCompleted,
    
    // Helper functions
    resetGameState
  };
};
