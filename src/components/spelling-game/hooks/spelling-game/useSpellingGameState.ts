
import { useState } from 'react';
import { Word } from '../../../../utils/game';

export const useSpellingGameState = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(3);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState('');
  
  const showGuideWithMessage = (message: string) => {
    setGuideMessage(message);
    setShowGuide(true);
    
    // Hide guide after a delay
    setTimeout(() => {
      setShowGuide(false);
    }, 5000);
  };
  
  return {
    // State
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
    setShowGuide,
    guideMessage,
    
    // Actions
    showGuideWithMessage
  };
};
