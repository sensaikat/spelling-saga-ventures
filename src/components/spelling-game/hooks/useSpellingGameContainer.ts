
import { useState } from 'react';
import { useGameStore } from '../../../utils/game';
import { TerrainType } from '../../../contexts/adventure/types';
import { useSpellingGame } from './useSpellingGame';
import { useAudioControls } from './useAudioControls';
import { useAlphabetHelper } from './useAlphabetHelper';
import { Word } from '../../../utils/game';
import { InputStatus } from '../types';

export const useSpellingGameContainer = (
  isAdventure: boolean = false,
  onAdventureComplete?: (score: number) => void,
  terrain: TerrainType = 'forest'
) => {
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
    isCorrect,
    showResult,
    showHint,
    gameCompleted: gameFinished,
    remainingLives,
    showGuide,
    timeRemaining,
    isTimerRunning,
    inputStatus,
    correctWords = [],
    incorrectWords = [],
    
    setUserInput,
    handleSubmit,
    handlePlayAgainClick,
    handleSkipClick,
    handleShowHint,
    handleAdventureReturn,
    showGuideWithMessage
  } = useSpellingGame(words, isAdventure, onAdventureComplete);
  
  // Calculate current index for progress
  const currentIndex = words.findIndex(w => currentWord && w.id === currentWord.id);
  const wordCount = words.length;
  
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
    if (showGuideWithMessage) {
      showGuideWithMessage(text);
    }
    handlePronounce(text);
  };
  
  return {
    // Game state
    currentWord,
    userInput,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    isCheckingAnswer: showResult,
    inputStatus: isCorrect === true ? 'correct' as InputStatus : isCorrect === false ? 'incorrect' as InputStatus : 'idle' as InputStatus,
    showHint,
    remainingLives,
    showGuide,
    terrain,
    
    // Timer state
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
    handleCharacterClick: handleCharacterClickWrapper,
    handleInputSelect,
    handleInputChange,
    handlePronounce: handlePronounceWrapper
  };
};
