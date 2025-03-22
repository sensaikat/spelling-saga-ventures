
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Word, useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';
import { learningAnalytics } from '../../../services/analytics/learningAnalytics';

export const useGameState = (
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void,
  initialWords: Word[] = []
) => {
  const navigate = useNavigate();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    updateWordProgress,
    addPoints,
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
  const [hintsUsed, setHintsUsed] = useState(0);
  const [filteredWords, setFilteredWords] = useState<Word[]>(initialWords);
  const [difficultyLevel, setDifficultyLevel] = useState('all');
  
  // For analytics
  const wordStartTimeRef = useRef<number>(Date.now());
  const wordHintsUsedRef = useRef<number>(0);
  
  const maxHints = 3;
  
  // Reset analytics data when moving to a new word
  useEffect(() => {
    wordStartTimeRef.current = Date.now();
    wordHintsUsedRef.current = 0;
  }, [currentWordIndex]);
  
  // Initial setup
  useEffect(() => {
    if (!isAdventure && (!selectedLanguage || !selectedGameMode || !currentWordList)) {
      navigate('/');
    }
    
    // Update streak when starting a game
    checkAndUpdateStreak();
  }, [selectedLanguage, selectedGameMode, currentWordList, navigate, isAdventure, checkAndUpdateStreak]);
  
  // Filter words by difficulty
  useEffect(() => {
    if (selectedLanguage && currentWordList) {
      let words = currentWordList.words;
      if (difficultyLevel !== 'all') {
        words = words.filter(word => word.difficulty === difficultyLevel);
      }
      setFilteredWords(words);
      setCurrentWordIndex(0);
      resetGameState();
    }
  }, [selectedLanguage, currentWordList, difficultyLevel]);
  
  const currentWord = filteredWords[currentWordIndex];
  
  const resetGameState = () => {
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setGameCompleted(false);
    setScore(0);
    setRemainingLives(3);
    setHintsUsed(0);
    setShowHint(false);
    
    // Reset word timer
    wordStartTimeRef.current = Date.now();
    wordHintsUsedRef.current = 0;
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
      const attemptDuration = Date.now() - wordStartTimeRef.current;
      learningAnalytics.recordWordAttempt(
        currentWord,
        correct,
        attemptDuration,
        wordHintsUsedRef.current,
        selectedLanguage
      );
    }
    
    updateWordProgress(currentWord.id, correct);
    
    if (correct) {
      setScore(prev => prev + 10);
      addPoints(10);
      
      toast({
        title: "Correct!",
        description: `+10 points added to your score.`,
        duration: 1500,
      });
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
  
  const handleDifficultyChange = (level: string) => {
    setDifficultyLevel(level);
  };
  
  const handleSkip = () => {
    if (!currentWord) return;
    
    // Record skipped word as incorrect for analytics
    if (selectedLanguage) {
      const attemptDuration = Date.now() - wordStartTimeRef.current;
      learningAnalytics.recordWordAttempt(
        currentWord,
        false,
        attemptDuration,
        wordHintsUsedRef.current,
        selectedLanguage
      );
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
    if (hintsUsed < maxHints) {
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
      
      // Increment hint counter for analytics
      wordHintsUsedRef.current += 1;
    }
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
    hintsUsed,
    maxHints,
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
