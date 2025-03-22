
import { AnonymizedLearningData, LearningInsight, PrivacyPreferences, LearningPattern, PatternType, AdaptiveSettings } from './types';
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
      const wordPatterns = this.detectLearningPatterns(localData);
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
      
      // Add insights on hint usage patterns
      const avgHints = this.calculateAverageHints(localData);
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
      const trendInsight = this.detectTrends(localData);
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
    // Filter out mastered words
    const nonMasteredWords = availableWords.filter(
      word => !masteredWords.includes(word.id)
    );
    
    if (localData.length < 5 || nonMasteredWords.length <= 5 || !allowPersonalization) {
      // Not enough data, words, or personalization disabled
      return nonMasteredWords.slice(0, 5);
    }
    
    // Detect learning patterns to find recommended focus areas
    const patterns = this.detectLearningPatterns(localData);
    const weakPatterns = patterns.filter(p => p.confidence < 70);
    
    // Sort by score (highest first) and return top 5
    return nonMasteredWords
      .sort((a, b) => {
        // If personalization is enabled, use advanced sorting
        if (allowPersonalization) {
          // Get attempts for both words
          const attemptsA = localData.filter(d => d.wordId === a.id);
          const attemptsB = localData.filter(d => d.wordId === b.id);
          
          // Check if words match weak pattern areas
          const aMatchesWeakPattern = this.wordMatchesPatterns(a, weakPatterns);
          const bMatchesWeakPattern = this.wordMatchesPatterns(b, weakPatterns);
          
          // Prioritize words that match weak patterns
          if (aMatchesWeakPattern && !bMatchesWeakPattern) return -1;
          if (bMatchesWeakPattern && !aMatchesWeakPattern) return 1;
          
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
  
  // Get adaptive game settings based on user performance
  public getAdaptiveSettings(
    localData: AnonymizedLearningData[],
    allowPersonalization: boolean
  ): AdaptiveSettings {
    // Default settings
    const defaultSettings: AdaptiveSettings = {
      recommendedDifficulty: 'medium',
      focusAreas: [],
      challengeLevel: 5,
      hintFrequency: 'medium',
      repeatInterval: 3
    };
    
    if (!allowPersonalization || localData.length < 10) {
      return defaultSettings;
    }
    
    try {
      // Calculate overall accuracy
      const correctAttempts = localData.filter(data => data.isCorrect).length;
      const accuracyRate = (correctAttempts / localData.length) * 100;
      
      // Determine appropriate difficulty
      let recommendedDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
      if (accuracyRate > 85) {
        recommendedDifficulty = 'hard';
      } else if (accuracyRate < 60) {
        recommendedDifficulty = 'easy';
      }
      
      // Determine challenge level (1-10)
      const challengeLevel = Math.max(1, Math.min(10, Math.round(accuracyRate / 10)));
      
      // Calculate hint frequency based on previous hint usage
      const avgHints = this.calculateAverageHints(localData);
      let hintFrequency: 'low' | 'medium' | 'high' = 'medium';
      if (avgHints > 1.5) {
        hintFrequency = 'high';
      } else if (avgHints < 0.5) {
        hintFrequency = 'low';
      }
      
      // Identify focus areas based on learning patterns
      const patterns = this.detectLearningPatterns(localData);
      const weakPatterns = patterns
        .filter(p => p.confidence < 65)
        .map(p => p.type);
      
      // Set repeat interval based on memory retention
      const memoryRetention = this.calculateMemoryRetention(localData);
      const repeatInterval = Math.max(1, Math.round(memoryRetention / 20));
      
      return {
        recommendedDifficulty,
        focusAreas: Array.from(new Set(weakPatterns)),
        challengeLevel,
        hintFrequency,
        repeatInterval
      };
    } catch (e) {
      console.error('Error generating adaptive settings:', e);
      return defaultSettings;
    }
  }
  
  // Helper methods
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
  
  private detectLearningPatterns(data: AnonymizedLearningData[]): LearningPattern[] {
    const patterns: LearningPattern[] = [];
    
    // Detect phonetic patterns (similar sounding words)
    const phoneticAccuracy = this.calculatePatternAccuracy(data, 'phonetic');
    patterns.push({
      type: 'phonetic',
      confidence: phoneticAccuracy,
      relatedWords: this.getWordsByPattern(data, 'phonetic'),
      description: `Phonetic patterns: ${phoneticAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: phoneticAccuracy < 70 
        ? "Practice sound-by-sound pronunciation and listen to word audio more frequently" 
        : "Continue focusing on word sounds and pronunciation"
    });
    
    // Detect visual patterns (word appearance)
    const visualAccuracy = this.calculatePatternAccuracy(data, 'visual');
    patterns.push({
      type: 'visual',
      confidence: visualAccuracy,
      relatedWords: this.getWordsByPattern(data, 'visual'),
      description: `Visual word patterns: ${visualAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: visualAccuracy < 70 
        ? "Focus on word shapes and letter patterns" 
        : "Your visual word recognition is strong"
    });
    
    // Detect structural patterns (word length, complexity)
    const structuralAccuracy = this.calculatePatternAccuracy(data, 'structural');
    patterns.push({
      type: 'structural',
      confidence: structuralAccuracy,
      relatedWords: this.getWordsByPattern(data, 'structural'),
      description: `Word structure: ${structuralAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: structuralAccuracy < 70 
        ? "Break down longer words into smaller parts" 
        : "You handle word structure well"
    });
    
    // Detect memory patterns (recall ability)
    const memoryAccuracy = this.calculatePatternAccuracy(data, 'memory');
    patterns.push({
      type: 'memory',
      confidence: memoryAccuracy,
      relatedWords: this.getWordsByPattern(data, 'memory'),
      description: `Word recall: ${memoryAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: memoryAccuracy < 70 
        ? "Practice word recall with spaced repetition" 
        : "Your word memory is strong"
    });
    
    return patterns;
  }
  
  private calculatePatternAccuracy(data: AnonymizedLearningData[], patternType: PatternType): number {
    // This is a simplified implementation
    // In a real app, this would use more sophisticated pattern matching algorithms
    
    // For now, just return a general accuracy based on word type
    switch (patternType) {
      case 'phonetic':
        // Words with difficult pronunciation
        const phoneticData = data.filter(d => 
          d.mistakePattern === 'pronunciation' || 
          d.difficulty === 'hard'
        );
        return phoneticData.length > 0 
          ? (phoneticData.filter(d => d.isCorrect).length / phoneticData.length) * 100 
          : 75;
        
      case 'visual':
        // Words with similar visual patterns
        const visualData = data.filter(d => 
          d.mistakePattern === 'visual' || 
          (d.lettersCorrect && d.lettersCorrect > 0)
        );
        return visualData.length > 0 
          ? (visualData.filter(d => d.isCorrect).length / visualData.length) * 100 
          : 70;
        
      case 'structural':
        // Longer, more complex words
        const structuralData = data.filter(d => 
          d.difficulty === 'hard' || 
          d.difficulty === 'medium'
        );
        return structuralData.length > 0 
          ? (structuralData.filter(d => d.isCorrect).length / structuralData.length) * 100 
          : 65;
        
      case 'memory':
        // Words that require multiple attempts
        const memoryData = data.filter(d => 
          d.attemptCount && d.attemptCount > 1
        );
        return memoryData.length > 0 
          ? (memoryData.filter(d => d.isCorrect).length / memoryData.length) * 100 
          : 80;
        
      case 'semantic':
      default:
        return 70; // Default accuracy
    }
  }
  
  private getWordsByPattern(data: AnonymizedLearningData[], patternType: PatternType): string[] {
    // Extract unique word IDs that match the pattern
    const matchingData = data.filter(d => {
      switch (patternType) {
        case 'phonetic':
          return d.mistakePattern === 'pronunciation' || d.difficulty === 'hard';
        case 'visual':
          return d.mistakePattern === 'visual' || (d.lettersCorrect && d.lettersCorrect > 0);
        case 'structural':
          return d.difficulty === 'hard' || d.difficulty === 'medium';
        case 'memory':
          return d.attemptCount && d.attemptCount > 1;
        default:
          return false;
      }
    });
    
    return Array.from(new Set(matchingData.map(d => d.wordId)));
  }
  
  private wordMatchesPatterns(word: Word, patterns: LearningPattern[]): boolean {
    // Check if the word matches any of the weak pattern types
    // This is a simplified implementation
    if (patterns.length === 0) return false;
    
    // Check if the word difficulty matches pattern types
    if (patterns.some(p => p.type === 'structural') && word.difficulty === 'hard') {
      return true;
    }
    
    // Check if the word is in any of the related words lists
    return patterns.some(p => p.relatedWords.includes(word.id));
  }
  
  private calculateAverageTime(data: AnonymizedLearningData[]): number {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.attemptDuration, 0);
    return sum / data.length;
  }
  
  private calculateAverageHints(data: AnonymizedLearningData[]): number {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.hintsUsed, 0);
    return sum / data.length;
  }
  
  private calculateMemoryRetention(data: AnonymizedLearningData[]): number {
    // Calculate how well words are retained over time
    // Higher number = better retention
    // This is a simplified implementation
    
    if (data.length < 10) return 50; // Not enough data
    
    // Group attempts by wordId
    const wordAttempts: Record<string, AnonymizedLearningData[]> = {};
    data.forEach(attempt => {
      if (!wordAttempts[attempt.wordId]) {
        wordAttempts[attempt.wordId] = [];
      }
      wordAttempts[attempt.wordId].push(attempt);
    });
    
    // Calculate improvement rates for words with multiple attempts
    let totalImprovement = 0;
    let wordsWithMultipleAttempts = 0;
    
    Object.values(wordAttempts).forEach(attempts => {
      if (attempts.length > 1) {
        // Sort by timestamp
        attempts.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        // Calculate improvement from first to last attempt
        const firstCorrect = attempts[0].isCorrect ? 1 : 0;
        const lastCorrect = attempts[attempts.length - 1].isCorrect ? 1 : 0;
        const improvement = lastCorrect - firstCorrect;
        
        totalImprovement += improvement;
        wordsWithMultipleAttempts++;
      }
    });
    
    if (wordsWithMultipleAttempts === 0) return 50;
    
    // Scale to 0-100
    const averageImprovement = totalImprovement / wordsWithMultipleAttempts;
    return 50 + (averageImprovement * 50);
  }
  
  private detectTrends(data: AnonymizedLearningData[]): LearningInsight | null {
    if (data.length < 10) return null;
    
    // Sort data by timestamp
    const sortedData = [...data].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Split into first half and second half
    const midpoint = Math.floor(sortedData.length / 2);
    const firstHalf = sortedData.slice(0, midpoint);
    const secondHalf = sortedData.slice(midpoint);
    
    // Calculate accuracy for both halves
    const firstHalfCorrect = firstHalf.filter(d => d.isCorrect).length;
    const secondHalfCorrect = secondHalf.filter(d => d.isCorrect).length;
    
    const firstHalfAccuracy = (firstHalfCorrect / firstHalf.length) * 100;
    const secondHalfAccuracy = (secondHalfCorrect / secondHalf.length) * 100;
    
    // Calculate the trend (improvement or decline)
    const trend = secondHalfAccuracy - firstHalfAccuracy;
    
    // Create insight based on trend
    if (Math.abs(trend) < 5) return null; // No significant trend
    
    return {
      type: trend > 0 ? 'strength' : 'weakness',
      description: trend > 0 
        ? `Your accuracy is improving! +${trend.toFixed(1)}% recently` 
        : `Your accuracy has decreased by ${Math.abs(trend).toFixed(1)}% recently`,
      score: trend > 0 ? 80 : 40,
      recommendedActions: trend <= 0 ? [
        'Try to maintain consistent practice sessions',
        'Review words you struggled with recently'
      ] : undefined
    };
  }
  
  private getWordAccuracy(wordId: string, data: AnonymizedLearningData[]): number {
    const attempts = data.filter(d => d.wordId === wordId);
    if (attempts.length === 0) return 50; // Neutral score for no attempts
    
    const correctAttempts = attempts.filter(d => d.isCorrect).length;
    return (correctAttempts / attempts.length) * 100;
  }
}
