
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
 * - useGameSubmissionHandler: Processes word submissions and validation
 * - useWordTracking: Tracks word history for statistics
 */

export * from './useGameCore';
export * from './useGameInitialization';
export * from './useGameTimeHandling';
export * from './useGameStateManagement';
export * from './useGameSubmissionHandler';
export * from './useWordTracking';
