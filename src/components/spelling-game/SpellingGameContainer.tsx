
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
    timeRemaining,
    isTimerRunning,
    
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
    handleInputChange
  } = useSpellingGameContainer(isAdventure, onAdventureComplete, terrain);
  
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
          timeRemaining={timeRemaining}
          isTimerRunning={isTimerRunning}
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
        timeRemaining={timeRemaining}
      />
    </div>
  );
};

export default SpellingGameContainer;
