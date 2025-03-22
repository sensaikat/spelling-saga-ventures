
import React from 'react';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lock, Info } from 'lucide-react';

interface SecurityTabProps {
  encryptionLevel: 'standard' | 'enhanced';
  setEncryptionLevel: (level: 'standard' | 'enhanced') => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({
  encryptionLevel,
  setEncryptionLevel
}) => {
  return (
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
  );
};

export default SecurityTab;
