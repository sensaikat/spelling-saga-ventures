
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, PieChart } from 'lucide-react';
import { useGameStore, wordLists, Word } from '../utils/game';
import { 
  learningAnalytics, 
  LearningInsight 
} from '../services/analytics/learningAnalytics';
import PrivacyConsentDialog from '../components/learning/PrivacyConsentDialog';
import DashboardHeader from '../components/learning/DashboardHeader';
import InsightsTab from '../components/learning/InsightsTab';
import StatisticsTab from '../components/learning/StatisticsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LearningDashboard = () => {
  const navigate = useNavigate();
  const { selectedLanguage, progress } = useGameStore();
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [recommendedWords, setRecommendedWords] = useState<Word[]>([]);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  
  // Show privacy dialog on first visit
  useEffect(() => {
    const hasSeenPrivacy = localStorage.getItem('has-seen-privacy-dialog');
    if (!hasSeenPrivacy) {
      setShowPrivacyDialog(true);
      localStorage.setItem('has-seen-privacy-dialog', 'true');
    }
  }, []);
  
  // Guard for direct access
  useEffect(() => {
    if (!selectedLanguage) {
      navigate('/');
    }
  }, [selectedLanguage, navigate]);
  
  // Generate insights and recommendations
  useEffect(() => {
    if (selectedLanguage && progress) {
      // Generate insights from analytics service
      const learningInsights = learningAnalytics.generateInsights(progress);
      setInsights(learningInsights);
      
      // Get all words for the selected language
      const availableWordLists = wordLists[selectedLanguage.id] || [];
      const allWords: Word[] = availableWordLists.flatMap(list => list.words);
      
      // Get recommended words
      const recommended = learningAnalytics.getRecommendedWords(
        allWords,
        progress.wordsMastered
      );
      setRecommendedWords(recommended);
    }
  }, [selectedLanguage, progress]);
  
  if (!selectedLanguage) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader onOpenPrivacyDialog={() => setShowPrivacyDialog(true)} />
        
        <Tabs defaultValue="insights" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Learning Insights</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="insights" className="space-y-8">
            <InsightsTab insights={insights} recommendedWords={recommendedWords} />
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-8">
            <StatisticsTab progress={progress} />
          </TabsContent>
        </Tabs>
      </div>
      
      <PrivacyConsentDialog 
        open={showPrivacyDialog} 
        onOpenChange={setShowPrivacyDialog} 
      />
    </div>
  );
};

export default LearningDashboard;
