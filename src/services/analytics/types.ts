
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
