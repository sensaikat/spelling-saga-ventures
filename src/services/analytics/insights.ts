import { AnonymizedLearningData, LearningInsight, PrivacyPreferences } from './types';
import { Word } from '../../utils/game/types';

export class InsightsGenerator {
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
          personalTip: this.generatePersonalTip(accuracyRate),
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
            insight.adaptiveLevel = this.getAdaptiveLevel(difficulty, accuracy);
            insight.personalTip = this.getDifficultyTip(difficulty, accuracy);
          }
          
          insights.push(insight);
        }
      });
      
      // Analyze specific word patterns
      const wordGroups = this.groupSimilarWords(localData);
      Object.entries(wordGroups).forEach(([pattern, words]) => {
        const patternAttempts = localData.filter(d => words.includes(d.wordId));
        const patternCorrect = patternAttempts.filter(d => d.isCorrect).length;
        const patternAccuracy = patternAttempts.length > 0 
          ? (patternCorrect / patternAttempts.length) * 100 
          : 0;
        
        if (patternAttempts.length >= 3) {
          insights.push({
            type: patternAccuracy >= 70 ? 'strength' : 'weakness',
            description: `Words with pattern "${pattern}": ${patternAccuracy.toFixed(1)}% accuracy`,
            score: patternAccuracy,
            relatedWords: words,
            recommendedActions: patternAccuracy < 70 ? [
              `Focus on practicing words with "${pattern}"`,
              `Review rules for "${pattern}" patterns`
            ] : undefined
          });
        }
      });
      
      // Analyze time patterns
      const avgTime = this.calculateAverageTime(localData);
      insights.push({
        type: avgTime < 5000 ? 'strength' : 'recommendation',
        description: `Average response time: ${(avgTime / 1000).toFixed(1)} seconds`,
        score: 100 - Math.min(100, avgTime / 100),
        recommendedActions: avgTime > 5000 ? [
          'Try to improve your response time',
          'Practice reading words quickly'
        ] : undefined
      });
      
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
    // Filter out mastered words
    const nonMasteredWords = availableWords.filter(
      word => !masteredWords.includes(word.id)
    );
    
    if (localData.length < 5 || nonMasteredWords.length <= 5 || !allowPersonalization) {
      // Not enough data, words, or personalization disabled
      return nonMasteredWords.slice(0, 5);
    }
    
    // Sort by score (highest first) and return top 5
    return nonMasteredWords
      .sort((a, b) => {
        // If personalization is enabled, use advanced sorting
        if (allowPersonalization) {
          // Get attempts for both words
          const attemptsA = localData.filter(d => d.wordId === a.id);
          const attemptsB = localData.filter(d => d.wordId === b.id);
          
          // Prioritize words with fewer attempts
          if (attemptsA.length === 0 && attemptsB.length > 0) return -1;
          if (attemptsB.length === 0 && attemptsA.length > 0) return 1;
          
          // Otherwise prioritize words with lower accuracy
          const accuracyA = this.getWordAccuracy(a.id, localData);
          const accuracyB = this.getWordAccuracy(b.id, localData);
          
          return accuracyA - accuracyB;
        }
        
        // Default to random order if personalization disabled
        return Math.random() - 0.5;
      })
      .slice(0, 5);
  }
  
  private generatePersonalTip(accuracy: number): string {
    if (accuracy > 90) return "You're doing excellently! Try challenging yourself with harder words.";
    if (accuracy > 70) return "Good progress! Focus on maintaining consistency in your practice.";
    if (accuracy > 50) return "You're making progress. Try using the hint feature when needed.";
    return "Keep practicing! Consistent daily practice will improve your results.";
  }
  
  private getDifficultyTip(difficulty: string, accuracy: number): string {
    if (difficulty === 'easy' && accuracy < 70) {
      return "Focus on mastering easy words before moving to more difficult ones.";
    }
    if (difficulty === 'medium' && accuracy > 80) {
      return "You're ready for more challenging words! Try some hard level words.";
    }
    if (difficulty === 'hard' && accuracy > 70) {
      return "Impressive! You're mastering even difficult words.";
    }
    return `Keep practicing ${difficulty} words to build your skills.`;
  }
  
  private getAdaptiveLevel(difficulty: string, accuracy: number): 'easy' | 'medium' | 'hard' {
    if (difficulty === 'hard' && accuracy > 60) return 'hard';
    if (difficulty === 'medium' && accuracy > 70) return 'medium';
    if (difficulty === 'easy' && accuracy > 80) return 'medium';
    return 'easy';
  }
  
  private groupSimilarWords(data: AnonymizedLearningData[]): Record<string, string[]> {
    // This is a simplified implementation
    // In a real app, you would use more sophisticated pattern recognition
    const patterns: Record<string, string[]> = {
      'vowels': [],
      'consonants': [],
      'double-letters': []
    };
    
    // Here we would analyze words and group them
    // For now, we'll return empty groups
    return patterns;
  }
  
  private calculateAverageTime(data: AnonymizedLearningData[]): number {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.attemptDuration, 0);
    return sum / data.length;
  }
  
  private getWordAccuracy(wordId: string, data: AnonymizedLearningData[]): number {
    const attempts = data.filter(d => d.wordId === wordId);
    if (attempts.length === 0) return 50; // Neutral score for no attempts
    
    const correctAttempts = attempts.filter(d => d.isCorrect).length;
    return (correctAttempts / attempts.length) * 100;
  }
}
