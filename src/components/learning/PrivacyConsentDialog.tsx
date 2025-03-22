
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Info } from 'lucide-react';
import { learningAnalytics } from '../../services/analytics/learningAnalytics';

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
  
  // Toggle for demographic data collection
  const [shareDemographics, setShareDemographics] = useState(false);
  
  const handleSavePreferences = () => {
    learningAnalytics.setUserConsent(consentGiven);
    // In a real app, you'd also save demographic sharing preference
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Privacy & Data Collection
          </DialogTitle>
          <DialogDescription>
            Control how your learning data is used to improve your experience
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <h3 className="font-medium">Learning Analytics</h3>
              <p className="text-sm text-gray-600">
                We collect anonymized data about your learning patterns to provide 
                personalized recommendations and improve your experience.
              </p>
              <div className="flex items-center justify-between mt-2">
                <Label htmlFor="analytics-consent" className="cursor-pointer">
                  Enable learning analytics
                </Label>
                <Switch 
                  id="analytics-consent" 
                  checked={consentGiven}
                  onCheckedChange={setConsentGiven}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Demographic Information (Optional)</h3>
              <p className="text-sm text-gray-600">
                You can optionally share anonymized demographic information to help us 
                improve learning content for different user groups.
              </p>
              <div className="flex items-center justify-between mt-2">
                <Label htmlFor="demographic-consent" className="cursor-pointer">
                  Share demographic data
                </Label>
                <Switch 
                  id="demographic-consent" 
                  checked={shareDemographics}
                  onCheckedChange={setShareDemographics}
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Data Protection</h4>
                  <p className="text-sm text-blue-700">
                    Your data is anonymized and protected according to GDPR, CCPA, and 
                    other international privacy standards.
                  </p>
                </div>
              </div>
              <ul className="text-sm text-blue-700 ml-7 space-y-1 list-disc">
                <li>All data is anonymized using secure hashing</li>
                <li>Your progress data is never shared with third parties</li>
                <li>You can request deletion of your data at any time</li>
                <li>Analytics insights are processed locally when possible</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        
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
