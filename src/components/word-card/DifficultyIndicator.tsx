
import React from 'react';

interface DifficultyIndicatorProps {
  difficulty: string;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ 
  difficulty 
}) => {
  const difficultyColor = 
    difficulty === 'easy' ? 'bg-game-green' : 
    difficulty === 'medium' ? 'bg-game-yellow' : 
    'bg-game-red';
    
  return (
    <div className={`h-2 w-16 rounded-full ${difficultyColor} opacity-70`} />
  );
};
