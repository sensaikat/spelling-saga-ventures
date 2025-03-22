
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../utils/subscription';
import { Button } from '../ui/button';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isActive: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}

const PlanCard = ({ plan, isActive, onSelect }: PlanCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`border rounded-xl shadow-sm p-6 ${
        isActive 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-200 bg-white'
      } ${
        plan.isPopular 
          ? 'relative overflow-hidden'
          : ''
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0 bg-game-purple text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Popular
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      
      <div className="mb-4">
        {plan.price === 0 ? (
          <div className="text-2xl font-bold">Free</div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${plan.price}</span>
            {plan.billingCycle !== 'lifetime' && (
              <span className="text-gray-500 ml-1">
                /{plan.billingCycle === 'monthly' ? 'mo' : 'year'}
              </span>
            )}
          </div>
        )}
      </div>
      
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        onClick={() => onSelect(plan)}
        className={`w-full ${
          isActive 
            ? 'bg-purple-700 hover:bg-purple-800' 
            : plan.price === 0 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
              : 'bg-game-purple hover:bg-purple-700'
        }`}
        variant={plan.price === 0 ? "secondary" : "default"}
      >
        {isActive 
          ? 'Current Plan' 
          : plan.price === 0 
            ? 'Current Plan' 
            : 'Upgrade'}
      </Button>
    </motion.div>
  );
};

export default PlanCard;
