import { useSubscriptionStore } from "../subscription";
import { SubscriptionPlan } from "../subscription/types";
import { toast } from "../../hooks/use-toast";
import { PaymentMethodType } from "./paymentMethods";

// Simulate payment processing - in a real app, this would be replaced by Stripe, PayPal, etc.
export const processPayment = async (
  plan: SubscriptionPlan,
  paymentDetails: {
    method: PaymentMethodType;
    currency: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    name?: string;
    email?: string;
  }
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const { addPaymentRecord, setSubscription } = useSubscriptionStore.getState();
  
  try {
    // Validate payment details based on the method
    if (paymentDetails.method === 'credit-card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 16) {
        return { success: false, error: "Invalid card number" };
      }
      
      if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
        return { success: false, error: "Invalid CVV" };
      }
    }
    
    // In a real app, we would send the payment details to a server
    // which would handle the actual payment processing with a provider
    
    // For this demo, we'll simulate a successful payment 95% of the time
    const isSuccessful = Math.random() < 0.95;
    
    if (isSuccessful) {
      // Generate a transaction ID
      const transactionId = `txn_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      
      // Add the payment to history
      addPaymentRecord({
        planId: plan.id,
        amount: plan.price,
        status: 'completed',
        currency: paymentDetails.currency || 'USD',
        method: paymentDetails.method,
      });
      
      // Set the user's subscription
      const now = new Date();
      let expiresAt: Date | null = null;
      
      // Set expiration based on billing cycle
      if (plan.billingCycle === 'monthly') {
        expiresAt = new Date(now);
        expiresAt.setMonth(now.getMonth() + 1);
      } else if (plan.billingCycle === 'yearly') {
        expiresAt = new Date(now);
        expiresAt.setFullYear(now.getFullYear() + 1);
      } else {
        // Lifetime subscription doesn't expire
        expiresAt = null;
      }
      
      setSubscription({
        isSubscribed: true,
        currentPlan: plan,
        expiresAt: expiresAt ? expiresAt.toISOString() : null,
        trialEndsAt: null,
      });
      
      return { success: true, transactionId };
    } else {
      // Add the failed payment to history
      addPaymentRecord({
        planId: plan.id,
        amount: plan.price,
        status: 'failed',
        currency: paymentDetails.currency || 'USD',
        method: paymentDetails.method,
      });
      
      return { 
        success: false,
        error: "Payment processing failed. Please try again or use a different payment method." 
      };
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    
    // Add the failed payment to history
    addPaymentRecord({
      planId: plan.id,
      amount: plan.price,
      status: 'failed',
      currency: paymentDetails.currency || 'USD',
      method: paymentDetails.method,
    });
    
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again later." 
    };
  }
};

// Validate card number with basic Luhn algorithm check
export const validateCreditCard = (cardNumber: string): boolean => {
  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through values starting at the rightmost side
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

// Start a free trial
export const startFreeTrial = (durationDays: number = 7): void => {
  const { startTrial } = useSubscriptionStore.getState();
  startTrial(durationDays);
  toast({
    title: "Free trial activated!",
    description: `You now have ${durationDays} days of premium access. Enjoy!`,
    duration: 5000,
  });
};
