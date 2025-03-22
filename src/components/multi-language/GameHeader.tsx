
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Progress } from '../ui/progress';

interface GameHeaderProps {
  score: number;
  remainingLives: number;
  questionsAnswered: number;
  questionsTotal: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  remainingLives,
  questionsAnswered,
  questionsTotal
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/multi-language')} 
          className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(remainingLives)].map((_, i) => (
              <Heart 
                key={i} 
                size={20} 
                className="text-red-500 fill-red-500" 
              />
            ))}
            {[...Array(3 - remainingLives)].map((_, i) => (
              <Heart 
                key={i + remainingLives} 
                size={20} 
                className="text-gray-300" 
              />
            ))}
          </div>
          
          <div className="text-lg font-medium">
            Score: <span className="text-game-purple">{score}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4 w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-game-blue h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${(questionsAnswered / questionsTotal) * 100}%` }}
        />
      </div>
      
      <div className="text-center mb-4">
        <p className="text-gray-600">
          Question {questionsAnswered + 1} of {questionsTotal}
        </p>
      </div>
    </>
  );
};

export default GameHeader;
