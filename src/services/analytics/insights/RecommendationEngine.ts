import { AnonymizedLearningData, AdaptiveSettings, LearningPattern } from '../types';
import { Word } from '../../../utils/game/types';
import { PatternDetector } from './PatternDetector';

export class RecommendationEngine {
  // Get recommended words based on user performance
  public getRecommendedWords(
    availableWords: Word[],
    masteredWords: string[],
    localData: AnonymizedLearningData[],
    allowPersonalization: boolean,
    patternDetector: PatternDetector
  ): Word[] {
    // Filter out mastered words
    const nonMasteredWords = availableWords.filter(
      word => !masteredWords.includes(word.id)
    );
    
    if (localData.length < 5 || nonMasteredWords.length <= 5 || !allowPersonalization) {
      // Not enough data, words, or personalization disabled
      return nonMasteredWords.slice(0, 5);
    }
    
    // Detect learning patterns to find recommended focus areas
    const patterns = patternDetector.detectLearningPatterns(localData);
    const weakPatterns = patterns.filter(p => p.confidence < 70);
    
    // Sort by score (highest first) and return top 5
    return nonMasteredWords
      .sort((a, b) => {
        // If personalization is enabled, use advanced sorting
        if (allowPersonalization) {
          // Get attempts for both words
          const attemptsA = localData.filter(d => d.wordId === a.id);
          const attemptsB = localData.filter(d => d.wordId === b.id);
          
          // Check if words match weak pattern areas
          const aMatchesWeakPattern = patternDetector.wordMatchesPatterns(a, weakPatterns);
          const bMatchesWeakPattern = patternDetector.wordMatchesPatterns(b, weakPatterns);
          
          // Prioritize words that match weak patterns
          if (aMatchesWeakPattern && !bMatchesWeakPattern) return -1;
          if (bMatchesWeakPattern && !aMatchesWeakPattern) return 1;
          
          // Prioritize words with fewer attempts
          if (attemptsA.length === 0 && attemptsB.length > 0) return -1;
          if (attemptsB.length === 0 && attemptsA.length > 0) return 1;
          
          // Otherwise prioritize words with lower accuracy
          const accuracyA = patternDetector.getWordAccuracy(a.id, localData);
          const accuracyB = patternDetector.getWordAccuracy(b.id, localData);
          
          return accuracyA - accuracyB;
        }
        
        // Default to random order if personalization disabled
        return Math.random() - 0.5;
      })
      .slice(0, 5);
  }
  
  // Get adaptive game settings based on user performance
  public getAdaptiveSettings(
    localData: AnonymizedLearningData[],
    allowPersonalization: boolean,
    patternDetector: PatternDetector
  ): AdaptiveSettings {
    // Default settings
    const defaultSettings: AdaptiveSettings = {
      recommendedDifficulty: 'medium',
      focusAreas: [],
      challengeLevel: 5,
      hintFrequency: 'medium',
      repeatInterval: 3
    };
    
    if (!allowPersonalization || localData.length < 10) {
      return defaultSettings;
    }
    
    try {
      // Calculate overall accuracy
      const correctAttempts = localData.filter(data => data.isCorrect).length;
      const accuracyRate = (correctAttempts / localData.length) * 100;
      
      // Determine appropriate difficulty
      let recommendedDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
      if (accuracyRate > 85) {
        recommendedDifficulty = 'hard';
      } else if (accuracyRate < 60) {
        recommendedDifficulty = 'easy';
      }
      
      // Determine challenge level (1-10)
      const challengeLevel = Math.max(1, Math.min(10, Math.round(accuracyRate / 10)));
      
      // Calculate hint frequency based on previous hint usage
      const avgHints = patternDetector.calculateAverageHints(localData);
      let hintFrequency: 'low' | 'medium' | 'high' = 'medium';
      if (avgHints > 1.5) {
        hintFrequency = 'high';
      } else if (avgHints < 0.5) {
        hintFrequency = 'low';
      }
      
      // Identify focus areas based on learning patterns
      const patterns = patternDetector.detectLearningPatterns(localData);
      const weakPatterns = patterns
        .filter(p => p.confidence < 65)
        .map(p => p.type);
      
      // Set repeat interval based on memory retention
      const memoryRetention = patternDetector.calculateMemoryRetention(localData);
      const repeatInterval = Math.max(1, Math.round(memoryRetention / 20));
      
      return {
        recommendedDifficulty,
        focusAreas: Array.from(new Set(weakPatterns)),
        challengeLevel,
        hintFrequency,
        repeatInterval
      };
    } catch (e) {
      console.error('Error generating adaptive settings:', e);
      return defaultSettings;
    }
  }
}
