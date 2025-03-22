
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, BookOpen, Settings } from 'lucide-react';
import { UserProgress } from '../../utils/game/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatisticsTabProps {
  progress: UserProgress;
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({ progress }) => {
  return (
    <>
      {/* Progress Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Words Mastered
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.wordsMastered.length}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(progress.wordsMastered.length / 10)} this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Accuracy
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progress.wordsMastered.length > 0 
                  ? `${Math.round((progress.wordsMastered.length / 
                      (progress.wordsMastered.length + 
                        Object.keys(progress.wordsInProgress).length)) * 100)}%`
                  : "0%"}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on your practice history
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Streak
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                Keep the streak going!
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      {/* Difficulty Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              <p>Difficulty distribution chart would appear here</p>
              {/* In a real implementation, use Recharts to create a visualization */}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default StatisticsTab;
