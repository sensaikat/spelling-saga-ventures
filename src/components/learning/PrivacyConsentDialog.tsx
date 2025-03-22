
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Info, Lock, LineChart } from 'lucide-react';
import { learningAnalytics } from '../../services/analytics/learningAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
            <ScrollArea className="max-h-[40vh] pr-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-blue-600" />
                    Learning Analytics
                  </h3>
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
                
                {consentGiven && (
                  <>
                    <div className="space-y-2">
                      <h3 className="font-medium">Personalization</h3>
                      <p className="text-sm text-gray-600">
                        Allow us to use your learning patterns to personalize your learning experience
                        with tailored suggestions and adaptive difficulty.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Label htmlFor="personalization-consent" className="cursor-pointer">
                          Enable personalized learning
                        </Label>
                        <Switch 
                          id="personalization-consent" 
                          checked={allowPersonalization}
                          onCheckedChange={setAllowPersonalization}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Optional Demographics</h3>
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
                  </>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 pt-4">
            <ScrollArea className="max-h-[40vh] pr-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-600" />
                    Data Encryption
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose how your data is encrypted and protected when stored locally.
                  </p>
                  <div className="flex flex-col space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="standard-encryption"
                        name="encryption-level"
                        checked={encryptionLevel === 'standard'}
                        onChange={() => setEncryptionLevel('standard')}
                        className="text-blue-600"
                      />
                      <Label htmlFor="standard-encryption" className="cursor-pointer">
                        Standard Encryption (AES-128)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="enhanced-encryption"
                        name="encryption-level"
                        checked={encryptionLevel === 'enhanced'}
                        onChange={() => setEncryptionLevel('enhanced')}
                        className="text-blue-600"
                      />
                      <Label htmlFor="enhanced-encryption" className="cursor-pointer">
                        Enhanced Encryption (AES-256)
                      </Label>
                    </div>
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
                    <li>Double anonymization with secure one-way hashing</li>
                    <li>Local encryption of all stored data</li>
                    <li>Automated data purging after 90 days of inactivity</li>
                    <li>Full right-to-be-forgotten compliance</li>
                    <li>Insights are processed locally on your device</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
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
