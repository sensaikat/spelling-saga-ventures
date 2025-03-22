
import React from 'react';
import { Book, Star } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecommendedWordsCardProps {
  words: Word[];
}

const RecommendedWordsCard: React.FC<RecommendedWordsCardProps> = ({ words }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-600" />
          Recommended Practice Words
        </CardTitle>
        <CardDescription>
          Words tailored to help you improve your skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {words.map((word) => (
            <div key={word.id} className="flex items-start border rounded-lg p-3 hover:bg-blue-50 transition-colors">
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedWordsCard;
