
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuideAppearance } from '../../types';

interface GuideBubbleWrapperProps {
  showMessage: boolean;
  guide: GuideAppearance;
  children: React.ReactNode;
}

const bubbleVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  }
};

export const GuideBubbleWrapper: React.FC<GuideBubbleWrapperProps> = ({
  showMessage,
  guide,
  children
}) => {
  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          className={`fixed bottom-24 right-8 max-w-xs p-4 rounded-xl rounded-br-none shadow-lg z-40 ${guide.color}`}
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
