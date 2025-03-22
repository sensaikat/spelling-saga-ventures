
import React from 'react';
import { useGameStore } from '../../utils/game';
import { useGameState, useAudioControls, useAlphabetHelper } from './hooks';
import { useSpellingGame } from './hooks/useSpellingGame';
import { GameStage } from './GameStage';
import { GameComplete } from './GameComplete';
import { GuideSection } from './GuideSection';
import { SpellingGameContainerProps } from './types';

const SpellingGameContainer: React.FC<SpellingGameContainerProps> = ({ 
  isAdventure = false,
  onAdventureComplete
}) => {
  const { 
    selectedLanguage, 
    currentWordList,
  } = useGameStore();
  
  const { words = [] } = currentWordList || { words: [] };
  
  // Core game logic hooks
  const {
    currentWord,
    userInput,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    isCheckingAnswer,
    inputStatus,
    showHint,
    remainingLives,
    showGuide,
    
    setUserInput,
    handleSubmit,
    handlePlayAgainClick,
    handleSkipClick,
    handleShowHint,
    handleAdventureReturn,
    showGuideWithMessage
  } = useSpellingGame(words, isAdventure, onAdventureComplete);
  
  // Audio controls hook
  const {
    audioEnabled,
    isSpeaking,
    toggleAudio,
    speakWord
  } = useAudioControls();
  
  // Alphabet helper hook
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
  
  // Handle character click with required parameters
  const handleCharacterClickWrapper = (char: string) => {
    handleCharacterClick(char, userInput, setUserInput);
  };
  
  // Handle pronunciation with animation
  const handlePronounceWrapper = (text: string) => {
    showGuideWithMessage(text);
    handlePronounce(text);
  };
  
  if (!currentWord && words.length > 0) {
    return <div>Loading game...</div>;
  }
  
  return (
    <div className="flex flex-col h-full relative">
      {!gameFinished && currentWord ? (
        <GameStage 
          currentWord={currentWord}
          userInput={userInput}
          setUserInput={setUserInput}
          score={score}
          wordCount={wordCount}
          currentIndex={currentIndex}
          isAdventure={isAdventure}
          remainingLives={remainingLives}
          showHint={showHint}
          isCheckingAnswer={isCheckingAnswer}
          inputStatus={inputStatus}
          audioEnabled={audioEnabled}
          isSpeaking={isSpeaking}
          showAlphabetHelper={showAlphabetHelper}
          handleSubmit={handleSubmit}
          handleSkipClick={handleSkipClick}
          handleShowHint={handleShowHint}
          handlePlayAgainClick={handlePlayAgainClick}
          handleAdventureReturn={handleAdventureReturn}
          toggleAudio={toggleAudio}
          speakWord={speakWord}
          handleAlphabetHelperToggle={handleAlphabetHelperToggle}
          handleInputSelect={handleInputSelect}
          handleInputChange={(e) => handleInputChange(e, setUserInput)}
          handleCharacterClick={handleCharacterClickWrapper}
          cursorPosition={cursorPosition}
        />
      ) : (
        <GameComplete 
          score={score}
          correctWords={correctWords}
          incorrectWords={incorrectWords}
          isAdventure={isAdventure}
          handlePlayAgainClick={handlePlayAgainClick}
          handleAdventureReturn={handleAdventureReturn}
        />
      )}

      <GuideSection 
        showGuide={showGuide}
        isAdventure={isAdventure}
        terrain="forest"
      />
    </div>
  );
};

export default SpellingGameContainer;
