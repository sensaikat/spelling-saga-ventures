
import { Word } from "../../utils/game";

export interface SpellingGameContainerProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
}

export interface GameStageProps {
  currentWord: Word;
  userInput: string;
  setUserInput: (input: string) => void;
  score: number;
  wordCount: number;
  currentIndex: number;
  isAdventure: boolean;
  remainingLives: number;
  showHint: boolean;
  isCheckingAnswer: boolean;
  inputStatus: 'correct' | 'incorrect' | null;
  audioEnabled: boolean;
  isSpeaking: boolean;
  showAlphabetHelper: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleSkipClick: () => void;
  handleShowHint: () => void;
  handlePlayAgainClick: () => void;
  handleAdventureReturn: () => void;
  toggleAudio: () => void;
  speakWord: (word: Word) => void;
  handleAlphabetHelperToggle: () => void;
  handleInputSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCharacterClick: (char: string) => void;
  cursorPosition: number;
}
