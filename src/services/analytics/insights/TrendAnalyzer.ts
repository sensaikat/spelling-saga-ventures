
import { AnonymizedLearningData, LearningInsight } from '../types';

export class TrendAnalyzer {
  public detectTrends(data: AnonymizedLearningData[]): LearningInsight | null {
    if (data.length < 10) return null;
    
    // Sort data by timestamp
    const sortedData = [...data].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Split into first half and second half
    const midpoint = Math.floor(sortedData.length / 2);
    const firstHalf = sortedData.slice(0, midpoint);
    const secondHalf = sortedData.slice(midpoint);
    
    // Calculate accuracy for both halves
    const firstHalfCorrect = firstHalf.filter(d => d.isCorrect).length;
    const secondHalfCorrect = secondHalf.filter(d => d.isCorrect).length;
    
    const firstHalfAccuracy = (firstHalfCorrect / firstHalf.length) * 100;
    const secondHalfAccuracy = (secondHalfCorrect / secondHalf.length) * 100;
    
    // Calculate the trend (improvement or decline)
    const trend = secondHalfAccuracy - firstHalfAccuracy;
    
    // Create insight based on trend
    if (Math.abs(trend) < 5) return null; // No significant trend
    
    return {
      type: trend > 0 ? 'strength' : 'weakness',
      description: trend > 0 
        ? `Your accuracy is improving! +${trend.toFixed(1)}% recently` 
        : `Your accuracy has decreased by ${Math.abs(trend).toFixed(1)}% recently`,
      score: trend > 0 ? 80 : 40,
      recommendedActions: trend <= 0 ? [
        'Try to maintain consistent practice sessions',
        'Review words you struggled with recently'
      ] : undefined
    };
  }
}
