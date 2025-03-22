
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  processPayment, 
  validateCreditCard, 
  formatCreditCardNumber,
  formatExpiryDate
} from '../../utils/payment';
import { SubscriptionPlan } from '../../utils/subscription';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2, CheckCircle, CreditCard, Calendar, User, Mail } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import PaymentMethodSelector from './PaymentMethodSelector';
import { PaymentMethodType, currencies, formatPrice } from '../../utils/payment/paymentMethods';

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
    return (
      <div className="py-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block mb-4"
        >
          <CheckCircle size={64} className="text-green-500" />
        </motion.div>
        <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for subscribing to {plan.name}!
        </p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">You will be charged</p>
            <p className="text-2xl font-bold">{formatPrice(plan.price, paymentData.currency)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Billing cycle</p>
            <p className="font-medium">
              {plan.billingCycle === 'monthly' 
                ? 'Monthly' 
                : plan.billingCycle === 'yearly' 
                  ? 'Yearly' 
                  : 'One-time payment'}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="currency">Currency</Label>
          <Select 
            value={paymentData.currency}
            onValueChange={(value) => updatePaymentData('currency', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {step === 'methods' && (
        <PaymentMethodSelector 
          selectedMethod={paymentData.method}
          onSelectMethod={(method) => updatePaymentData('method', method)}
        />
      )}
      
      {step === 'details' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="pl-9"
                value={paymentData.email}
                onChange={(e) => updatePaymentData('email', e.target.value)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                id="name"
                placeholder="Full name"
                className="pl-9"
                value={paymentData.name}
                onChange={(e) => updatePaymentData('name', e.target.value)}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          {paymentData.method === 'credit-card' && (
            <>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="pl-9"
                    value={paymentData.cardNumber}
                    onChange={(e) => updatePaymentData('cardNumber', e.target.value)}
                    maxLength={19}
                  />
                </div>
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      className="pl-9"
                      value={paymentData.expiryDate}
                      onChange={(e) => updatePaymentData('expiryDate', e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => updatePaymentData('cvv', e.target.value)}
                    maxLength={4}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {step === 'review' && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium mb-3">Review Your Order</h3>
          
          <div className="rounded-md border p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Plan</span>
              <span className="font-medium">{plan.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <span className="font-medium">
                {formatPrice(plan.price, paymentData.currency)}
                {plan.billingCycle !== 'lifetime' && 
                  `/${plan.billingCycle === 'monthly' ? 'mo' : 'year'}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="font-medium capitalize">
                {paymentData.method.replace('-', ' ')}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Email</span>
              <span className="font-medium">{paymentData.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Name</span>
              <span className="font-medium">{paymentData.name}</span>
            </div>
          </div>
        </div>
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
