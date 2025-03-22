
import React from 'react';
import { Separator } from '../ui/separator';
import { SubscriptionPlan } from '../../utils/subscription';
import { formatPrice } from '../../utils/payment/paymentMethods';

interface OrderReviewProps {
  plan: SubscriptionPlan;
  paymentData: {
    method: string;
    currency: string;
    email: string;
    name: string;
  };
}

const OrderReview = ({ plan, paymentData }: OrderReviewProps) => {
  return (
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
  );
};

export default OrderReview;
