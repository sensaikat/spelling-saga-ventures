import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume, Check, X, Trophy, ChevronRight } from 'lucide-react';
import { useGameStore, Word } from '../utils/gameData';
import WordCard from '../components/WordCard';
import { toast } from '@/components/ui/use-toast';

const SpellingGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    updateWordProgress,
    addPoints 
  } = useGameStore();
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(3);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!selectedLanguage || !selectedGameMode || !currentWordList) {
      navigate('/');
    }
  }, [selectedLanguage, selectedGameMode, currentWordList, navigate]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentWordIndex]);
  
  if (!selectedLanguage || !selectedGameMode || !currentWordList) {
    return null;
  }
  
  const currentWord = currentWordList.words[currentWordIndex];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const correct = userInput.toLowerCase().trim() === currentWord.text.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    updateWordProgress(currentWord.id, correct);
    
    if (correct) {
      setScore(prev => prev + 10);
      addPoints(10);
      
      toast({
        title: "Correct!",
        description: `+10 points added to your score.`,
        duration: 1500,
      });
    } else {
      setRemainingLives(prev => prev - 1);
      
      if (remainingLives <= 1) {
        setTimeout(() => {
          setGameCompleted(true);
        }, 1500);
        return;
      }
    }
    
    setTimeout(() => {
      if (currentWordIndex < currentWordList.words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };
  
  const handleSkip = () => {
    setRemainingLives(prev => prev - 1);
    setIsCorrect(false);
    setShowResult(true);
    
    if (remainingLives <= 1) {
      setTimeout(() => {
        setGameCompleted(true);
      }, 1500);
      return;
    }
    
    setTimeout(() => {
      if (currentWordIndex < currentWordList.words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };
  
  const speakWord = (word: Word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.text);
      utterance.lang = selectedLanguage.id;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const handlePlayAgain = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setGameCompleted(false);
    setScore(0);
    setRemainingLives(3);
  };
  
  const progressPercentage = ((currentWordIndex + 1) / currentWordList.words.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {!gameCompleted ? (
          <>
            <motion.div 
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={() => navigate('/game-mode')} 
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span>Exit Game</span>
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: remainingLives }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-5 h-5 rounded-full bg-game-red"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full bg-gray-200 h-2 rounded-full mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div 
                className="bg-game-blue h-full rounded-full" 
                style={{ width: `${progressPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            
            <div className="max-w-2xl mx-auto">
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl font-medium mb-1">
                  {selectedGameMode.name}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span>{selectedLanguage.flag}</span>
                  <span>{currentWordList.name}</span>
                </div>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex justify-center mb-6">
                    <WordCard 
                      word={currentWord} 
                      revealed={showResult} 
                      onSpeakClick={() => speakWord(currentWord)} 
                      className="w-full max-w-sm"
                    />
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="w-full max-w-md mb-4 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                          isCorrect === null 
                            ? 'border-gray-300 focus:border-game-blue' 
                            : isCorrect 
                              ? 'border-game-green bg-green-50' 
                              : 'border-game-red bg-red-50'
                        }`}
                        placeholder="Type the word..."
                        disabled={showResult}
                      />
                      
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-game-blue"
                        onClick={() => speakWord(currentWord)}
                      >
                        <Volume size={20} />
                      </button>
                    </div>
                    
                    <div className="flex gap-4">
                      {!showResult && (
                        <>
                          <motion.button
                            type="submit"
                            className="primary-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!userInput.trim()}
                          >
                            Check
                          </motion.button>
                          
                          <motion.button
                            type="button"
                            onClick={handleSkip}
                            className="bg-gray-200 text-gray-700 font-medium rounded-full py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-300 active:scale-95"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Skip
                          </motion.button>
                        </>
                      )}
                    </div>
                  </form>
                  
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        {isCorrect ? (
                          <motion.div 
                            className="inline-flex items-center bg-green-100 text-green-800 py-2 px-4 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Check size={18} className="mr-2" />
                            Correct!
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="inline-flex items-center bg-red-100 text-red-800 py-2 px-4 rounded-full"
                            animate={{ x: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <X size={18} className="mr-2" />
                            Incorrect! The answer is: {currentWord.text}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-xl">
                  Score: <span className="font-bold">{score}</span>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
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
            
            <h2 className="text-3xl font-display font-bold mb-4">Game Completed!</h2>
            
            <p className="text-xl mb-6">Your final score: <span className="font-bold">{score}</span></p>
            
            <div className="flex flex-col gap-4 mt-8">
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SpellingGame;

