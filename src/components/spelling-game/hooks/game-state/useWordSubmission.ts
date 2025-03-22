
import { Word } from '../../../../utils/game';

interface UseWordSubmissionProps {
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
  recordWordAttempt: (word: Word, correct: boolean, selectedLanguage: string) => void;
  updateProgress: (wordId: string, isCorrect: boolean) => void;
  addPlayerPoints: (points: number) => void;
  selectedLanguage: any;
}

export const useWordSubmission = ({
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
}: UseWordSubmissionProps) => {
  
  const handleSubmit = (e: React.FormEvent, userInput: string) => {
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
  
  return {
    handleSubmit,
    handleSkip
  };
};
