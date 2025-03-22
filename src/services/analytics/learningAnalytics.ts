
import { Word, UserProgress, Language } from '../../utils/game/types';

// Anonymized user data structure
export interface AnonymizedLearningData {
  userId: string; // Hashed user ID
  sessionId: string;
  timestamp: string;
  languageId: string;
  wordId: string;
  isCorrect: boolean;
  attemptDuration: number; // in milliseconds
  hintsUsed: number;
  difficulty: string;
  // Demographic info (optional)
  region?: string;
  ageGroup?: string;
  gender?: string;
}

// Learning insights structure
export interface LearningInsight {
  type: 'strength' | 'weakness' | 'pattern' | 'recommendation';
  description: string;
  score: number; // 0-100
  relatedWords?: string[];
  recommendedActions?: string[];
}

// Service for collecting and analyzing learning data
export class LearningAnalyticsService {
  private static instance: LearningAnalyticsService;
  private apiEndpoint: string = '/api/learning-analytics';
  private isEnabled: boolean = true;
  private userConsent: boolean = false;
  private anonymizationKey: string = '';
  
  private constructor() {
    // Initialize with stored consent if available
    this.loadSettings();
  }
  
  public static getInstance(): LearningAnalyticsService {
    if (!LearningAnalyticsService.instance) {
      LearningAnalyticsService.instance = new LearningAnalyticsService();
    }
    return LearningAnalyticsService.instance;
  }
  
  private loadSettings(): void {
    try {
      // Load user consent from localStorage
      const consent = localStorage.getItem('analytics-consent');
      this.userConsent = consent === 'true';
      
      // Generate or load anonymization key
      let key = localStorage.getItem('user-anon-key');
      if (!key) {
        key = this.generateAnonymizationKey();
        localStorage.setItem('user-anon-key', key);
      }
      this.anonymizationKey = key;
    } catch (e) {
      console.error('Error loading analytics settings:', e);
      this.userConsent = false;
    }
  }
  
  private generateAnonymizationKey(): string {
    // Generate a random key for user anonymization
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  public setUserConsent(consent: boolean): void {
    this.userConsent = consent;
    localStorage.setItem('analytics-consent', consent.toString());
  }
  
  public hasUserConsent(): boolean {
    return this.userConsent;
  }
  
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
  
  // Anonymize user data
  private anonymizeUserId(userId: string): string {
    // Simple one-way hashing for demo
    // In production, use a proper cryptographic hash
    return btoa(userId + this.anonymizationKey).slice(0, 24);
  }
  
  // Record word attempt data
  public recordWordAttempt(
    word: Word, 
    isCorrect: boolean, 
    duration: number,
    hintsUsed: number,
    language: Language
  ): void {
    if (!this.isEnabled || !this.userConsent) return;
    
    // Prepare anonymized data
    const data: AnonymizedLearningData = {
      userId: this.anonymizeUserId('user-id'), // In real app, use actual user ID
      sessionId: localStorage.getItem('session-id') || `session-${Date.now()}`,
      timestamp: new Date().toISOString(),
      languageId: language.id,
      wordId: word.id,
      isCorrect,
      attemptDuration: duration,
      hintsUsed,
      difficulty: word.difficulty,
      // Demographics would be collected separately with explicit consent
    };
    
    // Store session ID if not exists
    if (!localStorage.getItem('session-id')) {
      localStorage.setItem('session-id', data.sessionId);
    }
    
    // Send data to API
    this.sendAnalyticsData(data);
    
    // Also store locally for immediate analysis
    this.storeLocalAnalytics(data);
  }
  
  private sendAnalyticsData(data: AnonymizedLearningData): void {
    // In a production app, send to your backend
    // For this demo, we'll log to console and store locally
    console.log('Analytics data:', data);
    
    // Simulate API call - in a real app, replace with actual API call
    /* 
    fetch(this.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.error('Failed to send analytics data:', err));
    */
  }
  
  private storeLocalAnalytics(data: AnonymizedLearningData): void {
    try {
      // Get existing data
      const existingData = localStorage.getItem('local-analytics');
      const analyticsArray: AnonymizedLearningData[] = existingData 
        ? JSON.parse(existingData) 
        : [];
      
      // Add new data and limit array size
      analyticsArray.push(data);
      if (analyticsArray.length > 100) {
        analyticsArray.shift(); // Remove oldest entry
      }
      
      // Save back to localStorage
      localStorage.setItem('local-analytics', JSON.stringify(analyticsArray));
    } catch (e) {
      console.error('Error storing local analytics:', e);
    }
  }
  
  // Analyze user performance and generate insights
  public generateInsights(progress: UserProgress): LearningInsight[] {
    try {
      const insights: LearningInsight[] = [];
      const localData: AnonymizedLearningData[] = this.getLocalAnalyticsData();
      
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
        ] : undefined
      });
      
      // Add difficulty-specific insights
      Object.entries(difficultyAccuracy).forEach(([difficulty, accuracy]) => {
        if (accuracy > 0) {
          insights.push({
            type: accuracy >= 70 ? 'strength' : 'weakness',
            description: `${difficulty} words: ${accuracy.toFixed(1)}% accuracy`,
            score: accuracy,
            recommendedActions: accuracy < 70 ? [
              `Practice more ${difficulty} words`,
              `Use hints for ${difficulty} words`
            ] : undefined
          });
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
  
  private getLocalAnalyticsData(): AnonymizedLearningData[] {
    try {
      const data = localStorage.getItem('local-analytics');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error retrieving local analytics:', e);
      return [];
    }
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
  
  // Get recommended words based on user performance
  public getRecommendedWords(
    availableWords: Word[],
    masteredWords: string[]
  ): Word[] {
    const localData = this.getLocalAnalyticsData();
    
    // Filter out mastered words
    const nonMasteredWords = availableWords.filter(
      word => !masteredWords.includes(word.id)
    );
    
    if (localData.length < 5 || nonMasteredWords.length <= 5) {
      // Not enough data or words to make recommendations
      return nonMasteredWords.slice(0, 5);
    }
    
    // Calculate difficulty score for each word
    const wordScores = nonMasteredWords.map(word => {
      const attempts = localData.filter(d => d.wordId === word.id);
      if (attempts.length === 0) {
        // Prioritize words not attempted yet
        return { word, score: 50 };
      }
      
      const correctAttempts = attempts.filter(d => d.isCorrect).length;
      const accuracy = correctAttempts / attempts.length;
      
      // Lower accuracy = higher priority for practice
      const priorityScore = 100 - (accuracy * 100);
      return { word, score: priorityScore };
    });
    
    // Sort by score (highest first) and return top 5
    return wordScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.word);
  }
}

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();
