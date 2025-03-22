
import { Word } from '../../../../utils/game';

interface UseGameStatusProps {
  setCurrentWord: (word: Word | null) => void;
  setCurrentIndex: (index: number) => void;
  setScore: (score: number) => void;
  setWordCount?: (count: number) => void;
  setRemainingLives: (lives: number) => void;
  setGameCompleted: (completed: boolean) => void;
  setUserInput: (input: string) => void;
  setIsCorrect: (isCorrect: boolean | null) => void;
  filteredWords: Word[];
}

export const useGameStatus = (props: UseGameStatusProps) => {
  const {
    setCurrentWord,
    setCurrentIndex,
    setScore,
    setWordCount,
    setRemainingLives,
    setGameCompleted,
    setUserInput,
    setIsCorrect,
    filteredWords
  } = props;

  const handlePlayAgainClick = () => {
    // Reset game state
    setCurrentIndex(0);
    setScore(0);
    if (setWordCount) {
      setWordCount(filteredWords.length);
    }
    setRemainingLives(3);
    setGameCompleted(false);
    setUserInput('');
    setIsCorrect(null);
    
    // Set initial word
    if (filteredWords.length > 0) {
      setCurrentWord(filteredWords[0]);
    } else {
      setCurrentWord(null);
    }
  };
  
  return {
    handlePlayAgainClick
  };
};
