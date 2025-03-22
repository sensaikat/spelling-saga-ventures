
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState } from './types';

// Store for application state
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
