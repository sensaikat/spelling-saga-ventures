
import { useState, useEffect } from 'react';
import { learningAnalytics } from '../../../../services/analytics/learningAnalytics';
import { AnonymizedLearningData, LearningPattern, LearningInsight, AdaptiveSettings } from '../../../../services/analytics/types';
import { Word } from '../../../../utils/game';

// Add missing types
interface WordPerformance {
  word: string;
  wordId: string;
  successRate: number;
  attempts: number;
}

interface TimeSpent {
  name: string;
  value: number;
}

interface WeeklyActivity {
  date: string;
  sessions: number;
  correctAnswers: number;
}

interface PerformingWord {
  id: string;
  text: string;
  accuracy: number;
  attempts: number;
}

export const useLearningAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState<string>('30days');
  const [analyticsData, setAnalyticsData] = useState<AnonymizedLearningData[]>([]);
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [wordPerformance, setWordPerformance] = useState<WordPerformance[]>([]);
  const [difficultyDistribution, setDifficultyDistribution] = useState<{ name: string; value: number; }[]>([]);
  const [timeSpentDistribution, setTimeSpentDistribution] = useState<TimeSpent[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [learningPatterns, setLearningPatterns] = useState<LearningPattern[]>([]);
  const [adaptiveSettings, setAdaptiveSettings] = useState<AdaptiveSettings>({
    recommendedDifficulty: 'medium',
    focusAreas: [],
    challengeLevel: 5,
    hintFrequency: 'medium',
    repeatInterval: 3
  });
  const [topPerformingWords, setTopPerformingWords] = useState<PerformingWord[]>([]);
  const [strugglingWords, setStrugglingWords] = useState<PerformingWord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalyticsData = () => {
      setIsLoading(true);
      
      try {
        // Get local analytics data
        const localData = learningAnalytics.getLocalAnalyticsData();
        
        // Filter by time frame
        const filteredData = filterDataByTimeFrame(localData, timeFrame);
        setAnalyticsData(filteredData);
        
        // Process the data
        processWordPerformance(filteredData);
        processDifficultyDistribution(filteredData);
        processTimeSpentDistribution(filteredData);
        processWeeklyActivity(filteredData);
        
        // Get insights and patterns
        const userInsights = learningAnalytics.generateInsights({ wordsMastered: [], wordsInProgress: {}, points: 0, level: 1, streakDays: 0 });
        setInsights(userInsights);
        
        // In a real app, these would be fetched from the analytics service
        // For demo purposes, we're using mock patterns
        setLearningPatterns(getMockLearningPatterns());
        
        // Get adaptive settings
        const settings = learningAnalytics.getAdaptiveSettings();
        setAdaptiveSettings(settings);
        
        // Process word performance for top/struggling words
        processTopAndStrugglingWords(filteredData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeFrame]);
  
  const filterDataByTimeFrame = (data: AnonymizedLearningData[], frame: string): AnonymizedLearningData[] => {
    const now = new Date();
    let cutoff = new Date();
    
    switch (frame) {
      case '7days':
        cutoff.setDate(now.getDate() - 7);
        break;
      case '30days':
        cutoff.setDate(now.getDate() - 30);
        break;
      case '90days':
        cutoff.setDate(now.getDate() - 90);
        break;
      case 'all':
      default:
        return data;
    }
    
    return data.filter(item => new Date(item.timestamp) >= cutoff);
  };
  
  const processWordPerformance = (data: AnonymizedLearningData[]) => {
    const wordMap = new Map<string, { correct: number, total: number, wordId: string }>();
    
    // Group by wordId
    data.forEach(item => {
      if (!wordMap.has(item.wordId)) {
        wordMap.set(item.wordId, { correct: 0, total: 0, wordId: item.wordId });
      }
      
      const wordStats = wordMap.get(item.wordId)!;
      wordStats.total += 1;
      if (item.isCorrect) {
        wordStats.correct += 1;
      }
    });
    
    // Convert to array and sort by most attempted
    const wordPerformanceArray: WordPerformance[] = Array.from(wordMap.entries()).map(([wordId, stats]) => ({
      word: `Word-${wordId.substring(0, 5)}...`, // In a real app, we'd resolve the actual word text
      wordId,
      successRate: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
      attempts: stats.total
    }));
    
    // Sort by number of attempts (descending)
    wordPerformanceArray.sort((a, b) => b.attempts - a.attempts);
    
    setWordPerformance(wordPerformanceArray);
  };
  
  const processDifficultyDistribution = (data: AnonymizedLearningData[]) => {
    const difficultyMap = new Map<string, number>();
    
    // Count attempts by difficulty
    data.forEach(item => {
      const difficulty = item.difficulty || 'unknown';
      difficultyMap.set(difficulty, (difficultyMap.get(difficulty) || 0) + 1);
    });
    
    // Convert to array format for chart
    const distribution = Array.from(difficultyMap.entries()).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
      value
    }));
    
    setDifficultyDistribution(distribution);
  };
  
  const processTimeSpentDistribution = (data: AnonymizedLearningData[]) => {
    // In a real app, we'd categorize time spent on different activities
    // For demo purposes, we'll use some mock data based on difficulty
    const easyTime = data.filter(d => d.difficulty === 'easy')
      .reduce((sum, item) => sum + item.attemptDuration, 0);
    
    const mediumTime = data.filter(d => d.difficulty === 'medium')
      .reduce((sum, item) => sum + item.attemptDuration, 0);
    
    const hardTime = data.filter(d => d.difficulty === 'hard')
      .reduce((sum, item) => sum + item.attemptDuration, 0);
    
    const distribution: TimeSpent[] = [
      { name: 'Easy Words', value: easyTime },
      { name: 'Medium Words', value: mediumTime },
      { name: 'Hard Words', value: hardTime }
    ].filter(item => item.value > 0);
    
    setTimeSpentDistribution(distribution);
  };
  
  const processWeeklyActivity = (data: AnonymizedLearningData[]) => {
    const activityMap = new Map<string, { sessions: number, correct: number }>();
    
    // Get date range (last 7 days)
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dates.push(dateString);
      activityMap.set(dateString, { sessions: 0, correct: 0 });
    }
    
    // Count sessions and correct answers by date
    data.forEach(item => {
      const date = item.timestamp.split('T')[0];
      if (activityMap.has(date)) {
        const stats = activityMap.get(date)!;
        stats.sessions += 1;
        if (item.isCorrect) {
          stats.correct += 1;
        }
      }
    });
    
    // Convert to array format for chart
    const activity: WeeklyActivity[] = dates.map(date => {
      const stats = activityMap.get(date) || { sessions: 0, correct: 0 };
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        sessions: stats.sessions,
        correctAnswers: stats.correct
      };
    });
    
    setWeeklyActivity(activity);
  };
  
  const processTopAndStrugglingWords = (data: AnonymizedLearningData[]) => {
    const wordMap = new Map<string, { correct: number, total: number, id: string }>();
    
    // Group by wordId
    data.forEach(item => {
      if (!wordMap.has(item.wordId)) {
        wordMap.set(item.wordId, { correct: 0, total: 0, id: item.wordId });
      }
      
      const wordStats = wordMap.get(item.wordId)!;
      wordStats.total += 1;
      if (item.isCorrect) {
        wordStats.correct += 1;
      }
    });
    
    // Convert to array, calculate accuracy and filter words with enough attempts
    const wordsWithEnoughAttempts = Array.from(wordMap.entries())
      .filter(([_, stats]) => stats.total >= 3)
      .map(([wordId, stats]) => ({
        id: stats.id,
        text: `Word-${wordId.substring(0, 5)}...`, // In a real app, we'd resolve the word text
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
        attempts: stats.total
      }));
    
    // Sort for top performing (highest accuracy)
    const top = [...wordsWithEnoughAttempts].sort((a, b) => b.accuracy - a.accuracy);
    setTopPerformingWords(top.slice(0, 5));
    
    // Sort for struggling (lowest accuracy)
    const struggling = [...wordsWithEnoughAttempts].sort((a, b) => a.accuracy - b.accuracy);
    setStrugglingWords(struggling.slice(0, 5));
  };
  
  // Mock data for learning patterns
  const getMockLearningPatterns = (): LearningPattern[] => {
    return [
      {
        type: 'phonetic',
        confidence: 75,
        relatedWords: ['word1', 'word2'],
        description: 'Sound-based word recognition',
        recommendedApproach: 'Continue using audio cues with visual reinforcement'
      },
      {
        type: 'visual',
        confidence: 60,
        relatedWords: ['word3', 'word4'],
        description: 'Visual word pattern recognition',
        recommendedApproach: 'Practice with word shape recognition exercises'
      },
      {
        type: 'structural',
        confidence: 85,
        relatedWords: ['word5', 'word6'],
        description: 'Word structure and composition',
        recommendedApproach: 'Maintain current approach with increasing complexity'
      },
      {
        type: 'memory',
        confidence: 55,
        relatedWords: ['word7', 'word8'],
        description: 'Word recall and retention',
        recommendedApproach: 'Introduce spaced repetition for difficult words'
      }
    ];
  };
  
  return {
    analyticsData,
    insights,
    wordPerformance,
    difficultyDistribution,
    timeSpentDistribution,
    weeklyActivity,
    learningPatterns,
    adaptiveSettings,
    topPerformingWords,
    strugglingWords,
    timeFrame,
    isLoading,
    setTimeFrame
  };
};
