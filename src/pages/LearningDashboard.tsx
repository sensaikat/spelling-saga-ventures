
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BarChart, 
  BookOpen, 
  Settings,
  Shield,
  Brain,
  PieChart
} from 'lucide-react';
import { useGameStore, wordLists, Word } from '../utils/game';
import { 
  learningAnalytics, 
  LearningInsight 
} from '../services/analytics/learningAnalytics';
import LearningInsights from '../components/learning/LearningInsights';
import RecommendedWords from '../components/learning/RecommendedWords';
import PrivacyConsentDialog from '../components/learning/PrivacyConsentDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <motion.div 
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Home</span>
          </button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPrivacyDialog(true)}
            className="flex items-center gap-1"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy Settings</span>
          </Button>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-display text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Learning Dashboard
        </motion.h1>
        
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
            {/* Learning Insights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LearningInsights insights={insights} />
            </motion.div>
            
            {/* Recommended Words Section */}
            {recommendedWords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <RecommendedWords words={recommendedWords} />
              </motion.div>
            )}
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-8">
            {/* Progress Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Words Mastered
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{progress.wordsMastered.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +{Math.floor(progress.wordsMastered.length / 10)} this week
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Accuracy
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {progress.wordsMastered.length > 0 
                        ? `${Math.round((progress.wordsMastered.length / 
                            (progress.wordsMastered.length + 
                             Object.keys(progress.wordsInProgress).length)) * 100)}%`
                        : "0%"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on your practice history
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Learning Streak
                    </CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{progress.streakDays} days</div>
                    <p className="text-xs text-muted-foreground">
                      Keep the streak going!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            
            {/* Difficulty Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Difficulty Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-gray-500">
                    <p>Difficulty distribution chart would appear here</p>
                    {/* In a real implementation, use Recharts to create a visualization */}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
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
