
import { LearningAnalyticsService } from './core';

// Export singleton instance
export const learningAnalytics = LearningAnalyticsService.getInstance();

// LearningInsightType enum
export enum LearningInsightType {
  SPELLING_PATTERN = 'spelling_pattern',
  WEEKLY_PROGRESS = 'weekly_progress',
  COMMON_MISTAKES = 'common_mistakes',
  STRENGTH_AREA = 'strength_area',
  RECOMMENDED_WORDS = 'recommended_words'
}

// Export Word type
export interface Word {
  id: string;
  text: string;
  difficulty: string;
  category?: string;
  language?: string;
  translation?: string;
}

// Export LearningInsight type
export interface LearningInsight {
  type: LearningInsightType;
  title: string;
  description: string;
  score?: number;
  words?: Word[];
  metadata?: Record<string, any>;
}
