
import { useState } from 'react';
import { Word, Language } from '../../../../utils/game';
import { useGameComponents } from './integration/useGameComponents';
import { useGameActions } from './integration/useGameActions';
import { useWordSync } from './integration/useWordSync';

/**
 * Props for the useGameCore hook
 * @interface GameCoreProps
 * @property {Word[]} words - Array of words for the game
 * @property {Language | string | null} selectedLanguage - Selected language
 * @property {Function} onGameComplete - Callback for game completion
 * @property {boolean} isAdventure - Whether in adventure mode
 * @property {Function} addPlayerPoints - Function to add player points
 * @property {Function} updateProgress - Function to update progress
 * @property {Partial<GameSettings>} gameSettings - Optional custom game settings
 */
interface GameCoreProps {
  words: Word[];
  selectedLanguage?: Language | string | null;
  onGameComplete?: (score: number) => void;
  isAdventure?: boolean;
  addPlayerPoints?: (points: number) => void;
  updateProgress?: (wordId: string, isCorrect: boolean) => void;
  gameSettings?: Partial<import('./useGameSettings').GameSettings>;
}

/**
 * Core hook for the spelling game
 * 
 * This hook integrates all the game functionality by composing specialized hooks
 * 
 * @param {GameCoreProps} props - Game configuration
 * @returns Complete game state and control functions
 */
export const useGameCore = ({
  words = [],
  selectedLanguage = null,
  onGameComplete = () => {},
  isAdventure = false,
  addPlayerPoints = () => {},
  updateProgress = () => {},
  gameSettings = {}
}: GameCoreProps) => {
  // Game state initialization
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Initialize game components with properly typed options
  const gameComponents = useGameComponents({
    words,
    gameCompleted,
    customSettings: gameSettings,
    onTimeout: () => setGameCompleted(true)
  });
  
  // Initialize game actions
  const {
    currentWordIndex,
    handleSubmit,
    handleSkip,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn
  } = useGameActions({
    gameComponents,
    selectedLanguage,
    onGameComplete,
    isAdventure,
    addPlayerPoints,
    updateProgress
  });
  
  // Synchronize word index with current word
  useWordSync({
    filteredWords: gameComponents.filteredWords,
    currentWordIndex,
    setCurrentWord: gameComponents.setCurrentWord
  });
  
  // Combine all components into a unified interface
  return {
    // Game state
    currentWord: gameComponents.currentWord,
    userInput: gameComponents.userInput,
    setUserInput: gameComponents.setUserInput,
    isCorrect: gameComponents.isCorrect,
    showResult: gameComponents.showResult,
    showHint: gameComponents.showHint,
    gameCompleted: gameComponents.gameCompleted,
    score: gameComponents.score,
    wordCount: gameComponents.wordCount,
    currentWordIndex,
    remainingLives: gameComponents.remainingLives,
    correctWords: gameComponents.correctWords,
    incorrectWords: gameComponents.incorrectWords,
    timeRemaining: gameComponents.timeRemaining,
    isTimerRunning: gameComponents.isTimerRunning,
    
    // Game actions
    handleSubmit,
    handleSkip,
    handleShowHint,
    handlePlayAgainClick,
    handleAdventureReturn,
    startTimer: gameComponents.startTimer,
    pauseTimer: gameComponents.pauseTimer,
    resetTimer: gameComponents.resetTimer
  };
};
