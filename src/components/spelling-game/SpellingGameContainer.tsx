
import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../utils/game';
import { GameHeader } from './GameHeader';
import { GameContent } from './GameContent';
import { GameResult } from './GameResult';
import { useGameState, useAudioControls, useAlphabetHelper } from './hooks';
import { useAdventure } from '../../contexts/adventure/useAdventure';
import { GameForm } from './GameForm';
import AlphabetHelper from '../alphabet-helper/AlphabetHelper';
import { GameControlsContainer } from '../game-controls/GameControlsContainer';
import GuideCharacter from '../GuideCharacter';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SpellingGameContainerProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

const SpellingGameContainer: React.FC<SpellingGameContainerProps> = ({ 
  isAdventure = false,
  onAdventureComplete
}) => {
  const navigate = useNavigate();
  const { 
    selectedLanguage, 
    selectedGameMode, 
    currentWordList,
    setSelectedGameMode 
  } = useGameStore();
  
  const { words } = currentWordList || { words: [] };
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState<any[]>([]);
  const [correctWords, setCorrectWords] = useState<any[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [inputStatus, setInputStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showHintButton, setShowHintButton] = useState(true);
  const [remainingLives, setRemainingLives] = useState(3);
  
  // Pass isAdventure as the first parameter to useGameState
  const gameState = useGameState(isAdventure, onAdventureComplete, words);
  
  const {
    audioEnabled,
    isSpeaking,
    toggleAudio,
    speakWord
  } = useAudioControls();
  
  const {
    showAlphabetHelper,
    cursorPosition,
    hasComplexScript,
    handleAlphabetHelperToggle,
    handleCharacterClick,
    handleInputSelect,
    handleInputChange,
    handlePronounce
  } = useAlphabetHelper();
  
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  
  // Handle character click with required parameters
  const handleCharacterClickWrapper = (char: string) => {
    handleCharacterClick(char, userInput, setUserInput);
  };
  
  // Handle pronunciation with animation
  const handlePronounceWrapper = (text: string) => {
    setShowGuide(true);
    setGuideMessage(text);
    handlePronounce(text);
    
    // Hide the guide after animation
    setTimeout(() => {
      setShowGuide(false);
    }, 2000);
  };
  
  useEffect(() => {
    if (words && words.length > 0) {
      setCurrentWord(words[0]);
      setWordCount(words.length);
    }
  }, [words]);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (!gameFinished) {
      intervalId = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [gameFinished]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingAnswer(true);
    
    if (!currentWord) return;
    
    const isCorrect = userInput.trim() === currentWord.text.trim();
    
    setInputStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCorrectWords(prevCorrectWords => [...prevCorrectWords, currentWord]);
    } else {
      setIncorrectWords(prevIncorrectWords => [...prevIncorrectWords, {
        ...currentWord,
        userAnswer: userInput
      }]);
    }
    
    setUserInput('');
    
    setTimeout(() => {
      setIsCheckingAnswer(false);
      setInputStatus(null);
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setCurrentWord(words[currentIndex + 1]);
      } else {
        setGameFinished(true);
      }
    }, 1500);
  };
  
  const handlePlayAgainClick = () => {
    setScore(0);
    setCurrentIndex(0);
    setIncorrectWords([]);
    setCorrectWords([]);
    setGameFinished(false);
    setElapsedTime(0);
    setUserInput('');
    if (words && words.length > 0) {
      setCurrentWord(words[0]);
      setWordCount(words.length);
    }
  };
  
  const handleSkipClick = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
      setUserInput('');
    } else {
      setGameFinished(true);
    }
  };
  
  const handleShowHint = () => {
    setShowHintButton(false);
    setShowHint(true);
  };
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };
  
  return (
    <div className="flex flex-col h-full relative">
      <GameHeader 
        remainingLives={remainingLives}
        isAdventure={isAdventure}
        handleAdventureReturn={handleAdventureReturn}
        navigate={navigate}
      />
      
      <div className="flex-grow flex flex-col">
        {currentWord && (
          <GameContent 
            currentWord={currentWord}
            userInput={userInput}
            setUserInput={setUserInput}
            isCorrect={inputStatus === 'correct'}
            showResult={isCheckingAnswer}
            score={score}
            remainingLives={remainingLives}
            showHint={showHint}
            hintsUsed={showHint ? 1 : 0}
            maxHints={3}
            difficultyLevel="all"
            progressPercentage={(currentIndex / wordCount) * 100}
            isAdventure={isAdventure}
            audioEnabled={audioEnabled}
            showAlphabetHelper={showAlphabetHelper}
            handleSubmit={handleSubmit}
            handleSkip={handleSkipClick}
            handleShowHint={handleShowHint}
            handlePlayAgain={handlePlayAgainClick}
            handleDifficultyChange={() => {}}
            toggleAudio={toggleAudio}
            speakWord={speakWord}
            handleAlphabetHelperToggle={handleAlphabetHelperToggle}
            handleInputSelect={handleInputSelect}
            handleInputChange={(e) => handleInputChange(e, setUserInput)}
            handleAdventureReturn={handleAdventureReturn}
            cursorPosition={cursorPosition}
            handleCharacterClick={handleCharacterClickWrapper}
          />
        )}
        
        {gameFinished && (
          <GameResult 
            isAdventure={isAdventure}
            score={score}
            handlePlayAgain={handlePlayAgainClick}
            handleAdventureReturn={handleAdventureReturn}
          />
        )}
      </div>

      <GameControlsContainer 
        onSkip={handleSkipClick}
        onSpeak={() => currentWord && speakWord(currentWord)}
        onHint={handleShowHint}
        onRestart={handlePlayAgainClick}
        difficultyLevel="all"
        onDifficultyChange={() => {}}
        audioEnabled={audioEnabled}
        onAudioToggle={toggleAudio}
        hintsUsed={showHint ? 1 : 0}
        maxHints={3}
        isPlaying={!gameFinished}
        showAlphabetHelper={showAlphabetHelper}
        onAlphabetHelperToggle={handleAlphabetHelperToggle}
      />
      
      <AnimatePresence>
        {showGuide && (
          <motion.div 
            className="absolute bottom-20 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <GuideCharacter 
              terrain="forest"
              isAdventure={isAdventure}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpellingGameContainer;
