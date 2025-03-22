
import React from 'react';
import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';

interface AvatarSelectorProps {
  onChangeAvatar: () => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onChangeAvatar }) => {
  return (
    <motion.div
      className="absolute -top-16 -right-10 p-3 rounded-full bg-white shadow-md cursor-pointer"
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9, rotate: 5 }}
      onClick={onChangeAvatar}
    >
      <UserRound size={24} className="text-gray-600" />
    </motion.div>
  );
};
