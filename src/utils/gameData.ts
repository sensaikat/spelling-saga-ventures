
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
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

// Available languages
export const languages: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { id: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

// Game modes
export const gameModes: GameMode[] = [
  { 
    id: 'spelling', 
    name: 'Spelling Challenge', 
    description: 'Test your spelling skills by typing the words you hear', 
    icon: 'pencil', 
    color: 'bg-game-blue'
  },
  { 
    id: 'scramble', 
    name: 'Word Scramble', 
    description: 'Unscramble the letters to form the correct word', 
    icon: 'shuffle', 
    color: 'bg-game-purple'
  },
  { 
    id: 'match', 
    name: 'Match & Learn', 
    description: 'Match words with their correct spelling', 
    icon: 'duplicate', 
    color: 'bg-game-green'
  },
  { 
    id: 'fill', 
    name: 'Fill the Blanks', 
    description: 'Complete words by filling in the missing letters', 
    icon: 'text-cursor-input', 
    color: 'bg-game-red'
  },
];

// Sample word list for English (would be larger in full implementation)
export const wordLists: Record<string, WordList[]> = {
  en: [
    {
      id: 'en-basics',
      name: 'Basic Words',
      description: 'Common everyday words for beginners',
      words: [
        { id: 'en-1', text: 'apple', difficulty: 'easy' },
        { id: 'en-2', text: 'banana', difficulty: 'easy' },
        { id: 'en-3', text: 'cat', difficulty: 'easy' },
        { id: 'en-4', text: 'dog', difficulty: 'easy' },
        { id: 'en-5', text: 'elephant', difficulty: 'medium' },
        { id: 'en-6', text: 'flower', difficulty: 'medium' },
        { id: 'en-7', text: 'giraffe', difficulty: 'medium' },
        { id: 'en-8', text: 'house', difficulty: 'easy' },
      ],
      languageId: 'en',
      difficulty: 'easy',
    },
    {
      id: 'en-animals',
      name: 'Animals',
      description: 'Words related to animals and wildlife',
      words: [
        { id: 'en-a1', text: 'tiger', difficulty: 'medium' },
        { id: 'en-a2', text: 'penguin', difficulty: 'medium' },
        { id: 'en-a3', text: 'zebra', difficulty: 'medium' },
        { id: 'en-a4', text: 'kangaroo', difficulty: 'hard' },
        { id: 'en-a5', text: 'dolphin', difficulty: 'medium' },
        { id: 'en-a6', text: 'octopus', difficulty: 'hard' },
      ],
      languageId: 'en',
      difficulty: 'medium',
    },
  ],
  es: [
    {
      id: 'es-basics',
      name: 'Palabras Básicas',
      description: 'Palabras comunes para principiantes',
      words: [
        { id: 'es-1', text: 'manzana', difficulty: 'easy' },
        { id: 'es-2', text: 'plátano', difficulty: 'easy' },
        { id: 'es-3', text: 'gato', difficulty: 'easy' },
        { id: 'es-4', text: 'perro', difficulty: 'easy' },
        { id: 'es-5', text: 'elefante', difficulty: 'medium' },
        { id: 'es-6', text: 'flor', difficulty: 'easy' },
        { id: 'es-7', text: 'jirafa', difficulty: 'medium' },
        { id: 'es-8', text: 'casa', difficulty: 'easy' },
      ],
      languageId: 'es',
      difficulty: 'easy',
    },
  ],
  hi: [
    {
      id: 'hi-basics',
      name: 'मूल शब्द',
      description: 'शुरुआती लोगों के लिए आम शब्द',
      words: [
        { id: 'hi-1', text: 'सेब', difficulty: 'easy' },
        { id: 'hi-2', text: 'केला', difficulty: 'easy' },
        { id: 'hi-3', text: 'बिल्ली', difficulty: 'easy' },
        { id: 'hi-4', text: 'कुत्ता', difficulty: 'easy' },
        { id: 'hi-5', text: 'हाथी', difficulty: 'medium' },
        { id: 'hi-6', text: 'फूल', difficulty: 'easy' },
      ],
      languageId: 'hi',
      difficulty: 'easy',
    },
  ],
};

// Store for application state
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

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      selectedLanguage: null,
      selectLanguage: (language) => set({ selectedLanguage: language }),
      
      currentWordList: null,
      setCurrentWordList: (wordList) => set({ currentWordList: wordList }),
      
      selectedGameMode: null,
      setSelectedGameMode: (gameMode) => set({ selectedGameMode: gameMode }),
      
      progress: {
        wordsMastered: [],
        wordsInProgress: {},
        streakDays: 0,
        lastPlayed: null,
        points: 0,
        level: 1,
      },
      
      addMasteredWord: (wordId) => set((state) => ({
        progress: {
          ...state.progress,
          wordsMastered: [...state.progress.wordsMastered, wordId]
        }
      })),
      
      updateWordProgress: (wordId, isCorrect) => set((state) => {
        const currentProgress = state.progress.wordsInProgress[wordId] || 0;
        const newProgress = isCorrect ? currentProgress + 1 : Math.max(0, currentProgress - 1);
        
        // If reached mastery threshold (3 correct attempts)
        if (newProgress >= 3 && !state.progress.wordsMastered.includes(wordId)) {
          return {
            progress: {
              ...state.progress,
              wordsMastered: [...state.progress.wordsMastered, wordId],
              wordsInProgress: {
                ...state.progress.wordsInProgress,
                [wordId]: newProgress
              },
              points: state.progress.points + 10 // Bonus points for mastering
            }
          };
        }
        
        return {
          progress: {
            ...state.progress,
            wordsInProgress: {
              ...state.progress.wordsInProgress,
              [wordId]: newProgress
            },
            points: state.progress.points + (isCorrect ? 2 : 0)
          }
        };
      }),
      
      addPoints: (points) => set((state) => {
        const newPoints = state.progress.points + points;
        const newLevel = Math.floor(newPoints / 100) + 1; // Level up every 100 points
        
        return {
          progress: {
            ...state.progress,
            points: newPoints,
            level: newLevel
          }
        };
      }),
      
      checkAndUpdateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastPlayed = state.progress.lastPlayed;
        
        // If first time playing or played on a different day
        if (!lastPlayed || lastPlayed !== today) {
          // Check if the last day played was yesterday
          if (lastPlayed) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split('T')[0];
            
            if (lastPlayed === yesterdayString) {
              // Streak continues
              return {
                progress: {
                  ...state.progress,
                  streakDays: state.progress.streakDays + 1,
                  lastPlayed: today
                }
              };
            }
          }
          
          // Streak reset or first day
          return {
            progress: {
              ...state.progress,
              streakDays: 1,
              lastPlayed: today
            }
          };
        }
        
        // Same day, no change to streak
        return { progress: state.progress };
      }),
      
      isOfflineMode: false,
      toggleOfflineMode: () => set((state) => ({ isOfflineMode: !state.isOfflineMode })),
    }),
    {
      name: 'spelling-saga-game-storage',
    }
  )
);
