
import React from 'react';
import { Book } from 'lucide-react';
import { Word } from '../../../../utils/game/types';
import { RecommendedWordItem } from '../components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
            <RecommendedWordItem key={word.id} word={word} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedWordsCard;
