
import React from 'react';
import { useSubscriptionStore, isPlanActive } from '../../utils/subscription';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Crown, Calendar } from 'lucide-react';

const SubscriptionInfo = () => {
  const navigate = useNavigate();
  const { subscription } = useSubscriptionStore();
  const isActive = isPlanActive(subscription);
  
  // Format the expiration date in a user-friendly way
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dateString: string | null) => {
    if (!dateString) return 0;
    
    const expiryDate = new Date(dateString);
    const today = new Date();
    
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const daysRemaining = subscription.expiresAt 
    ? getDaysRemaining(subscription.expiresAt) 
    : subscription.trialEndsAt 
      ? getDaysRemaining(subscription.trialEndsAt)
      : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Your Subscription</h3>
        {isActive && subscription.currentPlan?.price !== 0 && (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Active
          </Badge>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Crown className="text-amber-500 mr-3" size={20} />
          <div>
            <p className="font-medium">
              {subscription.currentPlan?.name || 'Free Plan'}
            </p>
            <p className="text-sm text-gray-500">
              {subscription.currentPlan?.price === 0 
                ? 'Basic features only' 
                : subscription.currentPlan?.billingCycle === 'lifetime'
                  ? 'Lifetime access'
                  : `${subscription.currentPlan?.billingCycle === 'monthly' ? 'Monthly' : 'Annual'} subscription`}
            </p>
          </div>
        </div>
        
        {isActive && subscription.currentPlan?.price !== 0 && (
          <div className="flex items-center">
            <Calendar className="text-blue-500 mr-3" size={20} />
            <div>
              <p className="font-medium">
                {subscription.trialEndsAt && !subscription.expiresAt
                  ? 'Trial Period'
                  : 'Current Period'}
              </p>
              <p className="text-sm text-gray-500">
                {subscription.currentPlan?.billingCycle === 'lifetime'
                  ? 'Never expires'
                  : subscription.trialEndsAt && !subscription.expiresAt
                    ? `Trial ends on ${formatDate(subscription.trialEndsAt)}`
                    : `Expires on ${formatDate(subscription.expiresAt)}`}
              </p>
              {daysRemaining > 0 && subscription.currentPlan?.billingCycle !== 'lifetime' && (
                <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-100">
                  {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={() => navigate('/subscription')}
          variant={isActive && subscription.currentPlan?.price !== 0 ? "outline" : "default"}
          className={isActive && subscription.currentPlan?.price !== 0 ? "" : "bg-game-purple hover:bg-purple-700"}
        >
          {isActive && subscription.currentPlan?.price !== 0
            ? 'Manage Subscription'
            : 'Upgrade to Premium'}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
