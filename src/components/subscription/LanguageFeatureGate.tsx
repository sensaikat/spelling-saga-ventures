
import React from 'react';
import { useSubscriptionStore } from '../../utils/subscription';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Language } from '../../utils/game';
import { freeTierLanguages } from '../../utils/subscription/plans';

interface LanguageFeatureGateProps {
  language: Language;
  availableLanguageIds: string[];
  children: React.ReactNode;
}

const LanguageFeatureGate = ({ language, availableLanguageIds, children }: LanguageFeatureGateProps) => {
  const navigate = useNavigate();
  const { hasLanguageAccess } = useSubscriptionStore();
  
  // Check if the language is in the free tier list
  const isFreeTier = freeTierLanguages.includes(language.id);
  
  // Allow access if language is in free tier or user has premium access
  const hasAccess = isFreeTier || hasLanguageAccess(language.id, availableLanguageIds);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  return (
    <div className="relative rounded-xl overflow-hidden opacity-70">
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-10">
        <div className="text-center p-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
            <Lock className="text-gray-800" size={22} />
          </div>
          <h3 className="text-white font-bold mb-2">Premium Language</h3>
          <p className="text-white text-sm mb-3">
            Upgrade to access {language.nativeName}
          </p>
          <Button 
            size="sm"
            onClick={() => navigate('/subscription')}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            Upgrade Now
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default LanguageFeatureGate;
