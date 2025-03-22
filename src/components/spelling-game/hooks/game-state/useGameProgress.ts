
import { useGameStore } from '../../../../utils/game';
import { toast } from '@/components/ui/use-toast';

export const useGameProgress = () => {
  const { 
    updateWordProgress,
    addPoints
  } = useGameStore();
  
  const updateProgress = (wordId: string, isCorrect: boolean) => {
    updateWordProgress(wordId, isCorrect);
  };
  
  const addPlayerPoints = (points: number) => {
    addPoints(points);
    
    toast({
      title: "Correct!",
      description: `+${points} points added to your score.`,
      duration: 1500,
    });
  };
  
  return {
    updateProgress,
    addPlayerPoints
  };
};
