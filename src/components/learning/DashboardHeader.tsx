
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onOpenPrivacyDialog: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenPrivacyDialog }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <motion.div 
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Home</span>
        </button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenPrivacyDialog}
          className="flex items-center gap-1"
        >
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Privacy Settings</span>
        </Button>
      </motion.div>
      
      <motion.h1 
        className="text-3xl md:text-4xl font-display text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Learning Dashboard
      </motion.h1>
    </>
  );
};

export default DashboardHeader;
