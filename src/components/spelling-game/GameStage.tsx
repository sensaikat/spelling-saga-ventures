
import React from 'react';
import { GameContent } from './GameContent';
import { GameForm } from './GameForm';
import { GameHeader } from './GameHeader';
import { GameControlsContainer } from '../game-controls/GameControlsContainer';
import { GameStageProps } from './types';
import { useNavigate } from 'react-router-dom';

export const GameStage: React.FC<GameStageProps> = ({
  currentWord,
  userInput,
  setUserInput,
  score,
  wordCount,
  currentIndex,
  isAdventure,
  remainingLives,
  showHint,
  isCheckingAnswer,
  inputStatus,
  audioEnabled,
  isSpeaking,
  showAlphabetHelper,
  timeRemaining,
  isTimerRunning,
  handleSubmit,
  handleSkipClick,
  handleShowHint,
  handlePlayAgainClick,
  handleAdventureReturn,
  toggleAudio,
  speakWord,
  handleAlphabetHelperToggle,
  handleInputSelect,
  handleInputChange,
  handleCharacterClick,
  cursorPosition
}) => {
  const navigate = useNavigate();
  
  const progressPercentage = (currentIndex / wordCount) * 100;
  
  return (
    <>
      <GameHeader 
        remainingLives={remainingLives}
        isAdventure={isAdventure}
        handleAdventureReturn={handleAdventureReturn}
        timeRemaining={timeRemaining}
        isTimerRunning={isTimerRunning}
      />
      
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
        progressPercentage={progressPercentage}
        isAdventure={isAdventure}
        audioEnabled={audioEnabled}
        showAlphabetHelper={showAlphabetHelper}
        timeRemaining={timeRemaining}
        isTimerRunning={isTimerRunning}
        handleSubmit={handleSubmit}
        handleSkip={handleSkipClick}
        handleShowHint={handleShowHint}
        handlePlayAgain={handlePlayAgainClick}
        handleDifficultyChange={() => {}}
        toggleAudio={toggleAudio}
        speakWord={speakWord}
        handleAlphabetHelperToggle={handleAlphabetHelperToggle}
        handleInputSelect={handleInputSelect}
        handleInputChange={handleInputChange}
        handleAdventureReturn={handleAdventureReturn}
        cursorPosition={cursorPosition}
        handleCharacterClick={handleCharacterClick}
      />
      
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
        isPlaying={!isCheckingAnswer}
        showAlphabetHelper={showAlphabetHelper}
        onAlphabetHelperToggle={handleAlphabetHelperToggle}
      />
    </>
  );
};
