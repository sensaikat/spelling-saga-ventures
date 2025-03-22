
import React from 'react';
import { Shield, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { learningAnalytics } from '../../../services/analytics/learningAnalytics';

interface PrivacyTabProps {
  onOpenPrivacyDialog: () => void;
  onExportData: () => void;
  onDeleteConfirm: () => void;
}

const PrivacyTab: React.FC<PrivacyTabProps> = ({
  onOpenPrivacyDialog,
  onExportData,
  onDeleteConfirm
}) => {
  return (
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
              onClick={onOpenPrivacyDialog}
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
              onClick={onExportData}
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
              onClick={onDeleteConfirm}
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
  );
};

export default PrivacyTab;
