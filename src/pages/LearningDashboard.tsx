
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, PieChart, Shield, Download, Trash2 } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '../hooks/use-toast';

const LearningDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { selectedLanguage, progress } = useGameStore();
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [recommendedWords, setRecommendedWords] = useState<Word[]>([]);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Show privacy dialog on first visit
  useEffect(() => {
    const hasSeenPrivacy = localStorage.getItem('has-seen-privacy-dialog');
    if (!hasSeenPrivacy) {
      setShowPrivacyDialog(true);
      localStorage.setItem('has-seen-privacy-dialog', 'true');
    }
    
    // Check for expired data
    learningAnalytics.checkAndPurgeExpiredData();
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
  
  const handleExportData = () => {
    try {
      // Create a download of the user's data
      const userInsights = insights;
      const userProgress = progress;
      const userData = {
        progress: userProgress,
        insights: userInsights,
        recommendedWords: recommendedWords.map(w => w.word),
        exportDate: new Date().toISOString(),
      };
      
      // Create a downloadable file
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `language-learning-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Data exported successfully",
        description: "Your learning data has been exported to a JSON file.",
        duration: 3000,
      });
    } catch (e) {
      console.error("Error exporting data:", e);
      toast({
        title: "Export failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleDeleteAllData = () => {
    try {
      const success = learningAnalytics.purgeAllData();
      setShowDeleteConfirm(false);
      
      if (success) {
        toast({
          title: "Data deleted",
          description: "All your learning analytics data has been permanently deleted.",
          duration: 3000,
        });
        
        // Refresh insights after deletion
        setInsights([{
          type: 'recommendation',
          description: 'Your data has been deleted. Complete more exercises to receive new insights.',
          score: 50,
          recommendedActions: ['Practice at least 10 words to get started']
        }]);
      } else {
        toast({
          title: "Deletion failed",
          description: "There was an error deleting your data.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (e) {
      console.error("Error deleting data:", e);
      setShowDeleteConfirm(false);
      toast({
        title: "Deletion failed",
        description: "There was an error deleting your data.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  if (!selectedLanguage) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader onOpenPrivacyDialog={() => setShowPrivacyDialog(true)} />
        
        <Tabs defaultValue="insights" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Learning Insights</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Data & Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="insights" className="space-y-8">
            <InsightsTab insights={insights} recommendedWords={recommendedWords} />
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-8">
            <StatisticsTab progress={progress} />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Data Protection & Privacy
              </h2>
              
              <p className="text-gray-600 mb-6">
                Your data privacy is important to us. Here you can manage your learning data, 
                adjust privacy settings, and exercise your rights.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Data Controls</h3>
                  
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div>
                      <p className="font-medium">Privacy Settings</p>
                      <p className="text-sm text-gray-600">Manage how your data is collected and used</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPrivacyDialog(true)}
                    >
                      Settings
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div>
                      <p className="font-medium">Export Your Data</p>
                      <p className="text-sm text-gray-600">Download a copy of your learning data</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleExportData}
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div>
                      <p className="font-medium">Delete All Data</p>
                      <p className="text-sm text-gray-600">Permanently remove all your analytics data</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-2"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">About Your Data</h3>
                  
                  <div className="border rounded-md p-4 space-y-3">
                    <div>
                      <p className="font-medium">Data Collection Status</p>
                      <p className="text-sm text-green-600">
                        {learningAnalytics.hasUserConsent() 
                          ? "Data collection is enabled" 
                          : "Data collection is disabled"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Data Protection</p>
                      <p className="text-sm text-gray-600">
                        Your data is {learningAnalytics.getUserPreferences().encryptionLevel === 'enhanced' 
                          ? "protected with enhanced encryption" 
                          : "protected with standard encryption"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Personalization</p>
                      <p className="text-sm text-gray-600">
                        Personalized learning is {learningAnalytics.getUserPreferences().allowPersonalization 
                          ? "enabled" 
                          : "disabled"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Data Retention</p>
                      <p className="text-sm text-gray-600">
                        Your data is automatically deleted after 90 days of inactivity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <PrivacyConsentDialog 
        open={showPrivacyDialog} 
        onOpenChange={setShowPrivacyDialog} 
      />
      
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete All Analytics Data</DialogTitle>
            <DialogDescription>
              This will permanently delete all your learning analytics data. 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAllData}>
              Delete All Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningDashboard;
