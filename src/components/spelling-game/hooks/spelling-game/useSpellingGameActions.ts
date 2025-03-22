
import { useCallback } from 'react';
import { Word } from '../../../../utils/game';
import { useGameProgress } from '../game-state/useGameProgress';

interface UseSpellingGameActionsProps {
  words: Word[];
  isAdventure: boolean;
  onAdventureComplete?: (score: number) => void;
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  isCorrect: boolean | null;
  setIsCorrect: (correct: boolean | null) => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  gameCompleted: boolean;
  setGameCompleted: (completed: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  remainingLives: number;
  setRemainingLives: (lives: number) => void;
  correctWords: Word[];
  setCorrectWords: (words: Word[]) => void;
  incorrectWords: Word[];
  setIncorrectWords: (words: Word[]) => void;
}

export const useSpellingGameActions = ({
  words,
  isAdventure,
  onAdventureComplete,
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
  setIncorrectWords
}: UseSpellingGameActionsProps) => {
  const { updateProgress, addPlayerPoints } = useGameProgress();
  const currentWord = words[currentWordIndex] || null;
  const filteredWords = words.filter(word => word);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord) return;
    
    // Get the user input from the form
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInputValue = formData.get('wordInput')?.toString() || '';
    
    const isCorrectAnswer = userInputValue.trim().toLowerCase() === currentWord.text.toLowerCase();
    
    setIsCorrect(isCorrectAnswer);
    setShowResult(true);
    
    // Update score
    if (isCorrectAnswer) {
      setScore(score + 10);
      addPlayerPoints(2);
      setCorrectWords([...correctWords, currentWord]);
    } else {
      setRemainingLives(remainingLives - 1);
      setIncorrectWords([...incorrectWords, currentWord]);
    }
    
    // Update progress
    if (currentWord.id) {
      updateProgress(currentWord.id, isCorrectAnswer);
    }
    
    // Move to next word after a delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      
      if (currentWordIndex >= filteredWords.length - 1 || (remainingLives <= 1 && !isCorrectAnswer)) {
        // Game over
        setGameCompleted(true);
      } else if (isCorrectAnswer || remainingLives > 1) {
        // Move to next word
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
      }
    }, 1500);
  }, [
    currentWord, 
    currentWordIndex, 
    filteredWords, 
    score, 
    remainingLives, 
    correctWords, 
    incorrectWords,
    updateProgress,
    addPlayerPoints,
    setIsCorrect,
    setShowResult,
    setScore,
    setRemainingLives,
    setCorrectWords,
    setIncorrectWords,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setShowHint
  ]);
  
  const handleSkip = useCallback(() => {
    if (!currentWord) return;
    
    // Reduce lives
    setRemainingLives(remainingLives - 1);
    setIncorrectWords([...incorrectWords, currentWord]);
    
    // Check if game is over
    if (remainingLives <= 1) {
      setGameCompleted(true);
      return;
    }
    
    // Move to next word
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  }, [
    currentWord,
    currentWordIndex,
    filteredWords,
    remainingLives,
    incorrectWords,
    setRemainingLives,
    setIncorrectWords,
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setShowHint
  ]);
  
  const handleShowHint = useCallback(() => {
    setShowHint(true);
  }, [setShowHint]);
  
  const handlePlayAgainClick = useCallback(() => {
    setGameCompleted(false);
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setRemainingLives(3);
    setCorrectWords([]);
    setIncorrectWords([]);
  }, [
    setGameCompleted,
    setCurrentWordIndex,
    setUserInput,
    setIsCorrect,
    setShowResult,
    setShowHint,
    setScore,
    setRemainingLives,
    setCorrectWords,
    setIncorrectWords
  ]);
  
  const handleAdventureReturn = useCallback(() => {
    setGameCompleted(false);
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  }, [onAdventureComplete, score, setGameCompleted]);
  
  return {
    currentWord,
    handleSubmit,
    handleSkip,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn
  };
};
