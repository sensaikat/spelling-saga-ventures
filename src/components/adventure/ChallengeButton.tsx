
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ChallengeButtonProps {
  onClick: () => void;
}

const ChallengeButton: React.FC<ChallengeButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-full shadow-md flex items-center gap-2 transition-all"
      whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      Begin Challenge <ChevronRight size={18} />
    </motion.button>
  );
};

export default ChallengeButton;
