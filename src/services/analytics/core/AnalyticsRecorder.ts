
import { Word, Language } from '../../../utils/game/types';
import { AnonymizedLearningData } from '../types';
import { AnalyticsStorage } from '../storage';
import { AnalyticsSecurity } from '../security';
import { AnalyticsSettings } from './AnalyticsSettings';

export class AnalyticsRecorder {
  private security: AnalyticsSecurity;
  private storage: AnalyticsStorage;
  private settings: AnalyticsSettings;
  
  constructor(
    security: AnalyticsSecurity,
    storage: AnalyticsStorage,
    settings: AnalyticsSettings
  ) {
    this.security = security;
    this.storage = storage;
    this.settings = settings;
  }
  
  // Record word attempt data with enhanced analytics
  public recordWordAttempt(
    word: Word, 
    isCorrect: boolean, 
    duration: number,
    hintsUsed: number,
    language: Language
  ): void {
    if (!this.settings.isAnalyticsEnabled()) return;
    
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
    if (this.settings.getUserPreferences().shareDemographics) {
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
    this.storage.storeLocalAnalytics(data, this.settings.getUserPreferences());
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
}
