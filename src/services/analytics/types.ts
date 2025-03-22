
import { Word, UserProgress, Language } from '../../utils/game/types';

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
  // New fields for better pattern recognition
  mistakePattern?: string; // Common error pattern (if any)
  attemptCount?: number; // How many attempts for this word
  lettersCorrect?: number; // How many letters were correct
  // Demographic info (optional)
  region?: string;
  ageGroup?: string;
  gender?: string;
}

// Learning pattern types
export type PatternType = 'phonetic' | 'visual' | 'structural' | 'semantic' | 'memory';

// Pattern detection results
export interface LearningPattern {
  type: PatternType;
  confidence: number; // 0-100
  relatedWords: string[];
  description: string;
  recommendedApproach: string;
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
  patternType?: PatternType;
  // Personalization fields
  personalTip?: string;
  adaptiveLevel?: 'easy' | 'medium' | 'hard';
  confidenceScore?: number;
}

// Adaptive challenge settings
export interface AdaptiveSettings {
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
  focusAreas: string[]; // Word patterns to focus on
  challengeLevel: number; // 1-10 scale
  hintFrequency: 'low' | 'medium' | 'high';
  repeatInterval: number; // Days until word should be repeated
}
