
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ChallengeButtonProps {
  onClick: () => void;
}

const ChallengeButton: React.FC<ChallengeButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className="primary-button flex items-center gap-2 text-lg"
      whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      Begin Challenge <ChevronRight size={18} />
    </motion.button>
  );
};

export default ChallengeButton;
