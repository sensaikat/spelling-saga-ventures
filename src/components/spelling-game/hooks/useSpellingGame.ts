
import { useState, useEffect } from 'react';
import { Word } from '../../utils/game';
import { useGameStore } from '../../utils/game';
import { toast } from '@/components/ui/use-toast';
import { 
  useGameInput, 
  useGameTimer, 
  useGameLifecycle, 
  useGameHints,
  useGameGuide,
  useGameCulture
} from './spelling-game';

export const useSpellingGame = (
  initialWords: Word[] = [], 
  isAdventure: boolean = false,
  onAdventureComplete?: (score: number) => void
) => {
  const { selectedLanguage } = useGameStore();
  
  // Game lifecycle hook
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
  } = useGameLifecycle(initialWords);
  
  // Game input hook
  const {
    userInput,
    inputStatus,
    isCheckingAnswer,
    setUserInput,
    checkAnswer,
    clearInput
  } = useGameInput();
  
  // Game timer hook
  const {
    startTimer,
    stopTimer,
    resetTimer
  } = useGameTimer();
  
  // Game hints hook
  const {
    showHint,
    handleShowHint,
    maxHints,
    hintsUsed
  } = useGameHints();
  
  // Game guide hook
  const {
    showGuide,
    showGuideWithMessage,
    hideGuide
  } = useGameGuide();
  
  // Game culture hook (new!)
  const {
    getRandomPrompt,
    getEncouragement,
    getFunFact,
    getContextualHint
  } = useGameCulture(selectedLanguage);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord || isCheckingAnswer) {
      return;
    }
    
    const result = await checkAnswer(userInput, currentWord.text);
    
    if (result) {
      // Correct answer
      recordCorrectAnswer(currentWord);
      
      // Show cultural encouragement
      toast({
        title: "Correct!",
        description: getEncouragement(),
        variant: "default",
        duration: 1500,
      });
      
      // Display cultural fun fact occasionally
      if (Math.random() > 0.7) {
        showGuideWithMessage(getFunFact());
        setTimeout(hideGuide, 3000);
      }
      
      // Move to next word or finish game
      const hasNextWord = moveToNextWord();
      if (!hasNextWord) {
        handleGameComplete();
      }
    } else {
      // Incorrect answer
      if (remainingLives > 1) {
        recordIncorrectAnswer(currentWord, userInput);
        
        // Show cultural hint
        toast({
          title: "Try again!",
          description: getContextualHint(),
          variant: "destructive",
          duration: 2000,
        });
      } else {
        handleGameComplete();
      }
    }
    
    clearInput();
  };
  
  // Handle skipping current word
  const handleSkipClick = () => {
    if (!currentWord) return;
    
    recordIncorrectAnswer(currentWord, "skipped");
    
    toast({
      title: "Word skipped",
      description: `The correct spelling was "${currentWord.text}"`,
      variant: "default",
      duration: 2000,
    });
    
    const hasNextWord = moveToNextWord();
    if (!hasNextWord) {
      handleGameComplete();
    }
    
    clearInput();
  };
  
  // Handle game completion
  const handleGameComplete = () => {
    setGameFinished(true);
    stopTimer();
    
    if (isAdventure && onAdventureComplete) {
      onAdventureComplete(score);
    }
    
    // Show cultural completion message
    setTimeout(() => {
      showGuideWithMessage(`Great job! You've learned ${correctWords.length} words in ${selectedLanguage?.name || 'this language'}!`);
    }, 500);
  };
  
  // Handle playing again
  const handlePlayAgainClick = () => {
    resetGame();
    resetTimer();
    clearInput();
  };
  
  // Handle adventure return
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };
  
  useEffect(() => {
    startTimer();
    
    // Introduce the cultural context
    if (selectedLanguage && currentWord) {
      setTimeout(() => {
        showGuideWithMessage(`Welcome to learning ${selectedLanguage.name}! Let's explore words related to ${currentWord.difficulty === 'easy' ? 'everyday items' : 'cultural elements'}!`);
      }, 1000);
      
      setTimeout(hideGuide, 4000);
    }
    
    return () => {
      stopTimer();
    };
  }, []);
  
  return {
    currentWord,
    userInput,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    isCheckingAnswer,
    inputStatus,
    showHint,
    remainingLives,
    showGuide,
    hintsUsed,
    maxHints,
    
    setUserInput,
    handleSubmit,
    handleSkipClick,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn,
    showGuideWithMessage
  };
};
