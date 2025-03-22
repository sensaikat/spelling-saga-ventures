
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { LearningInsight } from '../../../../services/analytics/types';
import { EmptyInsightsState, StrengthWeaknessCard } from '../components';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface InsightsContainerProps {
  insights: LearningInsight[];
}

const InsightsContainer: React.FC<InsightsContainerProps> = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Learning Insights</CardTitle>
          <CardDescription>Complete more exercises to see insights</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyInsightsState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Learning Insights
        </CardTitle>
        <CardDescription>
          Personalized analysis based on your learning patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <StrengthWeaknessCard key={index} insight={insight} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsContainer;
