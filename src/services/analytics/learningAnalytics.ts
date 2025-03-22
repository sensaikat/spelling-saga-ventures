import { LearningAnalyticsService } from './core';
import { LearningInsightType, Word } from './types';

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();

// Re-export the types for easier access
export type { LearningInsight, AdaptiveSettings, PrivacyPreferences } from './types';

// Re-export LearningInsight type
export interface LearningInsight {
  type: LearningInsightType;
  title: string;
  description: string;
  score?: number;
  words?: Word[];
  metadata?: Record<string, any>;
}
