
import { LearningAnalyticsService } from './core';

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();

// Re-export the types for easier access
export type { LearningInsight, AdaptiveSettings, PrivacyPreferences } from './types';
