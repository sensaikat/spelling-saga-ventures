
import { Word } from '../../../../utils/game';
import { Language } from '../../../../utils/game/types';
import { validateWordSubmission } from '../game-core/utils/wordValidator';

interface UseWordActionsProps {
  currentWord: Word | null;
  filteredWords: Word[];
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setIsCorrect: (isCorrect: boolean | null) => void;
  setShowResult: (show: boolean) => void;
  setShowHint: (show: boolean) => void;
  setGameCompleted: (completed: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  remainingLives: number;
  setRemainingLives: (lives: number) => void;
  recordWordAttempt?: (word: Word, correct: boolean, selectedLanguage: Language | string) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
  addPlayerPoints?: (points: number) => void;
  selectedLanguage?: Language | null | string;
}

export const useWordActions = (props: UseWordActionsProps) => {
  const {
    currentWord,
    filteredWords,
    currentWordIndex,
    setCurrentWordIndex,
    setUserInput,
    setIsCorrect,
    setShowResult,
    setShowHint,
    setGameCompleted,
    score,
    setScore,
    remainingLives,
    setRemainingLives,
    recordWordAttempt,
    updateProgress,
    addPlayerPoints,
    selectedLanguage
  } = props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord) return;
    
    // Get the user input from the form
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userInput = formData.get('wordInput')?.toString() || '';
    
    // Use the enhanced word validator for multilingual support
    const isCorrect = validateWordSubmission(userInput, currentWord, selectedLanguage);
    
    setIsCorrect(isCorrect);
    setShowResult(true);
    
    // Record analytics if function is provided
    if (selectedLanguage && recordWordAttempt) {
      recordWordAttempt(currentWord, isCorrect, selectedLanguage);
    }
    
    // Update score
    if (isCorrect) {
      setScore(score + 10);
      if (addPlayerPoints) {
        addPlayerPoints(2);
      }
    } else {
      setRemainingLives(remainingLives - 1);
    }
    
    // Update progress if function is provided
    if (currentWord.id && updateProgress) {
      updateProgress(currentWord.id, isCorrect);
    }
    
    // Move to next word after a delay
    setTimeout(() => {
      setShowResult(false);
      setShowHint(false);
      
      if (currentWordIndex >= filteredWords.length - 1 || remainingLives <= 1 && !isCorrect) {
        // Game over
        setGameCompleted(true);
      } else if (isCorrect || remainingLives > 1) {
        // Move to next word
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
      }
    }, 1500);
  };
  
  const handleSkip = () => {
    if (!currentWord) return;
    
    // Record as incorrect if function is provided
    if (selectedLanguage && recordWordAttempt) {
      recordWordAttempt(currentWord, false, selectedLanguage);
    }
    
    // Reduce lives
    setRemainingLives(remainingLives - 1);
    
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
  };

  return {
    handleSubmit,
    handleSkip
  };
};
