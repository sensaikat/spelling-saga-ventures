
import React, { ReactNode } from 'react';
import { useSubscriptionStore } from '../../utils/subscription';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface FreemiumFeatureGateProps {
  feature: string;
  fallback?: ReactNode;
  children: ReactNode;
}

const FreemiumFeatureGate = ({ feature, fallback, children }: FreemiumFeatureGateProps) => {
  const navigate = useNavigate();
  const { checkAccess } = useSubscriptionStore();
  const [showUpgradeDialog, setShowUpgradeDialog] = React.useState(false);
  
  // Map feature string to the correct feature key
  const featureKey = feature === 'reports' 
    ? 'reports' 
    : feature === 'multiLanguage' 
      ? 'multiLanguage' 
      : feature === 'adventureMode' 
        ? 'adventureMode' 
        : feature === 'offlineMode' 
          ? 'offlineMode' 
          : 'reports'; // default
  
  const hasAccess = checkAccess(featureKey as any);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  const handleUpgradeClick = () => {
    setShowUpgradeDialog(false);
    navigate('/subscription');
  };
  
  const defaultFallback = (
    <div className="bg-gray-100 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <Lock className="text-gray-500" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
      <p className="text-gray-600 mb-4">
        Upgrade to access {feature === 'reports' 
          ? 'detailed learning reports' 
          : feature === 'multiLanguage' 
            ? 'multi-language mode' 
            : feature === 'adventureMode' 
              ? 'adventure mode' 
              : feature === 'offlineMode' 
                ? 'offline mode' 
                : 'premium features'}
      </p>
      <Button onClick={() => setShowUpgradeDialog(true)}>
        Upgrade Now
      </Button>
      
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock Premium Features</DialogTitle>
            <DialogDescription>
              Upgrade to Premium to access all features including {feature}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="font-medium mb-2">With Premium you get:</h3>
            <ul className="space-y-1 list-disc list-inside text-gray-600">
              <li>Access to all languages</li>
              <li>Unlimited gameplay</li>
              <li>Advanced progress reports</li>
              <li>Multi-language mode</li>
              <li>Adventure mode</li>
              <li>Offline mode</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Not Now
            </Button>
            <Button onClick={handleUpgradeClick}>
              View Subscription Plans
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
  return <>{fallback || defaultFallback}</>;
};

export default FreemiumFeatureGate;
