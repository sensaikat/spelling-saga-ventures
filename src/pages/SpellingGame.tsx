import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume, Check, X, Trophy, ChevronRight } from 'lucide-react';
import { useGameStore, Word } from '../utils/gameData';
import WordCard from '../components/WordCard';
import GameControls from '../components/GameControls';
import AlphabetHelper from '../components/AlphabetHelper';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAdventure } from '../contexts/AdventureContext';

interface SpellingGameProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

const SpellingGame: React.FC<SpellingGameProps> = ({ 
  isAdventure = false, 
  onAdventureComplete 
}) => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    updateWordProgress,
    addPoints 
  } = useGameStore();
  
  const { getCurrentLocation } = useAdventure();
  const currentLocation = getCurrentLocation();
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const maxHints = 3;
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState('all');
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  
  const [showAlphabetHelper, setShowAlphabetHelper] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!isAdventure && (!selectedLanguage || !selectedGameMode || !currentWordList)) {
      navigate('/');
    }
  }, [selectedLanguage, selectedGameMode, currentWordList, navigate, isAdventure]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentWordIndex]);
  
  useEffect(() => {
    if (selectedLanguage && currentWordList) {
      let words = currentWordList.words;
      if (difficultyLevel !== 'all') {
        words = words.filter(word => word.difficulty === difficultyLevel);
      }
      setFilteredWords(words);
      setCurrentWordIndex(0);
      setUserInput('');
      setIsCorrect(null);
      setShowResult(false);
      setGameCompleted(false);
      setScore(0);
      setRemainingLives(3);
      setHintsUsed(0);
      setShowHint(false);
    }
  }, [selectedLanguage, currentWordList, difficultyLevel]);
  
  useEffect(() => {
    // Auto-show alphabet helper for non-Latin script languages
    const nonLatinScripts = ['hi', 'bn', 'or', 'ta', 'te', 'ar', 'zh'];
    if (selectedLanguage && nonLatinScripts.includes(selectedLanguage.id)) {
      setShowAlphabetHelper(true);
    }
  }, [selectedLanguage]);
  
  if (!isAdventure && (!selectedLanguage || !selectedGameMode || !currentWordList || filteredWords.length === 0)) {
    return null;
  }
  
  const currentWord = filteredWords[currentWordIndex];
  
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
      if (currentWordIndex < filteredWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowResult(false);
        setShowHint(false);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };
  
  const handlePlayAgain = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setShowResult(false);
    setGameCompleted(false);
    setScore(0);
    setRemainingLives(3);
    setHintsUsed(0);
    setShowHint(false);
  };

  const handleDifficultyChange = (level: string) => {
    setDifficultyLevel(level);
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };
  
  const handleAlphabetHelperToggle = () => {
    setShowAlphabetHelper(!showAlphabetHelper);
    toast({
      title: showAlphabetHelper ? "Alphabet Helper Hidden" : "Alphabet Helper Shown",
      description: showAlphabetHelper ? "You can enable it again from game controls." : "Click on letters to add them to your answer.",
      duration: 2000,
    });
  };
  
  const handleCharacterClick = (char: string) => {
    if (showResult) return;
    
    const newInput = 
      userInput.substring(0, cursorPosition) + 
      char + 
      userInput.substring(cursorPosition);
    
    setUserInput(newInput);
    setCursorPosition(cursorPosition + char.length);
    
    // Focus back on the input with cursor at the right position
    if (inputRef.current) {
      inputRef.current.focus();
      
      // Set selection range after a tiny delay to ensure it works across browsers
      setTimeout(() => {
        if (inputRef.current) {
          const newPosition = cursorPosition + char.length;
          inputRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 10);
    }
  };
  
  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCursorPosition(target.selectionStart || 0);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };
  
  const progressPercentage = ((currentWordIndex + 1) / filteredWords.length) * 100;
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
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
      if (currentWordIndex < filteredWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowResult(false);
        setShowHint(false);
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

  const handleShowHint = () => {
    if (hintsUsed < maxHints) {
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
    }
  };
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };
  
  const progressPercentage = ((currentWordIndex + 1) / filteredWords.length) * 100;
  
  return (
    <div className={`min-h-screen ${isAdventure && currentLocation ? terrainBackgrounds[currentLocation.terrain] : 'bg-gradient-to-b from-blue-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {!gameCompleted ? (
          <>
            <motion.div 
              className="mb-6 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={() => isAdventure ? handleAdventureReturn() : navigate('/game-mode')} 
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span>{isAdventure ? 'Back to Adventure' : 'Exit Game'}</span>
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
              className="w-full bg-gray-200 h-2 rounded-full mb-6"
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
            
            <div className="max-w-2xl mx-auto space-y-6">
              <motion.div
                className="mb-4 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl font-medium mb-1">
                  {isAdventure && currentLocation ? currentLocation.name : selectedGameMode.name}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span>{selectedLanguage.flag}</span>
                  <span>{currentWordList.name}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs uppercase">
                    {difficultyLevel === 'all' ? 'All Levels' : difficultyLevel}
                  </span>
                </div>
              </motion.div>
              
              <GameControls 
                onSkip={handleSkip}
                onSpeak={() => speakWord(currentWord)}
                onHint={handleShowHint}
                onRestart={handlePlayAgain}
                difficultyLevel={difficultyLevel}
                onDifficultyChange={handleDifficultyChange}
                audioEnabled={audioEnabled}
                onAudioToggle={toggleAudio}
                hintsUsed={hintsUsed}
                maxHints={maxHints}
                isPlaying={!showResult}
                showAlphabetHelper={showAlphabetHelper}
                onAlphabetHelperToggle={handleAlphabetHelperToggle}
              />
              
              {showAlphabetHelper && (
                <AlphabetHelper 
                  languageId={selectedLanguage.id} 
                  onCharacterClick={handleCharacterClick} 
                />
              )}
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="flex justify-center mb-6">
                    <WordCard 
                      word={currentWord} 
                      revealed={showResult} 
                      onSpeakClick={() => speakWord(currentWord)}
                      onHintClick={handleShowHint}
                      showHint={showHint}
                      className="w-full max-w-sm"
                    />
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="w-full max-w-md mb-2 relative">
                      <Input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        onClick={handleInputSelect}
                        onKeyUp={handleInputSelect}
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
                    
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        type="button"
                        onClick={handleAlphabetHelperToggle}
                        className="text-xs text-gray-600 hover:text-game-blue underline"
                      >
                        {showAlphabetHelper ? "Hide alphabet helper" : "Show alphabet helper"}
                      </button>
                    </div>
                    
                    <div className="flex gap-4">
                      {!showResult && (
                        <motion.button
                          type="submit"
                          className="primary-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!userInput.trim()}
                        >
                          Check
                        </motion.button>
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
        )}
      </div>
    </div>
  );
};

const terrainBackgrounds = {
  forest: 'bg-gradient-to-b from-green-200 to-green-600',
  desert: 'bg-gradient-to-b from-yellow-200 to-amber-600',
  river: 'bg-gradient-to-b from-blue-200 to-blue-600',
  mountain: 'bg-gradient-to-b from-slate-200 to-slate-600',
  castle: 'bg-gradient-to-b from-purple-200 to-purple-600',
  space: 'bg-gradient-to-b from-indigo-200 to-indigo-800',
};

export default SpellingGame;
