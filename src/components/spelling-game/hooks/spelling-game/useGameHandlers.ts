
import { Word } from '../../../../utils/game';
import { toast } from '@/components/ui/use-toast';

interface GameHandlersProps {
  currentWord: Word | null;
  isCheckingAnswer: boolean;
  moveToNextWord: () => boolean;
  recordCorrectAnswer: (word: Word) => void;
  recordIncorrectAnswer: (word: Word, userAnswer: string) => void;
  setGameFinished: (finished: boolean) => void;
  stopTimer: () => void;
  getEncouragement: () => string;
  getFunFact: () => string;
  getContextualHint: () => string;
  clearInput: () => void;
  showGuideWithMessage: (message: string) => void;
  hideGuide: () => void;
  remainingLives: number;
  isAdventure: boolean;
  onAdventureComplete?: (score: number) => void;
  score: number;
}

export const useGameHandlers = ({
  currentWord,
  isCheckingAnswer,
  moveToNextWord,
  recordCorrectAnswer,
  recordIncorrectAnswer,
  setGameFinished,
  stopTimer,
  getEncouragement,
  getFunFact,
  getContextualHint,
  clearInput,
  showGuideWithMessage,
  hideGuide,
  remainingLives,
  isAdventure,
  onAdventureComplete,
  score
}: GameHandlersProps) => {
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent, userInput: string, checkAnswer: (word: Word, input: string) => boolean) => {
    e.preventDefault();
    
    if (!currentWord || isCheckingAnswer) {
      return;
    }
    
    const result = checkAnswer(currentWord, userInput);
    
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
      showGuideWithMessage(`Great job! You've learned new words!`);
    }, 500);
  };
  
  // Handle adventure return
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };
  
  return {
    handleSubmit,
    handleSkipClick,
    handleGameComplete,
    handleAdventureReturn
  };
};
