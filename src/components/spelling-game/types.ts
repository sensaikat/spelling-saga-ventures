import { Word } from "../../utils/game";
import { TerrainType } from "../../contexts/adventure/types";

export interface SpellingGameContainerProps {
  isAdventure?: boolean;
  onAdventureComplete?: (score: number) => void;
  terrain?: TerrainType;
}

export interface GameStageProps {
  currentWord: Word;
  userInput: string;
  setUserInput: (value: string) => void;
  score: number;
  wordCount: number;
  currentIndex: number;
  isAdventure: boolean;
  remainingLives: number;
  showHint: boolean;
  isCheckingAnswer: boolean;
  inputStatus: InputStatus;
  audioEnabled: boolean;
  isSpeaking: boolean;
  showAlphabetHelper: boolean;
  timeRemaining?: number;
  isTimerRunning?: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleSkipClick: () => void;
  handleShowHint: () => void;
  handlePlayAgainClick: () => void;
  handleAdventureReturn: () => void;
  toggleAudio: () => void;
  speakWord: (word: Word) => void;
  handleAlphabetHelperToggle: () => void;
  handleInputSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, setUserInput: (value: string) => void) => void;
  handleCharacterClick: (char: string) => void;
  cursorPosition: number;
}
