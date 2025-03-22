
import { Word, UserProgress, Language } from '../../utils/game/types';
import { 
  AnonymizedLearningData, 
  PrivacyPreferences, 
  LearningInsight,
  AdaptiveSettings
} from './types';
import { AnalyticsStorage } from './storage';
import { InsightsGenerator } from './insights';
import { AnalyticsSecurity } from './security';

// Service for collecting and analyzing learning data
export class LearningAnalyticsService {
  private static instance: LearningAnalyticsService;
  private apiEndpoint: string = '/api/learning-analytics';
  private isEnabled: boolean = true;
  private userConsent: boolean = false;
  private encryptionKey: string = '';
  private privacyPreferences: PrivacyPreferences = {
    shareDemographics: false,
    allowPersonalization: true,
    encryptionLevel: 'standard'
  };
  
  // Service components
  private storage: AnalyticsStorage;
  private insights: InsightsGenerator;
  private security: AnalyticsSecurity;
  
  private constructor() {
    // Initialize with stored consent if available
    this.loadSettings();
    
    // Initialize component services
    this.storage = new AnalyticsStorage(this.encryptionKey);
    this.insights = new InsightsGenerator();
    this.security = new AnalyticsSecurity(
      localStorage.getItem('user-anon-key-primary') || '',
      localStorage.getItem('user-anon-key-secondary') || ''
    );
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
        const security = new AnalyticsSecurity('', '');
        primaryKey = security.generateAnonymizationKey();
        secondaryKey = security.generateAnonymizationKey();
        localStorage.setItem('user-anon-key-primary', primaryKey);
        localStorage.setItem('user-anon-key-secondary', secondaryKey);
      }
      
      // Set encryption key based on device fingerprint (or create new one)
      this.encryptionKey = localStorage.getItem('encryption-key') || 
                          new AnalyticsSecurity('', '').generateEncryptionKey();
      
      if (!localStorage.getItem('encryption-key')) {
        localStorage.setItem('encryption-key', this.encryptionKey);
      }
    } catch (e) {
      console.error('Error loading analytics settings:', e);
      this.userConsent = false;
    }
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
  
  // Record word attempt data with enhanced analytics
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
      userId: this.security.anonymizeUserId('user-id'), // In real app, use actual user ID
      sessionId: localStorage.getItem('session-id') || `session-${Date.now()}`,
      timestamp: new Date().toISOString(),
      languageId: language.id,
      wordId: word.id,
      isCorrect,
      attemptDuration: duration,
      hintsUsed,
      difficulty: word.difficulty,
      // Enhanced analytics - we'd calculate these in a real app
      attemptCount: 1, // Would track this across sessions
      lettersCorrect: isCorrect ? word.text.length : Math.floor(word.text.length * 0.7) // Simplified
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
    this.storage.storeLocalAnalytics(data, this.privacyPreferences);
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
  
  // Get all analytics data (for generating insights)
  public getLocalAnalyticsData(): AnonymizedLearningData[] {
    return this.storage.getLocalAnalyticsData(this.privacyPreferences);
  }
  
  // Analyze user performance and generate insights
  public generateInsights(progress: UserProgress): LearningInsight[] {
    const localData = this.getLocalAnalyticsData();
    return this.insights.generateInsights(
      localData, 
      this.privacyPreferences.allowPersonalization
    );
  }
  
  // Get recommended words based on user performance
  public getRecommendedWords(
    availableWords: Word[],
    masteredWords: string[]
  ): Word[] {
    const localData = this.getLocalAnalyticsData();
    return this.insights.getRecommendedWords(
      availableWords,
      masteredWords,
      localData,
      this.privacyPreferences.allowPersonalization
    );
  }
  
  // Get adaptive settings for personalized gameplay
  public getAdaptiveSettings(): AdaptiveSettings {
    const localData = this.getLocalAnalyticsData();
    return this.insights.getAdaptiveSettings(
      localData,
      this.privacyPreferences.allowPersonalization
    );
  }
  
  // Request immediate data deletion (right to be forgotten)
  public purgeAllData(): boolean {
    return this.storage.purgeAllData();
  }
  
  // Check if data should be purged (90 days of inactivity)
  public checkAndPurgeExpiredData(): void {
    this.storage.checkAndPurgeExpiredData();
  }
}

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();
// Re-export the types for easier access
export type { LearningInsight, AdaptiveSettings, PrivacyPreferences } from './types';
