
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ExternalLink } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../../utils/game';

interface RecommendedWordsCardProps {
  words: Word[];
}

const RecommendedWordsCard: React.FC<RecommendedWordsCardProps> = ({ words }) => {
  const navigate = useNavigate();
  const { setCurrentWordList, selectedLanguage, selectedGameMode } = useGameStore();
  
  if (!words || words.length === 0 || !selectedGameMode || !selectedLanguage) {
    return null;
  }
  
  const handlePracticeWord = (word: Word) => {
    // Create a temporary word list with just this word
    const singleWordList = {
      id: `practice-${word.id}`,
      name: `Practice: ${word.text}`,
      description: 'Focused practice on a recommended word',
      words: [word],
      languageId: selectedLanguage.id,
      difficulty: word.difficulty
    };
    
    // Set as current word list and navigate to game
    setCurrentWordList(singleWordList);
    navigate(`/game/${selectedGameMode.id}`);
  };
  
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Lightbulb className="h-5 w-5 text-amber-600 mr-2" />
        <h3 className="font-medium text-amber-800">Recommended Practice</h3>
      </div>
      
      <p className="text-sm text-amber-700 mb-4">
        Based on your performance, we recommend practicing these words:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {words.map((word, index) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-md p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePracticeWord(word)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{word.text}</p>
                <p className={`text-xs mt-1 ${
                  word.difficulty === 'easy' ? 'text-green-600' :
                  word.difficulty === 'medium' ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {word.difficulty}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedWordsCard;
