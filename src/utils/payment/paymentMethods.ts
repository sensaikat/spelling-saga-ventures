
import { CreditCard, Landmark, Wallet, Smartphone, Apple } from 'lucide-react';

export type PaymentMethodType = 
  | 'credit-card'
  | 'bank-transfer'
  | 'paypal'
  | 'google-pay'
  | 'apple-pay';

export interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  supportedCurrencies: string[];
  isAvailable: boolean;  // Some methods might not be available on certain devices
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Secure card payment via our payment processor',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    isAvailable: true,
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: Landmark,
    description: 'Direct transfer from your bank account',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
    isAvailable: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: Wallet,
    description: 'Fast and secure payment via PayPal',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    isAvailable: true,
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: Smartphone,
    description: 'Quick checkout with Google Pay',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'],
    isAvailable: typeof window !== 'undefined' && 
      !!(window as any).PaymentRequest && 
      !/iPhone|iPad|iPod/.test(navigator.userAgent),
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: Apple,
    description: 'Secure checkout with Apple Pay',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    isAvailable: typeof window !== 'undefined' && 
      !!(window as any).ApplePaySession && 
      /iPhone|iPad|iPod|Mac/.test(navigator.userAgent),
  },
];

export const availablePaymentMethods = (): PaymentMethod[] => {
  return paymentMethods.filter(method => method.isAvailable);
};

// List of supported currencies with their symbols
export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

// Get price with currency symbol
export const formatPrice = (price: number, currencyCode: string = 'USD'): string => {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  
  return `${currency.symbol}${price.toFixed(2)}`;
};
