
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, BookOpen } from 'lucide-react';
import { LearningInsight } from '../../../services/analytics/learningAnalytics';
import StrengthWeaknessCard from './StrengthWeaknessCard';
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
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p>Keep practicing to receive personalized insights and recommendations.</p>
          </div>
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
