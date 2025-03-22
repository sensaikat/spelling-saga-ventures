
export class InsightFormatters {
  public generatePersonalTip(accuracy: number): string {
    if (accuracy > 90) return "You're doing excellently! Try challenging yourself with harder words.";
    if (accuracy > 70) return "Good progress! Focus on maintaining consistency in your practice.";
    if (accuracy > 50) return "You're making progress. Try using the hint feature when needed.";
    return "Keep practicing! Consistent daily practice will improve your results.";
  }
  
  public getDifficultyTip(difficulty: string, accuracy: number): string {
    if (difficulty === 'easy' && accuracy < 70) {
      return "Focus on mastering easy words before moving to more difficult ones.";
    }
    if (difficulty === 'medium' && accuracy > 80) {
      return "You're ready for more challenging words! Try some hard level words.";
    }
    if (difficulty === 'hard' && accuracy > 70) {
      return "Impressive! You're mastering even difficult words.";
    }
    return `Keep practicing ${difficulty} words to build your skills.`;
  }
  
  public getAdaptiveLevel(difficulty: string, accuracy: number): 'easy' | 'medium' | 'hard' {
    if (difficulty === 'hard' && accuracy > 60) return 'hard';
    if (difficulty === 'medium' && accuracy > 70) return 'medium';
    if (difficulty === 'easy' && accuracy > 80) return 'medium';
    return 'easy';
  }
}
