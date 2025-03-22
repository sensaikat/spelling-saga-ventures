
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Word, useGameStore } from '../../../../utils/game';
import { useGameAnalytics } from './useGameAnalytics';
import { useGameProgress } from './useGameProgress';
import { useGameDifficulty } from './useGameDifficulty';

export const useGameCore = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  const navigate = useNavigate();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    checkAndUpdateStreak
  } = useGameStore();
  
  // Game state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  
  // Import functionality from other hooks
  const { recordWordAttempt } = useGameAnalytics();
  const { updateProgress, addPlayerPoints } = useGameProgress();
  const { filteredWords, setFilteredWords, difficultyLevel, handleDifficultyChange } = useGameDifficulty(
    initialWords,
    selectedLanguage,
    currentWordList
  );
  
  const currentWord = filteredWords[currentWordIndex];
  
  // Initial setup
  useEffect(() => {
    if (!isAdventure && (!selectedLanguage || !selectedGameMode || !currentWordList)) {
      navigate('/');
    }
    
    // Update streak when starting a game
    checkAndUpdateStreak();
  }, [selectedLanguage, selectedGameMode, currentWordList, navigate, isAdventure, checkAndUpdateStreak]);
  
  const resetGameState = () => {
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setGameCompleted(false);
    setScore(0);
    setRemainingLives(3);
    setShowHint(false);
  };
  
  const handlePlayAgain = () => {
    setCurrentWordIndex(0);
    resetGameState();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord) return;
    
    const correct = userInput.toLowerCase().trim() === currentWord.text.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    // Record analytics data
    if (selectedLanguage) {
      recordWordAttempt(currentWord, correct, selectedLanguage);
    }
    
    updateProgress(currentWord.id, correct);
    
    if (correct) {
      setScore(prev => prev + 10);
      addPlayerPoints(10);
    } else {
      setRemainingLives(prev => prev - 1);
      
      if (remainingLives <= 1) {
        setTimeout(() => {
          setGameCompleted(true);
        }, 1500);
        return;
      }
    }
    
    setTimeout(() => {
      if (currentWordIndex < filteredWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowResult(false);
        setShowHint(false);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };
  
  const handleSkip = () => {
    if (!currentWord) return;
    
    // Record skipped word as incorrect for analytics
    if (selectedLanguage) {
      recordWordAttempt(currentWord, false, selectedLanguage);
    }
    
    setRemainingLives(prev => prev - 1);
    setIsCorrect(false);
    setShowResult(true);
    
    if (remainingLives <= 1) {
      setTimeout(() => {
        setGameCompleted(true);
      }, 1500);
      return;
    }
    
    setTimeout(() => {
      if (currentWordIndex < filteredWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowResult(false);
        setShowHint(false);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };
  
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
    handlePlayAgain,
    handleSubmit,
    handleDifficultyChange,
    handleSkip,
    handleShowHint,
    handleAdventureReturn
  };
};
