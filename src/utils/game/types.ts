// Types for our game system
export type Language = {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
};

export type Word = {
  id: string;
  text: string;
  audio?: string;
  image?: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language?: string; // Added language property
};

export type WordList = {
  id: string;
  name: string;
  description: string;
  words: Word[];
  languageId: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GameMode = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type UserProgress = {
  wordsMastered: string[];
  wordsInProgress: Record<string, number>; // wordId -> correctAttempts
  streakDays: number;
  lastPlayed: string | null;
  points: number;
  level: number;
};

export interface GameState {
  selectedLanguage: Language | null;
  selectLanguage: (language: Language) => void;
  
  currentWordList: WordList | null;
  setCurrentWordList: (wordList: WordList | null) => void;
  
  selectedGameMode: GameMode | null;
  setSelectedGameMode: (gameMode: GameMode | null) => void;
  
  progress: UserProgress;
  addMasteredWord: (wordId: string) => void;
  updateWordProgress: (wordId: string, isCorrect: boolean) => void;
  addPoints: (points: number) => void;
  checkAndUpdateStreak: () => void;
  
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
}
