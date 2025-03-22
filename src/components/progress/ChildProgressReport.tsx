
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles, Medal, Rocket } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useGameStore, Word } from '../../utils/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChildProgressReportProps {
  masteredWords: Word[];
  totalWords: number;
  level: number;
  points: number;
  streak: number;
}

const ChildProgressReport: React.FC<ChildProgressReportProps> = ({
  masteredWords,
  totalWords,
  level,
  points,
  streak
}) => {
  // Calculate mastery percentage
  const masteryPercentage = totalWords > 0 
    ? Math.round((masteredWords.length / totalWords) * 100)
    : 0;
  
  // Fun messages based on streak
  const getStreakMessage = () => {
    if (streak === 0) return "Start your learning adventure today!";
    if (streak === 1) return "You started your journey! Keep going!";
    if (streak < 5) return `Amazing! You've learned ${streak} days in a row!`;
    if (streak < 10) return `WOW! ${streak} day streak! You're on fire! 🔥`;
    return `INCREDIBLE! ${streak} day streak! You're a SUPERSTAR! ✨`;
  };
  
  // Motivational messages based on progress
  const getMotivationalMessage = () => {
    if (masteredWords.length === 0) return "Learn your first word today!";
    if (masteredWords.length < 5) return "You're making great progress!";
    if (masteredWords.length < 15) return "Look at all the words you've learned!";
    if (masteredWords.length < 30) return "You're becoming a word master!";
    return "WOW! You're a vocabulary champion!";
  };
  
  return (
    <div className="px-4 py-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl">
      {/* Trophy Animation */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trophy size={60} className="text-white" />
          </motion.div>
          <motion.div 
            className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {level}
          </motion.div>
        </div>
      </motion.div>

      {/* Points & Level */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-display font-bold mb-2 text-purple-700">
          You are AWESOME!
        </h2>
        <p className="text-lg mb-1">
          <span className="font-bold text-indigo-600">{points}</span> total points!
        </p>
        <p className="text-sm text-gray-600">Level {level} Word Explorer</p>
      </motion.div>
      
      {/* Learning Streak */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="font-bold text-gray-700">Your Learning Streak</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-blue-600">{streak} days</span>
            <Rocket className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-600">{getStreakMessage()}</p>
        </div>
      </motion.div>
      
      {/* Words Mastered */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Medal className="h-5 w-5 text-orange-500" />
          <h3 className="font-bold text-gray-700">Words You've Mastered</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-green-600">{masteredWords.length}</span>
              <span className="text-sm text-gray-500 ml-1">of {totalWords}</span>
            </div>
            <span className="text-sm font-medium text-purple-600">{masteryPercentage}% Complete</span>
          </div>
          
          <Progress 
            value={masteryPercentage} 
            className="h-3 mb-3" 
          />
          
          <p className="text-sm text-gray-600 mt-2">{getMotivationalMessage()}</p>
        </div>
      </motion.div>
      
      {/* Leaderboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          <h3 className="font-bold text-gray-700">Your Place on the Leaderboard</h3>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Learners This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-yellow-50 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-white">1</div>
                  <span className="font-medium">Alex</span>
                </div>
                <span className="text-sm font-medium">520 pts</span>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs font-bold text-white">2</div>
                  <span className="font-medium">Sam</span>
                </div>
                <span className="text-sm font-medium">490 pts</span>
              </div>
              
              <div className="flex items-center justify-between bg-amber-50 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white">3</div>
                  <span className="font-medium">Jamie</span>
                </div>
                <span className="text-sm font-medium">475 pts</span>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">4</div>
                  <span className="font-medium">You</span>
                </div>
                <span className="text-sm font-medium">{points} pts</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <motion.p 
                className="text-sm font-medium text-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Keep learning to move up the leaderboard!
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChildProgressReport;
