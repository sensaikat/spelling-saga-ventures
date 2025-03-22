
import { useCallback } from 'react';
import { Word } from '../../../../../utils/game';
import { useGameProgress } from '../../game-state/useGameProgress';

interface UseSubmissionHandlerProps {
  currentWord: Word | null;
  score: number;
  remainingLives: number;
  correctWords: Word[];
  incorrectWords: Word[];
  setIsCorrect: (correct: boolean | null) => void;
  setShowResult: (show: boolean) => void;
  setScore: (score: number) => void;
  addPlayerPoints?: (points: number) => void;
  setCorrectWords: (words: Word[]) => void;
  setIncorrectWords: (words: Word[]) => void;
  setRemainingLives: (lives: number) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
}

export const useSubmissionHandler = ({
  currentWord,
  score,
  remainingLives,
  correctWords,
  incorrectWords,
  setIsCorrect,
  setShowResult,
  setScore,
  addPlayerPoints = () => {},
  setCorrectWords,
  setIncorrectWords,
  setRemainingLives,
  updateProgress = () => {}
}: UseSubmissionHandlerProps) => {
  const { updateProgress: gameProgressUpdate, addPlayerPoints: gameAddPlayerPoints } = useGameProgress();
  
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
      gameAddPlayerPoints(2);
      setCorrectWords([...correctWords, currentWord]);
    } else {
      setRemainingLives(remainingLives - 1);
      setIncorrectWords([...incorrectWords, currentWord]);
    }
    
    // Update progress
    if (currentWord.id) {
      updateProgress(currentWord.id, isCorrectAnswer);
      gameProgressUpdate(currentWord.id, isCorrectAnswer);
    }
  }, [
    currentWord, 
    score, 
    remainingLives, 
    correctWords, 
    incorrectWords,
    setIsCorrect,
    setShowResult,
    setScore,
    addPlayerPoints,
    gameAddPlayerPoints,
    setCorrectWords,
    setIncorrectWords,
    setRemainingLives,
    updateProgress,
    gameProgressUpdate
  ]);
  
  return { handleSubmit };
};
