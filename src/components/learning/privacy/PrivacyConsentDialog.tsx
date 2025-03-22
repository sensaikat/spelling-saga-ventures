
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { learningAnalytics } from '../../../services/analytics/learningAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataCollectionTab } from './';
import { SecurityTab } from './';

interface PrivacyConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyConsentDialog: React.FC<PrivacyConsentDialogProps> = ({
  open,
  onOpenChange
}) => {
  // Initialize consent from service
  const [consentGiven, setConsentGiven] = useState(
    learningAnalytics.hasUserConsent()
  );
  
  // Toggle for demographic data collection and personalization
  const [shareDemographics, setShareDemographics] = useState(false);
  const [allowPersonalization, setAllowPersonalization] = useState(true);
  const [encryptionLevel, setEncryptionLevel] = useState<'standard' | 'enhanced'>('standard');
  
  // Load saved preferences on open
  useEffect(() => {
    if (open) {
      const preferences = learningAnalytics.getUserPreferences();
      setShareDemographics(preferences.shareDemographics || false);
      setAllowPersonalization(preferences.allowPersonalization !== false); // Default true
      setEncryptionLevel(preferences.encryptionLevel || 'standard');
    }
  }, [open]);
  
  const handleSavePreferences = () => {
    learningAnalytics.setUserConsent(consentGiven);
    learningAnalytics.setUserPreferences({
      shareDemographics,
      allowPersonalization,
      encryptionLevel
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Privacy & Data Protection
          </DialogTitle>
          <DialogDescription>
            Control how your learning data is collected, protected and used
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collection">Data Collection</TabsTrigger>
            <TabsTrigger value="security">Security & Encryption</TabsTrigger>
          </TabsList>
          
          <TabsContent value="collection" className="space-y-4 pt-4">
            <DataCollectionTab 
              consentGiven={consentGiven}
              setConsentGiven={setConsentGiven}
              shareDemographics={shareDemographics}
              setShareDemographics={setShareDemographics}
              allowPersonalization={allowPersonalization}
              setAllowPersonalization={setAllowPersonalization}
            />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 pt-4">
            <SecurityTab 
              encryptionLevel={encryptionLevel}
              setEncryptionLevel={setEncryptionLevel}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="mb-2 sm:mb-0"
          >
            Cancel
          </Button>
          <Button onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyConsentDialog;
