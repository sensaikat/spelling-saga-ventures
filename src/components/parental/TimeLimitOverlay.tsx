
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { useParentalControls } from '../../contexts/ParentalControlsContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TimeLimitOverlay: React.FC = () => {
  const { isLocked, getRemainingTime } = useParentalControls();
  const navigate = useNavigate();
  const { daily, weekly } = getRemainingTime();
  
  if (!isLocked) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Clock size={32} className="text-amber-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
          
          <p className="text-gray-600 mb-6">
            {daily === 0 ? 
              "You've reached your daily time limit." : 
              "You've reached the allowed playtime for now."}
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg w-full mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Daily time remaining:</span>
              <span className="font-semibold">{daily} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Weekly time remaining:</span>
              <span className="font-semibold">{weekly} minutes</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <Button 
              onClick={() => navigate('/')} 
              variant="default"
            >
              Go to Home
            </Button>
            <Button 
              onClick={() => navigate('/settings')} 
              variant="outline"
            >
              Go to Settings
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimeLimitOverlay;
