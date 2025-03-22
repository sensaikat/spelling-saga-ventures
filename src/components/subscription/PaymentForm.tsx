
import React, { useState } from 'react';
import { 
  processPayment, 
  validateCreditCard
} from '../../utils/payment';
import { SubscriptionPlan } from '../../utils/subscription';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { PaymentMethodType, formatPrice } from '../../utils/payment/paymentMethods';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import PaymentDetails from './PaymentDetails';
import OrderReview from './OrderReview';
import PaymentSuccess from './PaymentSuccess';

interface PaymentFormProps {
  plan: SubscriptionPlan;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm = ({ plan, onSuccess, onCancel }: PaymentFormProps) => {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    method: 'credit-card' as PaymentMethodType,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    currency: 'USD',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState<'methods' | 'details' | 'review'>('methods');
  
  const updatePaymentData = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format credit card number
    if (field === 'cardNumber') {
      formattedValue = formatCreditCardNumber(value);
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }
    
    // Limit CVV to 3-4 digits
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setPaymentData({
      ...paymentData,
      [field]: formattedValue,
    });
    
    // Clear any error for this field
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };
  
  // Format credit card input (add spaces after every 4 digits)
  const formatCreditCardNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    
    return groups.join(' ');
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Always validate email and name
    if (!paymentData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(paymentData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!paymentData.name) {
      newErrors.name = 'Name is required';
    }
    
    // Validate method-specific fields
    if (paymentData.method === 'credit-card') {
      // Validate card number
      if (!paymentData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!validateCreditCard(paymentData.cardNumber)) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      // Validate expiry date
      if (!paymentData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else {
        const [month, year] = paymentData.expiryDate.split('/');
        
        if (!month || !year || month.length !== 2 || year.length !== 2) {
          newErrors.expiryDate = 'Invalid expiry date format';
        } else {
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;
          const expiryMonth = parseInt(month, 10);
          const expiryYear = parseInt(year, 10);
          
          if (isNaN(expiryMonth) || isNaN(expiryYear) || 
              expiryMonth < 1 || expiryMonth > 12) {
            newErrors.expiryDate = 'Invalid expiry date';
          } else if (expiryYear < currentYear || 
                   (expiryYear === currentYear && expiryMonth < currentMonth)) {
            newErrors.expiryDate = 'Card has expired';
          }
        }
      }
      
      // Validate CVV
      if (!paymentData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (paymentData.cvv.length < 3) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await processPayment(plan, paymentData);
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Payment successful!",
          description: `You're now subscribed to ${plan.name}`,
          duration: 5000,
        });
        
        // Delay before closing to show success state
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        toast({
          title: "Payment failed",
          description: result.error || "Please try again",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };
  
  const handleNextStep = () => {
    if (step === 'methods') {
      setStep('details');
    } else if (step === 'details') {
      if (validateForm()) {
        setStep('review');
      }
    }
  };
  
  const handlePrevStep = () => {
    if (step === 'details') {
      setStep('methods');
    } else if (step === 'review') {
      setStep('details');
    }
  };
  
  if (isSuccess) {
    return <PaymentSuccess plan={plan} />;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentSummary 
        plan={plan} 
        currency={paymentData.currency}
        onCurrencyChange={(currency) => updatePaymentData('currency', currency)}
      />
      
      <Separator className="my-4" />
      
      {step === 'methods' && (
        <PaymentMethodSelector 
          selectedMethod={paymentData.method}
          onSelectMethod={(method) => updatePaymentData('method', method)}
        />
      )}
      
      {step === 'details' && (
        <PaymentDetails 
          paymentMethod={paymentData.method}
          paymentData={paymentData}
          errors={errors}
          updatePaymentData={updatePaymentData}
        />
      )}
      
      {step === 'review' && (
        <OrderReview plan={plan} paymentData={paymentData} />
      )}
      
      <div className="flex gap-4 mt-6">
        {step !== 'methods' ? (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevStep}
            className="flex-1"
            disabled={isSubmitting}
          >
            Back
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        
        {step !== 'review' ? (
          <Button 
            type="button" 
            className="flex-1 bg-game-purple hover:bg-purple-700"
            onClick={handleNextStep}
          >
            Next
          </Button>
        ) : (
          <Button 
            type="submit" 
            className="flex-1 bg-game-purple hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatPrice(plan.price, paymentData.currency)}`
            )}
          </Button>
        )}
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-4">
        <p>This is a simulated payment for demonstration purposes.</p>
        <p>No actual charges will be made.</p>
        <p className="mt-1">Your data is secure and will never be shared with third parties.</p>
      </div>
    </form>
  );
};

export default PaymentForm;
