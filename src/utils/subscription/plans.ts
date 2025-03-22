
import { SubscriptionPlan } from './types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingCycle: 'monthly',
    features: [
      'Access to 3 languages',
      '10 games per day',
      'Basic progress tracking',
      'Single language mode only',
    ],
  },
  {
    id: 'premium-monthly',
    name: 'Premium Monthly',
    price: 4.99,
    billingCycle: 'monthly',
    features: [
      'All languages access',
      'Unlimited gameplay',
      'Advanced reports',
      'Multi-language mode',
      'Adventure mode',
      'Offline mode',
    ],
    isPopular: true,
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    price: 49.99,
    billingCycle: 'yearly',
    features: [
      'All languages access',
      'Unlimited gameplay',
      'Advanced reports',
      'Multi-language mode',
      'Adventure mode',
      'Offline mode',
      '2 months free compared to monthly',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    price: 149.99,
    billingCycle: 'lifetime',
    features: [
      'All languages access forever',
      'Unlimited gameplay',
      'Advanced reports',
      'Multi-language mode',
      'Adventure mode',
      'Offline mode',
      'All future updates',
    ],
  },
];

export const featureLimits = {
  languages: {
    free: 3,
    premium: -1, // -1 means unlimited
  },
  gamePlay: {
    daily: 10,
    unlimited: false,
  },
  reports: false,
  multiLanguage: false,
  adventureMode: false,
  offlineMode: false,
};

export const premiumFeatureLimits = {
  languages: {
    free: -1,
    premium: -1,
  },
  gamePlay: {
    daily: -1,
    unlimited: true,
  },
  reports: true,
  multiLanguage: true,
  adventureMode: true,
  offlineMode: true,
};
