import { Word, UserProgress, Language } from '../../utils/game/types';
import { encrypt, decrypt } from './encryption';

// Anonymized user data structure
export interface AnonymizedLearningData {
  userId: string; // Double hashed user ID
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

// User privacy preferences
export interface PrivacyPreferences {
  shareDemographics: boolean;
  allowPersonalization: boolean;
  encryptionLevel: 'standard' | 'enhanced';
}

// Learning insights structure
export interface LearningInsight {
  type: 'strength' | 'weakness' | 'pattern' | 'recommendation';
  description: string;
  score: number; // 0-100
  relatedWords?: string[];
  recommendedActions?: string[];
  // Personalization fields
  personalTip?: string;
  adaptiveLevel?: 'easy' | 'medium' | 'hard';
  confidenceScore?: number;
}

// Service for collecting and analyzing learning data
export class LearningAnalyticsService {
  private static instance: LearningAnalyticsService;
  private apiEndpoint: string = '/api/learning-analytics';
  private isEnabled: boolean = true;
  private userConsent: boolean = false;
  private primaryAnonymizationKey: string = '';
  private secondaryAnonymizationKey: string = '';
  private encryptionKey: string = '';
  private privacyPreferences: PrivacyPreferences = {
    shareDemographics: false,
    allowPersonalization: true,
    encryptionLevel: 'standard'
  };
  
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
      
      // Load privacy preferences
      const preferences = localStorage.getItem('privacy-preferences');
      if (preferences) {
        this.privacyPreferences = JSON.parse(preferences);
      }
      
      // Generate or load anonymization keys
      let primaryKey = localStorage.getItem('user-anon-key-primary');
      let secondaryKey = localStorage.getItem('user-anon-key-secondary');
      
      if (!primaryKey || !secondaryKey) {
        primaryKey = this.generateAnonymizationKey();
        secondaryKey = this.generateAnonymizationKey();
        localStorage.setItem('user-anon-key-primary', primaryKey);
        localStorage.setItem('user-anon-key-secondary', secondaryKey);
      }
      
      this.primaryAnonymizationKey = primaryKey;
      this.secondaryAnonymizationKey = secondaryKey;
      
      // Set encryption key based on device fingerprint (or create new one)
      this.encryptionKey = localStorage.getItem('encryption-key') || 
                          this.generateEncryptionKey();
      
      if (!localStorage.getItem('encryption-key')) {
        localStorage.setItem('encryption-key', this.encryptionKey);
      }
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
  
  private generateEncryptionKey(): string {
    // Generate a device-specific encryption key
    const navigatorInfo = 
      navigator.userAgent + 
      navigator.language + 
      (navigator.languages || []).join(',');
    
    // Simple hash function
    const hash = Array.from(navigatorInfo)
      .reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
      }, 0);
    
    return hash.toString(16) + Math.random().toString(36).slice(2);
  }
  
  public setUserConsent(consent: boolean): void {
    this.userConsent = consent;
    localStorage.setItem('analytics-consent', consent.toString());
  }
  
  public hasUserConsent(): boolean {
    return this.userConsent;
  }
  
  public setUserPreferences(preferences: Partial<PrivacyPreferences>): void {
    this.privacyPreferences = {
      ...this.privacyPreferences,
      ...preferences
    };
    localStorage.setItem('privacy-preferences', JSON.stringify(this.privacyPreferences));
  }
  
  public getUserPreferences(): PrivacyPreferences {
    return this.privacyPreferences;
  }
  
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
  
  // Double anonymize user data for maximum privacy
  private anonymizeUserId(userId: string): string {
    // First level hashing with primary key
    const firstLevel = this.hashWithSalt(userId, this.primaryAnonymizationKey);
    
    // Second level hashing with secondary key for additional security
    return this.hashWithSalt(firstLevel, this.secondaryAnonymizationKey);
  }
  
  // Simple HMAC-like hash with salt
  private hashWithSalt(data: string, salt: string): string {
    const input = data + salt;
    let hash = 0;
    
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to base64-like string
    return btoa(hash.toString()).replace(/[+/=]/g, '').slice(0, 24);
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
    };
    
    // Add demographic data only if user consented to share
    if (this.privacyPreferences.shareDemographics) {
      // In a real app, we would get these from user profile
      data.region = 'anonymous_region';
      data.ageGroup = 'anonymous_age_group';
    }
    
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
    console.log('Analytics data being stored securely:', 
      { ...data, userId: '[REDACTED FOR PRIVACY]' });
    
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
      const encryptedData = localStorage.getItem('local-analytics');
      let analyticsArray: AnonymizedLearningData[] = [];
      
      if (encryptedData) {
        // Decrypt the existing data based on the encryption level
        const decryptedData = decrypt(
          encryptedData, 
          this.encryptionKey, 
          this.privacyPreferences.encryptionLevel
        );
        analyticsArray = JSON.parse(decryptedData);
      }
      
      // Add new data and limit array size
      analyticsArray.push(data);
      if (analyticsArray.length > 100) {
        analyticsArray.shift(); // Remove oldest entry
      }
      
      // Encrypt and save back to localStorage
      const jsonData = JSON.stringify(analyticsArray);
      const encrypted = encrypt(
        jsonData, 
        this.encryptionKey, 
        this.privacyPreferences.encryptionLevel
      );
      
      localStorage.setItem('local-analytics', encrypted);
      
      // Set expiry for data purging (90 days)
      const expiryTime = new Date();
      expiryTime.setDate(expiryTime.getDate() + 90);
      localStorage.setItem('analytics-expiry', expiryTime.toISOString());
      
    } catch (e) {
      console.error('Error storing local analytics:', e);
    }
  }
  
  // Analyze user performance and generate insights
  public generateInsights(progress: UserProgress): LearningInsight[] {
    try {
      const insights: LearningInsight[] = [];
      const localData = this.getLocalAnalyticsData();
      
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
        ...(this.privacyPreferences.allowPersonalization ? {
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
          if (this.privacyPreferences.allowPersonalization) {
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
  
  private getLocalAnalyticsData(): AnonymizedLearningData[] {
    try {
      const encryptedData = localStorage.getItem('local-analytics');
      if (!encryptedData) return [];
      
      // Decrypt based on the encryption level
      const decryptedData = decrypt(
        encryptedData, 
        this.encryptionKey, 
        this.privacyPreferences.encryptionLevel
      );
      
      return JSON.parse(decryptedData);
    } catch (e) {
      console.error('Error retrieving local analytics:', e);
      return [];
    }
  }
  
  // Request immediate data deletion (right to be forgotten)
  public purgeAllData(): boolean {
    try {
      localStorage.removeItem('local-analytics');
      localStorage.removeItem('analytics-expiry');
      // Keep anonymization keys for consistent hashing
      
      console.log('All analytics data has been purged');
      return true;
    } catch (e) {
      console.error('Error purging analytics data:', e);
      return false;
    }
  }
  
  // Check if data should be purged (90 days of inactivity)
  public checkAndPurgeExpiredData(): void {
    try {
      const expiryStr = localStorage.getItem('analytics-expiry');
      if (!expiryStr) return;
      
      const expiry = new Date(expiryStr);
      const now = new Date();
      
      if (now > expiry) {
        this.purgeAllData();
      }
    } catch (e) {
      console.error('Error checking data expiry:', e);
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
    
    if (localData.length < 5 || nonMasteredWords.length <= 5 || !this.privacyPreferences.allowPersonalization) {
      // Not enough data, words, or personalization disabled
      return nonMasteredWords.slice(0, 5);
    }
    
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
    return nonMasteredWords
      .sort((a, b) => {
        // If personalization is enabled, use advanced sorting
        if (this.privacyPreferences.allowPersonalization) {
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
  
  private getWordAccuracy(wordId: string, data: AnonymizedLearningData[]): number {
    const attempts = data.filter(d => d.wordId === wordId);
    if (attempts.length === 0) return 50; // Neutral score for no attempts
    
    const correctAttempts = attempts.filter(d => d.isCorrect).length;
    return (correctAttempts / attempts.length) * 100;
  }
}

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();
