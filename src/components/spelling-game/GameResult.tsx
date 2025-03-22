
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameResultProps {
  isAdventure: boolean;
  score: number;
  handlePlayAgain: () => void;
  handleAdventureReturn: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({
  isAdventure,
  score,
  handlePlayAgain,
  handleAdventureReturn,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="max-w-md mx-auto text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-32 h-32 bg-game-yellow rounded-full flex items-center justify-center mx-auto mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Trophy size={64} className="text-white" />
      </motion.div>
      
      <h2 className="text-3xl font-display font-bold mb-4">{isAdventure ? 'Challenge Completed!' : 'Game Completed!'}</h2>
      
      <p className="text-xl mb-6">Your final score: <span className="font-bold">{score}</span></p>
      
      <div className="flex flex-col gap-4 mt-8">
        {isAdventure ? (
          <motion.button
            onClick={handleAdventureReturn}
            className="primary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Adventure
          </motion.button>
        ) : (
          <>
            <motion.button
              onClick={handlePlayAgain}
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/game-mode')}
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Choose Another Game
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/progress')}
              className="bg-gray-200 text-gray-700 w-full font-medium rounded-full py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-300 active:scale-95 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Progress <ChevronRight size={16} />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
};
