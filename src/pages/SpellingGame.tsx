import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore, Word } from '../utils/gameData';
import WordCard from '../components/WordCard';
import GameControls from '../components/GameControls';
import AlphabetHelper from '../components/alphabet-helper';
import { toast } from '@/components/ui/use-toast';
import { useAdventure } from '../contexts/adventure/useAdventure';
import { 
  GameHeader,
  ProgressBar,
  GameForm,
  GameResult,
  terrainBackgrounds
} from '../components/spelling-game';

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
  
  useEffect(() => {
    if (!isAdventure && (!selectedLanguage || !selectedGameMode || !currentWordList)) {
      navigate('/');
    }
  }, [selectedLanguage, selectedGameMode, currentWordList, navigate, isAdventure]);
  
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
  
  return (
    <div className={`min-h-screen ${isAdventure && currentLocation ? terrainBackgrounds[currentLocation.terrain] : 'bg-gradient-to-b from-blue-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {!gameCompleted ? (
          <>
            <GameHeader 
              remainingLives={remainingLives}
              isAdventure={isAdventure}
              handleAdventureReturn={handleAdventureReturn}
              navigate={navigate}
            />
            
            <ProgressBar progressPercentage={progressPercentage} />
            
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
              
              <GameForm 
                currentWord={currentWord}
                userInput={userInput}
                setUserInput={setUserInput}
                showResult={showResult}
                isCorrect={isCorrect}
                handleSubmit={handleSubmit}
                speakWord={speakWord}
                showHint={showHint}
                handleShowHint={handleShowHint}
                showAlphabetHelper={showAlphabetHelper}
                handleAlphabetHelperToggle={handleAlphabetHelperToggle}
                handleInputSelect={handleInputSelect}
                handleInputChange={handleInputChange}
                setCursorPosition={setCursorPosition}
              />
              
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
          <GameResult 
            isAdventure={isAdventure}
            score={score}
            handlePlayAgain={handlePlayAgain}
            handleAdventureReturn={handleAdventureReturn}
          />
        )}
      </div>
    </div>
  );
};

export default SpellingGame;
