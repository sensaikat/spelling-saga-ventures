
import React from 'react';
import { Star } from 'lucide-react';
import { Word } from '../../../../utils/game/types';
import { Badge } from '@/components/ui/badge';

interface RecommendedWordItemProps {
  word: Word;
}

const RecommendedWordItem: React.FC<RecommendedWordItemProps> = ({ word }) => {
  return (
    <div className="flex items-start border rounded-lg p-3 hover:bg-blue-50 transition-colors">
      <div className="flex-grow">
        <div className="font-medium text-lg">{word.text}</div>
        {/* Use hint as translation if available */}
        <div className="text-gray-600 text-sm">
          {word.hint || "Practice this word"}
        </div>
        <div className="mt-2 space-x-2">
          <Badge variant={
            word.difficulty === 'easy' ? 'outline' : 
            word.difficulty === 'medium' ? 'secondary' : 'destructive'
          }>
            {word.difficulty}
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Star className="h-5 w-5 text-yellow-400" />
      </div>
    </div>
  );
};

export default RecommendedWordItem;
