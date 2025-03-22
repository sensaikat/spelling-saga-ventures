
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CreditCard, Calendar, User, Mail } from 'lucide-react';

interface PaymentDetailsProps {
  paymentMethod: string;
  paymentData: {
    email: string;
    name: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
  errors: Record<string, string>;
  updatePaymentData: (field: string, value: string) => void;
}

const PaymentDetails = ({ 
  paymentMethod, 
  paymentData, 
  errors, 
  updatePaymentData 
}: PaymentDetailsProps) => {
  return (
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
      
      {paymentMethod === 'credit-card' && (
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
  );
};

export default PaymentDetails;
