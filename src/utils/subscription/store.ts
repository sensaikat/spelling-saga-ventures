
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SubscriptionPlan, SubscriptionStatus, FeatureLimits } from './types';
import { featureLimits, premiumFeatureLimits, subscriptionPlans } from './plans';

interface SubscriptionState {
  subscription: SubscriptionStatus;
  limits: FeatureLimits;
  remainingDailyGames: number;
  paymentHistory: {
    id: string;
    planId: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }[];
  
  // Actions
  setSubscription: (subscription: SubscriptionStatus) => void;
  startTrial: (durationDays: number) => void;
  updateLimits: () => void;
  decrementDailyGames: () => void;
  resetDailyGames: () => void;
  addPaymentRecord: (record: {
    planId: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
  }) => void;
  checkAccess: (feature: keyof FeatureLimits) => boolean;
  hasLanguageAccess: (languageId: string, availableLanguageIds: string[]) => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: {
        isSubscribed: false,
        currentPlan: subscriptionPlans[0], // Free plan by default
        expiresAt: null,
        trialEndsAt: null,
      },
      limits: featureLimits,
      remainingDailyGames: 10,
      paymentHistory: [],
      
      setSubscription: (subscription) => {
        set({ 
          subscription,
          limits: subscription.isSubscribed ? premiumFeatureLimits : featureLimits,
        });
      },
      
      startTrial: (durationDays) => {
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + durationDays);
        
        set({ 
          subscription: {
            ...get().subscription,
            isSubscribed: true,
            trialEndsAt: trialEndsAt.toISOString(),
          },
          limits: premiumFeatureLimits,
        });
      },
      
      updateLimits: () => {
        const { subscription } = get();
        
        // Check if subscription or trial has expired
        const now = new Date();
        const expiresAt = subscription.expiresAt ? new Date(subscription.expiresAt) : null;
        const trialEndsAt = subscription.trialEndsAt ? new Date(subscription.trialEndsAt) : null;
        
        const isExpired = 
          (expiresAt && now > expiresAt) || 
          (trialEndsAt && now > trialEndsAt && !expiresAt);
        
        if (isExpired) {
          set({
            subscription: {
              isSubscribed: false,
              currentPlan: subscriptionPlans[0], // Revert to free plan
              expiresAt: null,
              trialEndsAt: null,
            },
            limits: featureLimits,
          });
        }
      },
      
      decrementDailyGames: () => {
        const { remainingDailyGames, limits } = get();
        
        if (!limits.gamePlay.unlimited && remainingDailyGames > 0) {
          set({ remainingDailyGames: remainingDailyGames - 1 });
        }
      },
      
      resetDailyGames: () => {
        set({ remainingDailyGames: get().limits.gamePlay.daily });
      },
      
      addPaymentRecord: (record) => {
        set((state) => ({
          paymentHistory: [
            {
              id: `payment_${Date.now()}`,
              ...record,
              date: new Date().toISOString(),
            },
            ...state.paymentHistory,
          ],
        }));
      },
      
      checkAccess: (feature) => {
        const { limits, subscription } = get();
        
        // Always update limits before checking access
        get().updateLimits();
        
        // If it's a boolean feature, return the value directly
        if (typeof limits[feature] === 'boolean') {
          return limits[feature] as boolean;
        }
        
        // For other features (objects), assume they have permission if subscribed
        return subscription.isSubscribed;
      },
      
      hasLanguageAccess: (languageId, availableLanguageIds) => {
        const { limits, subscription } = get();
        get().updateLimits();
        
        // If premium, they have access to all languages
        if (subscription.isSubscribed) return true;
        
        // For free users, check if the language is within their accessible limit
        const accessibleLanguages = availableLanguageIds.slice(0, limits.languages.free);
        return accessibleLanguages.includes(languageId);
      },
    }),
    {
      name: 'spelling-saga-subscription-storage',
    }
  )
);

// Function to check if a plan is active based on the current date
export const isPlanActive = (subscription: SubscriptionStatus): boolean => {
  if (!subscription.isSubscribed) return false;
  
  const now = new Date();
  
  // Lifetime subscription never expires
  if (subscription.currentPlan?.billingCycle === 'lifetime') return true;
  
  // Check expiration date for regular subscriptions
  if (subscription.expiresAt) {
    const expiresAt = new Date(subscription.expiresAt);
    if (now > expiresAt) return false;
  }
  
  // Check trial end date if applicable
  if (subscription.trialEndsAt && !subscription.expiresAt) {
    const trialEndsAt = new Date(subscription.trialEndsAt);
    if (now > trialEndsAt) return false;
  }
  
  return true;
};
