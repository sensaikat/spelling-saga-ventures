import React, { useState, useEffect } from 'react';
import { useGameStore, WordList } from '../../utils/game';
import GameHeader from './GameHeader';
import GameContent from './GameContent';
import GameResult from './GameResult';
import { useGameState, useAudioControls, useAlphabetHelper } from './hooks';
import { useAdventure } from '../../contexts/adventure/useAdventure';
import GameForm from './GameForm';
import AlphabetHelper from '../alphabet-helper/AlphabetHelper';
import GameControlsContainer from '../game-controls/GameControlsContainer';
import { GuideCharacter } from '../GuideCharacter';
import { motion, AnimatePresence } from 'framer-motion';

interface SpellingGameContainerProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

const SpellingGameContainer: React.FC<SpellingGameContainerProps> = ({ 
  isAdventure = false,
  onAdventureComplete
}) => {
  const { wordList, selectedLanguage, gameMode, setGameMode } = useGameStore();
  const { words } = wordList || { words: [] };
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
  const [hint, setHint] = useState('');
  const [showHintButton, setShowHintButton] = useState(true);
  
  const { nextWord, remainingWords } = useGameState({
    words,
    currentIndex,
    setCurrentIndex,
    setCurrentWord,
    setGameFinished,
    setHint,
    setShowHintButton
  });
  
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
      nextWord();
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
    nextWord();
    setUserInput('');
  };
  
  const handleShowHint = () => {
    setShowHintButton(false);
  };
  
  return (
    <div className="flex flex-col h-full relative">
      <GameHeader 
        score={score} 
        isCheckingAnswer={isCheckingAnswer} 
        isAdventure={isAdventure}
      />
      
      <div className="flex-grow flex flex-col">
        <GameContent 
          currentWord={currentWord} 
          wordCount={wordCount}
          currentIndex={currentIndex}
          remainingWords={remainingWords}
          elapsedTime={elapsedTime}
          isAdventure={isAdventure}
        >
          <GameForm
            userInput={userInput}
            setUserInput={setUserInput}
            handleInputSelect={handleInputSelect}
            handleInputChange={(e) => handleInputChange(e, setUserInput)}
            handleSubmit={handleSubmit}
            cursorPosition={cursorPosition}
            isCheckingAnswer={isCheckingAnswer}
            inputStatus={inputStatus}
          />
          
          {showAlphabetHelper && selectedLanguage && (
            <AlphabetHelper 
              languageId={selectedLanguage.id} 
              onCharacterClick={handleCharacterClickWrapper}
              onPronounce={handlePronounceWrapper}
            />
          )}
        </GameContent>
        
        {gameFinished && (
          <GameResult 
            score={score} 
            incorrectWords={incorrectWords} 
            correctWords={correctWords}
            onPlayAgain={handlePlayAgainClick}
            isAdventure={isAdventure}
            onAdventureComplete={onAdventureComplete}
          />
        )}
      </div>

      <GameControlsContainer 
        currentWord={currentWord}
        hasAlphabetHelper={hasComplexScript}
        showAlphabetHelper={showAlphabetHelper}
        onAlphabetHelperToggle={handleAlphabetHelperToggle}
        audioEnabled={audioEnabled}
        onAudioToggle={toggleAudio}
        onSpeak={() => currentWord && speakWord(currentWord)}
        onSkip={handleSkipClick}
        onShowHint={handleShowHint}
        gameMode="spelling"
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
              message={guideMessage} 
              isSpeaking={true}
              character="owl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpellingGameContainer;
