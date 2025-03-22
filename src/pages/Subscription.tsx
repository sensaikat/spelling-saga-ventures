
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, History, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';
import SubscriptionInfo from '../components/subscription/SubscriptionInfo';
import { useSubscriptionStore } from '../utils/subscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { startFreeTrial } from '../utils/payment';

const Subscription = () => {
  const navigate = useNavigate();
  const { subscription, paymentHistory } = useSubscriptionStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="mb-8 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={() => navigate('/settings')} 
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Settings</span>
          </button>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-display text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Subscription
        </motion.h1>
        
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Unlock all features and premium content with a subscription.
        </motion.p>
        
        <div className="max-w-6xl mx-auto">
          {subscription.trialEndsAt === null && !subscription.isSubscribed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 mb-10 text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-2">Try Premium for Free!</h2>
              <p className="mb-4">Get 7 days of full access to all premium features.</p>
              <Button 
                onClick={() => startFreeTrial(7)}
                className="bg-white text-purple-700 hover:bg-gray-100"
              >
                <Clock size={18} className="mr-2" />
                Start Free Trial
              </Button>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="current" className="text-lg py-3">
                  Current Plan
                </TabsTrigger>
                <TabsTrigger value="plans" className="text-lg py-3">
                  Available Plans
                </TabsTrigger>
                <TabsTrigger value="history" className="text-lg py-3">
                  Payment History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="current">
                <SubscriptionInfo />
              </TabsContent>
              
              <TabsContent value="plans">
                <SubscriptionPlans />
              </TabsContent>
              
              <TabsContent value="history">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium mb-4">Payment History</h3>
                  
                  {paymentHistory.length > 0 ? (
                    <div className="space-y-4">
                      {paymentHistory.map((payment) => (
                        <div 
                          key={payment.id} 
                          className="flex items-center justify-between border-b border-gray-100 pb-4"
                        >
                          <div className="flex items-center">
                            <CreditCard className="text-gray-400 mr-3" size={18} />
                            <div>
                              <p className="font-medium">
                                {payment.planId.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(payment.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${payment.amount.toFixed(2)}</p>
                            <p className={`text-sm ${
                              payment.status === 'completed' 
                                ? 'text-green-600' 
                                : payment.status === 'pending'
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <History className="mx-auto mb-2 text-gray-300" size={36} />
                      <p>No payment history yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
