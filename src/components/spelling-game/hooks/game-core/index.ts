
/**
 * Game Core Hooks
 * 
 * This module exports a collection of hooks that provide the core functionality
 * for the spelling game. Each hook is focused on a specific aspect of the game:
 * 
 * - useGameCore: Main integration hook that combines all other hooks
 * - useGameInitialization: Handles initial setup of game words
 * - useGameTimeHandling: Manages countdown timer functionality
 * - useGameStateManagement: Centralizes game state variables
 * - useGameState: Manages core game state (score, input, correctness)
 * - useGameUIState: Manages UI-specific state (hints, checking)
 * - useGameLives: Manages player lives
 * - useGameSubmissionHandler: Processes word submissions and validation
 * - useWordTracking: Tracks word history for statistics
 * - useGameEvents: Handles game-level events like completion
 * - useGameReset: Provides functionality for resetting the game
 * - useGameSettings: Centralizes game configuration settings
 * 
 * The utils folder contains supporting functionality for text normalization,
 * language detection, word validation, and game progress management.
 */

export * from './useGameCore';
export * from './useGameInitialization';
export * from './useGameTimeHandling';
export * from './useGameStateManagement';
export * from './useGameState';
export * from './useGameUIState';
export * from './useGameLives';
export * from './useGameSubmissionHandler';
export * from './useWordTracking';
export * from './useGameEvents';
export * from './useGameReset';
export * from './useGameSettings';
export * from './utils';
