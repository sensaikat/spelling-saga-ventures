
import React from 'react';
import { Brain, PieChart, Shield } from 'lucide-react';
import { useLearningDashboard } from '../hooks/useLearningDashboard';
import PrivacyConsentDialog from '../components/learning/PrivacyConsentDialog';
import DashboardHeader from '../components/learning/DashboardHeader';
import InsightsTab from '../components/learning/InsightsTab';
import StatisticsTab from '../components/learning/StatisticsTab';
import { PrivacyTab } from '../components/learning/tabs';
import DeleteConfirmDialog from '../components/learning/DeleteConfirmDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LearningDashboard = () => {
  const {
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
  } = useLearningDashboard();
  
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
            <PrivacyTab 
              onOpenPrivacyDialog={() => setShowPrivacyDialog(true)}
              onExportData={handleExportData}
              onDeleteConfirm={() => setShowDeleteConfirm(true)}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <PrivacyConsentDialog 
        open={showPrivacyDialog} 
        onOpenChange={setShowPrivacyDialog} 
      />
      
      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirmDelete={handleDeleteAllData}
      />
    </div>
  );
};

export default LearningDashboard;
