
import { AnonymizedLearningData, LearningInsight, PrivacyPreferences, AdaptiveSettings } from '../types';
import { Word } from '../../../utils/game/types';
import { PatternDetector } from './PatternDetector';
import { RecommendationEngine } from './RecommendationEngine';
import { TrendAnalyzer } from './TrendAnalyzer';
import { InsightFormatters } from './InsightFormatters';

export class InsightsGenerator {
  private patternDetector: PatternDetector;
  private recommendationEngine: RecommendationEngine;
  private trendAnalyzer: TrendAnalyzer;
  private formatters: InsightFormatters;

  constructor() {
    this.patternDetector = new PatternDetector();
    this.recommendationEngine = new RecommendationEngine();
    this.trendAnalyzer = new TrendAnalyzer();
    this.formatters = new InsightFormatters();
  }

  // Generate insights from analytics data
  public generateInsights(localData: AnonymizedLearningData[], allowPersonalization: boolean): LearningInsight[] {
    try {
      const insights: LearningInsight[] = [];
      
      if (localData.length === 0) {
        return [
          {
            type: 'recommendation',
            description: 'Complete more exercises to receive personalized insights.',
            score: 50,
            recommendedActions: ['Practice at least 10 words to get started']
          }
        ];
      }
      
      // Calculate accuracy rate
      const attempts = localData.length;
      const correctAttempts = localData.filter(data => data.isCorrect).length;
      const accuracyRate = attempts > 0 ? (correctAttempts / attempts) * 100 : 0;
      
      // Analyze by difficulty
      const byDifficulty: Record<string, AnonymizedLearningData[]> = {
        'easy': localData.filter(d => d.difficulty === 'easy'),
        'medium': localData.filter(d => d.difficulty === 'medium'),
        'hard': localData.filter(d => d.difficulty === 'hard')
      };
      
      // Calculate accuracy by difficulty
      const difficultyAccuracy: Record<string, number> = {};
      Object.entries(byDifficulty).forEach(([difficulty, data]) => {
        if (data.length > 0) {
          const correct = data.filter(d => d.isCorrect).length;
          difficultyAccuracy[difficulty] = (correct / data.length) * 100;
        } else {
          difficultyAccuracy[difficulty] = 0;
        }
      });
      
      // Add general accuracy insight
      insights.push({
        type: accuracyRate >= 70 ? 'strength' : 'weakness',
        description: `Your overall accuracy is ${accuracyRate.toFixed(1)}%`,
        score: accuracyRate,
        recommendedActions: accuracyRate < 70 ? [
          'Try using hints more often',
          'Focus on one difficulty level at a time'
        ] : undefined,
        // Add personalized insights if enabled
        ...(allowPersonalization ? {
          personalTip: this.formatters.generatePersonalTip(accuracyRate),
          confidenceScore: Math.min(100, accuracyRate + 10)
        } : {})
      });
      
      // Add difficulty-specific insights
      Object.entries(difficultyAccuracy).forEach(([difficulty, accuracy]) => {
        if (accuracy > 0) {
          const insight: LearningInsight = {
            type: accuracy >= 70 ? 'strength' : 'weakness',
            description: `${difficulty} words: ${accuracy.toFixed(1)}% accuracy`,
            score: accuracy,
            recommendedActions: accuracy < 70 ? [
              `Practice more ${difficulty} words`,
              `Use hints for ${difficulty} words`
            ] : undefined
          };
          
          // Add personalization if enabled
          if (allowPersonalization) {
            insight.adaptiveLevel = this.formatters.getAdaptiveLevel(difficulty, accuracy);
            insight.personalTip = this.formatters.getDifficultyTip(difficulty, accuracy);
          }
          
          insights.push(insight);
        }
      });
      
      // Analyze specific word patterns
      const wordPatterns = this.patternDetector.detectLearningPatterns(localData);
      for (const pattern of wordPatterns) {
        // Only include patterns with sufficient confidence
        if (pattern.confidence > 50) {
          insights.push({
            type: pattern.confidence > 75 ? 'strength' : 'weakness',
            description: pattern.description,
            score: pattern.confidence,
            patternType: pattern.type,
            relatedWords: pattern.relatedWords,
            recommendedActions: [pattern.recommendedApproach]
          });
        }
      }
      
      // Analyze time patterns
      const avgTime = this.patternDetector.calculateAverageTime(localData);
      insights.push({
        type: avgTime < 5000 ? 'strength' : 'recommendation',
        description: `Average response time: ${(avgTime / 1000).toFixed(1)} seconds`,
        score: 100 - Math.min(100, avgTime / 100),
        recommendedActions: avgTime > 5000 ? [
          'Try to improve your response time',
          'Practice reading words quickly'
        ] : undefined
      });
      
      // Add insights on hint usage patterns
      const avgHints = this.patternDetector.calculateAverageHints(localData);
      if (avgHints > 0) {
        insights.push({
          type: avgHints < 1 ? 'strength' : 'recommendation',
          description: `Average hints used: ${avgHints.toFixed(1)} per word`,
          score: 100 - Math.min(100, avgHints * 25),
          recommendedActions: avgHints > 1.5 ? [
            'Try to reduce hint usage for better retention',
            'Review words before starting exercises'
          ] : undefined
        });
      }
      
      // Detect progress trends (improving or declining)
      const trendInsight = this.trendAnalyzer.detectTrends(localData);
      if (trendInsight) {
        insights.push(trendInsight);
      }
      
      return insights;
      
    } catch (e) {
      console.error('Error generating insights:', e);
      return [
        {
          type: 'recommendation',
          description: 'Unable to generate insights. Please try again later.',
          score: 0
        }
      ];
    }
  }
  
  // Get recommended words based on user performance
  public getRecommendedWords(
    availableWords: Word[],
    masteredWords: string[],
    localData: AnonymizedLearningData[],
    allowPersonalization: boolean
  ): Word[] {
    return this.recommendationEngine.getRecommendedWords(
      availableWords,
      masteredWords,
      localData,
      allowPersonalization,
      this.patternDetector
    );
  }
  
  // Get adaptive game settings based on user performance
  public getAdaptiveSettings(
    localData: AnonymizedLearningData[],
    allowPersonalization: boolean
  ): AdaptiveSettings {
    return this.recommendationEngine.getAdaptiveSettings(
      localData,
      allowPersonalization,
      this.patternDetector
    );
  }
}
