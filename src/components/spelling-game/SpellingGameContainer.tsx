
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAdventure } from '../../contexts/adventure/useAdventure';
import { GameResult, terrainBackgrounds } from '../../components/spelling-game';
import { GameContent } from './GameContent';
import { useGameState, useAudioControls, useAlphabetHelper } from './hooks';

interface SpellingGameContainerProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

const SpellingGameContainer: React.FC<SpellingGameContainerProps> = ({ 
  isAdventure = false, 
  onAdventureComplete 
}) => {
  const { gameId } = useParams<{ gameId: string }>();
  const { getCurrentLocation } = useAdventure();
  const currentLocation = getCurrentLocation();
  
  const {
    currentWord,
    userInput,
    setUserInput,
    isCorrect,
    showResult,
    gameCompleted,
    score,
    remainingLives,
    showHint,
    hintsUsed,
    maxHints,
    difficultyLevel,
    currentWordIndex,
    filteredWords,
    handlePlayAgain,
    handleSubmit,
    handleDifficultyChange,
    handleSkip,
    handleShowHint,
    handleAdventureReturn
  } = useGameState(isAdventure, onAdventureComplete);
  
  const {
    audioEnabled,
    toggleAudio,
    speakWord
  } = useAudioControls();
  
  const {
    showAlphabetHelper,
    handleAlphabetHelperToggle,
    handleInputSelect,
    handleInputChange: baseHandleInputChange,
    handleCharacterClick: baseHandleCharacterClick,
    cursorPosition
  } = useAlphabetHelper();
  
  // Calculate progress percentage
  const progressPercentage = filteredWords.length > 0 
    ? ((currentWordIndex + 1) / filteredWords.length) * 100
    : 0;
  
  // Adapt handleInputChange to our component props
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    baseHandleInputChange(e, setUserInput);
  };
  
  // Adapt handleCharacterClick to our component props
  const handleCharacterClick = (char: string) => {
    if (showResult) return;
    
    baseHandleCharacterClick(char, userInput, setUserInput);
  };
  
  // Determine background based on adventure location
  const backgroundClass = isAdventure && currentLocation 
    ? terrainBackgrounds[currentLocation.terrain] 
    : 'bg-gradient-to-b from-blue-50 to-purple-50';
  
  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="container mx-auto px-4 py-6">
        {!gameCompleted ? (
          <GameContent
            currentWord={currentWord}
            userInput={userInput}
            setUserInput={setUserInput}
            isCorrect={isCorrect}
            showResult={showResult}
            score={score}
            remainingLives={remainingLives}
            showHint={showHint}
            hintsUsed={hintsUsed}
            maxHints={maxHints}
            difficultyLevel={difficultyLevel}
            progressPercentage={progressPercentage}
            isAdventure={isAdventure}
            audioEnabled={audioEnabled}
            showAlphabetHelper={showAlphabetHelper}
            handleSubmit={handleSubmit}
            handleSkip={handleSkip}
            handleShowHint={handleShowHint}
            handlePlayAgain={handlePlayAgain}
            handleDifficultyChange={handleDifficultyChange}
            toggleAudio={toggleAudio}
            speakWord={speakWord}
            handleAlphabetHelperToggle={handleAlphabetHelperToggle}
            handleInputSelect={handleInputSelect}
            handleInputChange={handleInputChange}
            handleAdventureReturn={handleAdventureReturn}
            cursorPosition={cursorPosition}
            handleCharacterClick={handleCharacterClick}
          />
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

export default SpellingGameContainer;
