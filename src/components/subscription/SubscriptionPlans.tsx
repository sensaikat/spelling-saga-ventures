import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  subscriptionPlans, 
  useSubscriptionStore,
  SubscriptionPlan
} from '../../utils/subscription';
import PlanCard from './PlanCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import PaymentForm from './PaymentForm';

const SubscriptionPlans = () => {
  const { subscription } = useSubscriptionStore();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    // Free plan doesn't need payment
    if (plan.price === 0) {
      useSubscriptionStore.getState().setSubscription({
        isSubscribed: false,
        currentPlan: plan,
        expiresAt: null,
        trialEndsAt: null,
      });
      return;
    }
    
    // Otherwise open payment dialog
    setSelectedPlan(plan);
    setIsPaymentDialogOpen(true);
  };
  
  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedPlan(null);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {subscriptionPlans.map((plan) => (
          <motion.div key={plan.id} variants={itemVariants}>
            <PlanCard
              plan={plan}
              isActive={subscription.currentPlan?.id === plan.id}
              onSelect={handleSelectPlan}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Subscribe to {selectedPlan?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedPlan && (
            <PaymentForm 
              plan={selectedPlan} 
              onSuccess={closePaymentDialog}
              onCancel={closePaymentDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionPlans;
