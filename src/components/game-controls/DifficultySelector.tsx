
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DifficultySelectorProps {
  difficultyLevel: string;
  onDifficultyChange: (level: string) => void;
  isPlaying: boolean;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficultyLevel,
  onDifficultyChange,
  isPlaying,
}) => {
  return (
    <Select 
      value={difficultyLevel} 
      onValueChange={onDifficultyChange}
      disabled={!isPlaying}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="easy">Easy</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="hard">Hard</SelectItem>
        <SelectItem value="all">All Levels</SelectItem>
      </SelectContent>
    </Select>
  );
};
