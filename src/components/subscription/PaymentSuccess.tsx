
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SubscriptionPlan } from '../../utils/subscription';

interface PaymentSuccessProps {
  plan: SubscriptionPlan;
}

const PaymentSuccess = ({ plan }: PaymentSuccessProps) => {
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
};

export default PaymentSuccess;
