
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  BookOpen,
  BarChart2
} from 'lucide-react';
import { LearningInsight } from '../../services/analytics/learningAnalytics';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface LearningInsightsProps {
  insights: LearningInsight[];
}

const LearningInsights: React.FC<LearningInsightsProps> = ({ insights }) => {
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${
                insight.type === 'strength'
                  ? 'bg-green-50 border border-green-100'
                  : insight.type === 'weakness'
                  ? 'bg-red-50 border border-red-100'
                  : insight.type === 'pattern'
                  ? 'bg-blue-50 border border-blue-100'
                  : 'bg-purple-50 border border-purple-100'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {insight.type === 'strength' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : insight.type === 'weakness' ? (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  ) : (
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium capitalize ${
                    insight.type === 'strength'
                      ? 'text-green-800'
                      : insight.type === 'weakness'
                      ? 'text-red-800'
                      : 'text-purple-800'
                  }`}>
                    {insight.type}
                  </h4>
                  
                  <p className="text-gray-700 mt-1">{insight.description}</p>
                  
                  {insight.recommendedActions && insight.recommendedActions.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700">Recommendations:</h5>
                      <ul className="mt-1 text-sm space-y-1">
                        {insight.recommendedActions.map((action, i) => (
                          <li key={i} className="flex items-center">
                            <span className="mr-2 text-xs">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {insight.score !== undefined && (
                  <div className="ml-2 flex-shrink-0">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        insight.score >= 70
                          ? 'bg-green-100 text-green-800'
                          : insight.score >= 40
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {insight.score.toFixed(0)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningInsights;
