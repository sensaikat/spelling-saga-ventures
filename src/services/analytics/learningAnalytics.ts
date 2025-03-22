
import { LearningAnalyticsService } from './core';
import { Word } from './types';

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();

// Re-export types
export { LearningInsightType } from './types';
export type { Word } from './types';

// Export LearningInsight type
export interface LearningInsight {
  type: LearningInsightType;
  title: string;
  description: string;
  score?: number;
  words?: Word[];
  metadata?: Record<string, any>;
}
