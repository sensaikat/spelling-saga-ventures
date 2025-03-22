
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, History, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';
import SubscriptionInfo from '../components/subscription/SubscriptionInfo';
import { useSubscriptionStore } from '../utils/subscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { startFreeTrial } from '../utils/payment';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription, paymentHistory, userProfile, setUserProfile } = useSubscriptionStore();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: '', email: '' });
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.email || !signUpData.name) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would validate email and send a verification email
    setUserProfile({
      name: signUpData.name,
      email: signUpData.email,
      isVerified: true // Auto-verify for demo purposes
    });
    
    toast({
      title: "Account created!",
      description: "Your account has been created successfully"
    });
    
    setIsSignUpOpen(false);
    startFreeTrial(7);
  };
  
  const trialActive = 
    subscription.trialEndsAt !== null && 
    new Date(subscription.trialEndsAt) > new Date();
  
  const showSignUpBanner = !userProfile && !subscription.isSubscribed;
  
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
          className="text-center text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Unlock all features and premium content with a subscription.
        </motion.p>
        
        {showSignUpBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-10 text-white text-center max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 mb-4 md:mb-0 md:text-left">
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Sign up for premium benefits!
                </h2>
                <p className="text-indigo-100">
                  Create an account to track your progress and get 7 days of free premium access.
                </p>
              </div>
              <Button 
                onClick={() => setIsSignUpOpen(true)}
                className="bg-white text-purple-700 hover:bg-gray-100"
              >
                Sign Up For Free
              </Button>
            </div>
          </motion.div>
        )}
        
        <div className="max-w-6xl mx-auto">
          {!trialActive && !subscription.isSubscribed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 mb-10 text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-2">Try Premium for Free!</h2>
              <p className="mb-4">Get 7 days of full access to all premium features.</p>
              <Button 
                onClick={() => {
                  if (!userProfile) {
                    setIsSignUpOpen(true);
                  } else {
                    startFreeTrial(7);
                  }
                }}
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
                                {new Date(payment.date).toLocaleDateString()} • {payment.method.replace('-', ' ')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{payment.currency} {payment.amount.toFixed(2)}</p>
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
      
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Your Account</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSignUp} className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                  placeholder="John Doe" 
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                  placeholder="you@example.com" 
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-2">
              By signing up, you'll get a 7-day free trial of premium features.
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsSignUpOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                Sign Up & Start Trial
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscription;
