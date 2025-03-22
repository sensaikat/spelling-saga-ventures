
import React from 'react';
import { motion } from 'framer-motion';
import { Word, useGameStore } from '../../utils/game';
import { 
  GameHeader,
  ProgressBar,
  GameForm,
} from '../../components/spelling-game';
import GameControls from '../../components/GameControls';
import AlphabetHelper from '../../components/alphabet-helper';
import { WordCard } from '../word-card';
import { useNavigate } from 'react-router-dom';

interface GameContentProps {
  currentWord: Word;
  userInput: string;
  setUserInput: (value: string) => void;
  isCorrect: boolean | null;
  showResult: boolean;
  score: number;
  remainingLives: number;
  showHint: boolean;
  hintsUsed: number;
  maxHints: number;
  difficultyLevel: string;
  progressPercentage: number;
  isAdventure: boolean;
  audioEnabled: boolean;
  showAlphabetHelper: boolean;
  timeRemaining?: number;
  isTimerRunning?: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleSkip: () => void;
  handleShowHint: () => void;
  handlePlayAgain: () => void;
  handleDifficultyChange: (level: string) => void;
  toggleAudio: () => void;
  speakWord: (word: Word) => void;
  handleAlphabetHelperToggle: () => void;
  handleInputSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdventureReturn: () => void;
  cursorPosition: number;
  handleCharacterClick: (char: string) => void;
}

export const GameContent: React.FC<GameContentProps> = ({
  currentWord,
  userInput,
  setUserInput,
  isCorrect,
  showResult,
  score,
  remainingLives,
  showHint,
  hintsUsed,
  maxHints,
  difficultyLevel,
  progressPercentage,
  isAdventure,
  audioEnabled,
  showAlphabetHelper,
  timeRemaining,
  isTimerRunning,
  handleSubmit,
  handleSkip,
  handleShowHint,
  handlePlayAgain,
  handleDifficultyChange,
  toggleAudio,
  speakWord,
  handleAlphabetHelperToggle,
  handleInputSelect,
  handleInputChange,
  handleAdventureReturn,
  cursorPosition,
  handleCharacterClick
}) => {
  const navigate = useNavigate();
  const { selectedLanguage, selectedGameMode, currentWordList } = useGameStore();
  
  if (!currentWord) {
    return null;
  }
  
  return (
    <>
      <GameHeader 
        remainingLives={remainingLives}
        isAdventure={isAdventure}
        handleAdventureReturn={handleAdventureReturn}
        timeRemaining={timeRemaining}
        isTimerRunning={isTimerRunning}
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
            {selectedGameMode?.name || "Spelling Challenge"}
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>{selectedLanguage?.flag}</span>
            <span>{currentWordList?.name}</span>
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
        
        {showAlphabetHelper && selectedLanguage && (
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
          setCursorPosition={cursorPosition}
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
  );
};
