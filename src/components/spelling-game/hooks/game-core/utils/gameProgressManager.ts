
import { Word } from '../../../../../utils/game';

/**
 * Determines if the game should end based on current game state
 * 
 * @param {number} currentWordIndex - Current word index
 * @param {number} totalWords - Total available words
 * @param {number} remainingLives - Remaining player lives
 * @param {boolean} isCorrect - Whether the current word was answered correctly
 * @returns {boolean} Whether the game should end
 */
export const shouldEndGame = (
  currentWordIndex: number,
  totalWords: number,
  remainingLives: number,
  isCorrect: boolean
): boolean => {
  // Game ends if we're at the last word
  if (currentWordIndex >= totalWords - 1) {
    return true;
  }
  
  // Game ends if player answered incorrectly and is on their last life
  if (!isCorrect && remainingLives <= 1) {
    return true;
  }
  
  return false;
};

/**
 * Determines if the player should move to the next word
 * 
 * @param {boolean} isCorrect - Whether the current word was answered correctly
 * @param {number} remainingLives - Remaining player lives
 * @returns {boolean} Whether to move to the next word
 */
export const shouldMoveToNextWord = (
  isCorrect: boolean,
  remainingLives: number
): boolean => {
  // Only move to next word if answer was correct or player has more than 1 life
  return isCorrect || remainingLives > 1;
};
