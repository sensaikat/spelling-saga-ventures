
export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  isPopular?: boolean;
};

export type SubscriptionStatus = {
  isSubscribed: boolean;
  currentPlan: SubscriptionPlan | null;
  expiresAt: string | null;
  trialEndsAt: string | null;
};

export type LanguageLimit = {
  free: number;
  premium: number;
};

export type GamePlayLimit = {
  daily: number;
  unlimited: boolean;
};

export type FeatureLimits = {
  languages: LanguageLimit;
  gamePlay: GamePlayLimit;
  reports: boolean;
  multiLanguage: boolean;
  adventureMode: boolean;
  offlineMode: boolean;
};
