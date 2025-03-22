
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, TimerOff } from 'lucide-react';

interface GameTimerProps {
  timeRemaining: number;
  isRunning: boolean;
  isPaused?: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({ 
  timeRemaining, 
  isRunning,
  isPaused = false
}) => {
  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine color based on time remaining
  const getTimerColor = (): string => {
    if (timeRemaining <= 10) return 'text-red-500';
    if (timeRemaining <= 20) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <motion.div 
      className={`flex items-center gap-1.5 font-mono text-lg ${getTimerColor()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isRunning ? (
        <Timer size={18} className="animate-pulse" />
      ) : (
        <TimerOff size={18} />
      )}
      <span>{formatTime(timeRemaining)}</span>
      {isPaused && (
        <span className="text-xs text-gray-500 ml-1">(paused)</span>
      )}
    </motion.div>
  );
};
