
import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { SubscriptionPlan } from '../../utils/subscription';
import { currencies, formatPrice } from '../../utils/payment/paymentMethods';

interface PaymentSummaryProps {
  plan: SubscriptionPlan;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const PaymentSummary = ({ plan, currency, onCurrencyChange }: PaymentSummaryProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">You will be charged</p>
          <p className="text-2xl font-bold">{formatPrice(plan.price, currency)}</p>
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
          value={currency}
          onValueChange={(value) => onCurrencyChange(value)}
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
  );
};

export default PaymentSummary;
