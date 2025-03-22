
import React from 'react';
import { GameStage } from './GameStage';
import { GameComplete } from './GameComplete';
import GuideSection from './GuideSection';
import { SpellingGameContainerProps } from './types';
import { useSpellingGameContainer } from './hooks/useSpellingGameContainer';

const SpellingGameContainer: React.FC<SpellingGameContainerProps> = ({ 
  isAdventure = false,
  onAdventureComplete,
  terrain = 'forest'
}) => {
  const {
    // Game state
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
    
    // Game controls
    audioEnabled,
    isSpeaking,
    showAlphabetHelper,
    cursorPosition,
    
    // Game actions
    setUserInput,
    handleSubmit,
    handlePlayAgainClick,
    handleSkipClick,
    handleShowHint,
    handleAdventureReturn,
    toggleAudio,
    speakWord,
    handleAlphabetHelperToggle,
    handleCharacterClick,
    handleInputSelect,
    handleInputChange: originalHandleInputChange
  } = useSpellingGameContainer(isAdventure, onAdventureComplete, terrain);
  
  // Adapter function to match the expected signature
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    originalHandleInputChange(e, setUserInput);
  };
  
  if (!currentWord && wordCount > 0) {
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
          handleInputChange={handleInputChange}
          handleCharacterClick={handleCharacterClick}
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
        terrain={terrain}
      />
    </div>
  );
};

export default SpellingGameContainer;
