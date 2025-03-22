
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Word, useGameStore } from '../../../../utils/game';
import { useGameAnalytics } from './useGameAnalytics';
import { useGameProgress } from './useGameProgress';
import { useGameDifficulty } from './useGameDifficulty';
import { useSubscriptionStore } from '../../../../utils/subscription';
import { useToast } from '../../../../hooks/use-toast';

export const useGameCore = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    checkAndUpdateStreak
  } = useGameStore();
  
  const { 
    remainingDailyGames,
    decrementDailyGames,
    checkAccess,
    limits
  } = useSubscriptionStore();
  
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
      return;
    }
    
    // Check if adventure mode is accessible
    if (isAdventure && !checkAccess('adventureMode')) {
      toast({
        title: "Premium Feature",
        description: "Adventure mode is only available for premium subscribers",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    // Update streak when starting a game
    checkAndUpdateStreak();
    
    // Check daily game limits
    if (!limits.gamePlay.unlimited && remainingDailyGames <= 0) {
      toast({
        title: "Daily limit reached",
        description: "You've used all your free games for today. Upgrade to play more!",
        variant: "destructive",
      });
      navigate('/subscription');
      return;
    }
    
    // Decrement daily game count
    if (!limits.gamePlay.unlimited) {
      decrementDailyGames();
    }
  }, [
    selectedLanguage, 
    selectedGameMode, 
    currentWordList, 
    navigate, 
    isAdventure, 
    checkAndUpdateStreak, 
    limits.gamePlay.unlimited,
    remainingDailyGames,
    decrementDailyGames,
    checkAccess,
    toast
  ]);
  
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
    // Check daily game limits before restarting
    if (!limits.gamePlay.unlimited && remainingDailyGames <= 0) {
      toast({
        title: "Daily limit reached",
        description: "You've used all your free games for today. Upgrade to play more!",
        variant: "destructive",
      });
      navigate('/subscription');
      return;
    }
    
    // Decrement daily game count if not unlimited
    if (!limits.gamePlay.unlimited) {
      decrementDailyGames();
    }
    
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
