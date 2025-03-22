
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, wordLists, Word } from '../utils/game';
import { learningAnalytics } from '../services/analytics/learningAnalytics';
import { LearningInsight } from '../services/analytics/types';
import { useToast } from './use-toast';

export const useLearningDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { selectedLanguage, progress } = useGameStore();
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [recommendedWords, setRecommendedWords] = useState<Word[]>([]);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const hasSeenPrivacy = localStorage.getItem('has-seen-privacy-dialog');
    if (!hasSeenPrivacy) {
      setShowPrivacyDialog(true);
      localStorage.setItem('has-seen-privacy-dialog', 'true');
    }
    
    learningAnalytics.checkAndPurgeExpiredData();
  }, []);
  
  useEffect(() => {
    if (!selectedLanguage) {
      navigate('/');
    }
  }, [selectedLanguage, navigate]);
  
  useEffect(() => {
    if (selectedLanguage && progress) {
      const learningInsights = learningAnalytics.generateInsights(progress);
      setInsights(learningInsights);
      
      const availableWordLists = wordLists[selectedLanguage.id] || [];
      const allWords: Word[] = availableWordLists.flatMap(list => list.words);
      
      const recommended = learningAnalytics.getRecommendedWords(
        allWords,
        progress.wordsMastered
      );
      setRecommendedWords(recommended);
    }
  }, [selectedLanguage, progress]);
  
  const handleExportData = () => {
    try {
      const userInsights = insights;
      const userProgress = progress;
      const userData = {
        progress: userProgress,
        insights: userInsights,
        recommendedWords: recommendedWords.map(w => w.text),
        exportDate: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `language-learning-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
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
  
  return {
    selectedLanguage,
    progress,
    insights,
    recommendedWords,
    showPrivacyDialog,
    setShowPrivacyDialog,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleExportData,
    handleDeleteAllData
  };
};
