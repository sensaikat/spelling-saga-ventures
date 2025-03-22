
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Home, RefreshCw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MultiLanguageResultProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const MultiLanguageResult: React.FC<MultiLanguageResultProps> = ({
  score,
  totalQuestions,
  onPlayAgain,
  onBackToMenu
}) => {
  const percentageScore = Math.round((score / (totalQuestions * 10)) * 100);
  
  return (
    <motion.div
      className="max-w-md mx-auto text-center glass-panel p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-game-purple/10 rounded-full flex items-center justify-center mb-4">
          <Trophy size={40} className="text-game-purple" />
        </div>
        <h2 className="text-2xl font-bold">Game Completed!</h2>
        <p className="text-gray-600 mt-2">Great job with your multi-language practice!</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="text-5xl font-bold text-game-purple mb-2">{score}</div>
        <div className="text-sm text-gray-500">points earned</div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div 
            className="bg-game-green h-4 rounded-full transition-all duration-1000"
            style={{ width: `${percentageScore}%` }}
          />
        </div>
        <div className="text-sm mt-2 text-gray-600">
          {percentageScore}% success rate
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button
          variant="default"
          className="w-full bg-game-blue hover:bg-blue-600"
          onClick={onPlayAgain}
        >
          <RefreshCw size={16} className="mr-2" />
          Play Again
        </Button>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={onBackToMenu}
        >
          <Home size={16} className="mr-2" />
          Back to Menu
        </Button>
        
        <Button 
          variant="ghost"
          className="w-full mt-2"
        >
          <Share2 size={16} className="mr-2" />
          Share Result
        </Button>
      </div>
    </motion.div>
  );
};

export default MultiLanguageResult;
