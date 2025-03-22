
import { useCallback } from 'react';

/**
 * Game settings configuration interface
 * @interface GameSettings
 * @property {number} initialLives - Number of lives when starting a game
 * @property {number} initialTime - Initial time in seconds for countdown timer
 * @property {number} correctAnswerPoints - Points awarded for correct answers
 * @property {number} playerPointsIncrement - Points to add to player account on correct answer
 * @property {number} resultDisplayDuration - How long to show results in ms
 * @property {number} timeWarningThreshold - When to show time warning (in seconds)
 * @property {boolean} autoStartTimer - Whether timer starts automatically
 */
export interface GameSettings {
  initialLives: number;
  initialTime: number;
  correctAnswerPoints: number;
  playerPointsIncrement: number;
  resultDisplayDuration: number;
  timeWarningThreshold: number;
  autoStartTimer: boolean;
}

/**
 * Props for useGameSettings hook
 * @interface UseGameSettingsProps
 * @property {Partial<GameSettings>} overrides - Optional overrides for default settings
 */
interface UseGameSettingsProps {
  overrides?: Partial<GameSettings>;
}

/**
 * Default game settings
 */
const DEFAULT_SETTINGS: GameSettings = {
  initialLives: 3,
  initialTime: 60,
  correctAnswerPoints: 10,
  playerPointsIncrement: 2,
  resultDisplayDuration: 1500,
  timeWarningThreshold: 10,
  autoStartTimer: true
};

/**
 * Hook for managing centralized game settings
 * 
 * This hook provides a single source of truth for all configurable game parameters:
 * - Lives and scoring
 * - Timer configuration
 * - UI display durations
 * 
 * Settings can be overridden via props, allowing for different game modes
 * or difficulty levels to modify the base settings.
 * 
 * @param {UseGameSettingsProps} props - Configuration options
 * @returns The current game settings and a function to update them
 */
export const useGameSettings = ({ overrides = {} }: UseGameSettingsProps = {}) => {
  // Merge default settings with any overrides
  const settings: GameSettings = {
    ...DEFAULT_SETTINGS,
    ...overrides
  };
  
  /**
   * Updates specific settings while preserving others
   * @param {Partial<GameSettings>} newSettings - Settings to update
   */
  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    return {
      ...settings,
      ...newSettings
    };
  }, [settings]);
  
  return {
    settings,
    updateSettings
  };
};
