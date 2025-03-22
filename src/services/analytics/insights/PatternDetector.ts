
import { AnonymizedLearningData, LearningPattern, PatternType } from '../types';
import { Word } from '../../../utils/game/types';

export class PatternDetector {
  // Detect learning patterns in user data
  public detectLearningPatterns(data: AnonymizedLearningData[]): LearningPattern[] {
    const patterns: LearningPattern[] = [];
    
    // Detect phonetic patterns (similar sounding words)
    const phoneticAccuracy = this.calculatePatternAccuracy(data, 'phonetic');
    patterns.push({
      type: 'phonetic',
      confidence: phoneticAccuracy,
      relatedWords: this.getWordsByPattern(data, 'phonetic'),
      description: `Phonetic patterns: ${phoneticAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: phoneticAccuracy < 70 
        ? "Practice sound-by-sound pronunciation and listen to word audio more frequently" 
        : "Continue focusing on word sounds and pronunciation"
    });
    
    // Detect visual patterns (word appearance)
    const visualAccuracy = this.calculatePatternAccuracy(data, 'visual');
    patterns.push({
      type: 'visual',
      confidence: visualAccuracy,
      relatedWords: this.getWordsByPattern(data, 'visual'),
      description: `Visual word patterns: ${visualAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: visualAccuracy < 70 
        ? "Focus on word shapes and letter patterns" 
        : "Your visual word recognition is strong"
    });
    
    // Detect structural patterns (word length, complexity)
    const structuralAccuracy = this.calculatePatternAccuracy(data, 'structural');
    patterns.push({
      type: 'structural',
      confidence: structuralAccuracy,
      relatedWords: this.getWordsByPattern(data, 'structural'),
      description: `Word structure: ${structuralAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: structuralAccuracy < 70 
        ? "Break down longer words into smaller parts" 
        : "You handle word structure well"
    });
    
    // Detect memory patterns (recall ability)
    const memoryAccuracy = this.calculatePatternAccuracy(data, 'memory');
    patterns.push({
      type: 'memory',
      confidence: memoryAccuracy,
      relatedWords: this.getWordsByPattern(data, 'memory'),
      description: `Word recall: ${memoryAccuracy.toFixed(0)}% mastery`,
      recommendedApproach: memoryAccuracy < 70 
        ? "Practice word recall with spaced repetition" 
        : "Your word memory is strong"
    });
    
    return patterns;
  }
  
  public calculatePatternAccuracy(data: AnonymizedLearningData[], patternType: PatternType): number {
    // This is a simplified implementation
    // In a real app, this would use more sophisticated pattern matching algorithms
    
    // For now, just return a general accuracy based on word type
    switch (patternType) {
      case 'phonetic':
        // Words with difficult pronunciation
        const phoneticData = data.filter(d => 
          d.mistakePattern === 'pronunciation' || 
          d.difficulty === 'hard'
        );
        return phoneticData.length > 0 
          ? (phoneticData.filter(d => d.isCorrect).length / phoneticData.length) * 100 
          : 75;
        
      case 'visual':
        // Words with similar visual patterns
        const visualData = data.filter(d => 
          d.mistakePattern === 'visual' || 
          (d.lettersCorrect && d.lettersCorrect > 0)
        );
        return visualData.length > 0 
          ? (visualData.filter(d => d.isCorrect).length / visualData.length) * 100 
          : 70;
        
      case 'structural':
        // Longer, more complex words
        const structuralData = data.filter(d => 
          d.difficulty === 'hard' || 
          d.difficulty === 'medium'
        );
        return structuralData.length > 0 
          ? (structuralData.filter(d => d.isCorrect).length / structuralData.length) * 100 
          : 65;
        
      case 'memory':
        // Words that require multiple attempts
        const memoryData = data.filter(d => 
          d.attemptCount && d.attemptCount > 1
        );
        return memoryData.length > 0 
          ? (memoryData.filter(d => d.isCorrect).length / memoryData.length) * 100 
          : 80;
        
      case 'semantic':
      default:
        return 70; // Default accuracy
    }
  }
  
  public getWordsByPattern(data: AnonymizedLearningData[], patternType: PatternType): string[] {
    // Extract unique word IDs that match the pattern
    const matchingData = data.filter(d => {
      switch (patternType) {
        case 'phonetic':
          return d.mistakePattern === 'pronunciation' || d.difficulty === 'hard';
        case 'visual':
          return d.mistakePattern === 'visual' || (d.lettersCorrect && d.lettersCorrect > 0);
        case 'structural':
          return d.difficulty === 'hard' || d.difficulty === 'medium';
        case 'memory':
          return d.attemptCount && d.attemptCount > 1;
        default:
          return false;
      }
    });
    
    return Array.from(new Set(matchingData.map(d => d.wordId)));
  }
  
  public wordMatchesPatterns(word: Word, patterns: LearningPattern[]): boolean {
    // Check if the word matches any of the weak pattern types
    // This is a simplified implementation
    if (patterns.length === 0) return false;
    
    // Check if the word difficulty matches pattern types
    if (patterns.some(p => p.type === 'structural') && word.difficulty === 'hard') {
      return true;
    }
    
    // Check if the word is in any of the related words lists
    return patterns.some(p => p.relatedWords.includes(word.id));
  }
  
  public calculateAverageTime(data: AnonymizedLearningData[]): number {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.attemptDuration, 0);
    return sum / data.length;
  }
  
  public calculateAverageHints(data: AnonymizedLearningData[]): number {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.hintsUsed, 0);
    return sum / data.length;
  }
  
  public calculateMemoryRetention(data: AnonymizedLearningData[]): number {
    // Calculate how well words are retained over time
    // Higher number = better retention
    // This is a simplified implementation
    
    if (data.length < 10) return 50; // Not enough data
    
    // Group attempts by wordId
    const wordAttempts: Record<string, AnonymizedLearningData[]> = {};
    data.forEach(attempt => {
      if (!wordAttempts[attempt.wordId]) {
        wordAttempts[attempt.wordId] = [];
      }
      wordAttempts[attempt.wordId].push(attempt);
    });
    
    // Calculate improvement rates for words with multiple attempts
    let totalImprovement = 0;
    let wordsWithMultipleAttempts = 0;
    
    Object.values(wordAttempts).forEach(attempts => {
      if (attempts.length > 1) {
        // Sort by timestamp
        attempts.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        // Calculate improvement from first to last attempt
        const firstCorrect = attempts[0].isCorrect ? 1 : 0;
        const lastCorrect = attempts[attempts.length - 1].isCorrect ? 1 : 0;
        const improvement = lastCorrect - firstCorrect;
        
        totalImprovement += improvement;
        wordsWithMultipleAttempts++;
      }
    });
    
    if (wordsWithMultipleAttempts === 0) return 50;
    
    // Scale to 0-100
    const averageImprovement = totalImprovement / wordsWithMultipleAttempts;
    return 50 + (averageImprovement * 50);
  }
  
  public getWordAccuracy(wordId: string, data: AnonymizedLearningData[]): number {
    const attempts = data.filter(d => d.wordId === wordId);
    if (attempts.length === 0) return 50; // Neutral score for no attempts
    
    const correctAttempts = attempts.filter(d => d.isCorrect).length;
    return (correctAttempts / attempts.length) * 100;
  }
}
