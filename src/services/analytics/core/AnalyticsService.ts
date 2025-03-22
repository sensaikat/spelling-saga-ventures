
import { Word, UserProgress, Language } from '../../../utils/game/types';
import { 
  AnonymizedLearningData, 
  PrivacyPreferences, 
  LearningInsight,
  AdaptiveSettings
} from '../types';
import { AnalyticsStorage } from '../storage';
import { InsightsGenerator } from '../insights';
import { AnalyticsSecurity } from '../security';
import { AnalyticsSettings } from './AnalyticsSettings';
import { AnalyticsRecorder } from './AnalyticsRecorder';
import { AnalyticsDataManager } from './AnalyticsDataManager';

// Core service for learning analytics
export class LearningAnalyticsService {
  private static instance: LearningAnalyticsService;
  private apiEndpoint: string = '/api/learning-analytics';
  
  // Service components
  private settings: AnalyticsSettings;
  private storage: AnalyticsStorage;
  private insights: InsightsGenerator;
  private security: AnalyticsSecurity;
  private recorder: AnalyticsRecorder;
  private dataManager: AnalyticsDataManager;
  
  private constructor() {
    // Initialize settings first
    this.settings = new AnalyticsSettings();
    
    // Initialize component services
    this.storage = new AnalyticsStorage(this.settings.getEncryptionKey());
    this.insights = new InsightsGenerator();
    this.security = new AnalyticsSecurity(
      this.settings.getPrimaryKey(),
      this.settings.getSecondaryKey()
    );
    
    this.recorder = new AnalyticsRecorder(
      this.security,
      this.storage,
      this.settings
    );
    
    this.dataManager = new AnalyticsDataManager(
      this.storage,
      this.settings
    );
  }
  
  public static getInstance(): LearningAnalyticsService {
    if (!LearningAnalyticsService.instance) {
      LearningAnalyticsService.instance = new LearningAnalyticsService();
    }
    return LearningAnalyticsService.instance;
  }
  
  // User consent and preferences delegation methods
  public setUserConsent(consent: boolean): void {
    this.settings.setUserConsent(consent);
  }
  
  public hasUserConsent(): boolean {
    return this.settings.hasUserConsent();
  }
  
  public setUserPreferences(preferences: Partial<PrivacyPreferences>): void {
    this.settings.setUserPreferences(preferences);
  }
  
  public getUserPreferences(): PrivacyPreferences {
    return this.settings.getUserPreferences();
  }
  
  public setEnabled(enabled: boolean): void {
    this.settings.setEnabled(enabled);
  }
  
  // Record word attempt - delegate to recorder
  public recordWordAttempt(
    word: Word, 
    isCorrect: boolean, 
    duration: number,
    hintsUsed: number,
    language: Language
  ): void {
    this.recorder.recordWordAttempt(word, isCorrect, duration, hintsUsed, language);
  }
  
  // Get analytics data - delegate to storage
  public getLocalAnalyticsData(): AnonymizedLearningData[] {
    return this.storage.getLocalAnalyticsData(this.settings.getUserPreferences());
  }
  
  // Analyze user performance - delegate to insights
  public generateInsights(progress: UserProgress): LearningInsight[] {
    const localData = this.getLocalAnalyticsData();
    return this.insights.generateInsights(
      localData, 
      this.settings.getUserPreferences().allowPersonalization
    );
  }
  
  // Get recommended words - delegate to insights
  public getRecommendedWords(
    availableWords: Word[],
    masteredWords: string[]
  ): Word[] {
    const localData = this.getLocalAnalyticsData();
    return this.insights.getRecommendedWords(
      availableWords,
      masteredWords,
      localData,
      this.settings.getUserPreferences().allowPersonalization
    );
  }
  
  // Get adaptive settings - delegate to insights
  public getAdaptiveSettings(): AdaptiveSettings {
    const localData = this.getLocalAnalyticsData();
    return this.insights.getAdaptiveSettings(
      localData,
      this.settings.getUserPreferences().allowPersonalization
    );
  }
  
  // Data management operations - delegate to data manager
  public purgeAllData(): boolean {
    return this.dataManager.purgeAllData();
  }
  
  public checkAndPurgeExpiredData(): void {
    this.dataManager.checkAndPurgeExpiredData();
  }
}
