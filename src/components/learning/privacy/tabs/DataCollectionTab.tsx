
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart } from 'lucide-react';

interface DataCollectionTabProps {
  consentGiven: boolean;
  setConsentGiven: (value: boolean) => void;
  shareDemographics: boolean;
  setShareDemographics: (value: boolean) => void;
  allowPersonalization: boolean;
  setAllowPersonalization: (value: boolean) => void;
}

const DataCollectionTab: React.FC<DataCollectionTabProps> = ({
  consentGiven,
  setConsentGiven,
  shareDemographics,
  setShareDemographics,
  allowPersonalization,
  setAllowPersonalization
}) => {
  return (
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
  );
};

export default DataCollectionTab;
