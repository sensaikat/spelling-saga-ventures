
import React, { createContext, useContext, useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define our theme types
export type ThemeMode = 'light' | 'dark' | 'auto';
export type VolumeLevel = 'muted' | 'low' | 'medium' | 'high';

// Store for theme and audio preferences
interface ThemeState {
  // Theme settings
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  
  // Audio settings
  backgroundMusic: boolean;
  backgroundMusicVolume: number;
  soundEffects: boolean;
  soundEffectsVolume: number;
  
  // Actions
  toggleBackgroundMusic: () => void;
  setBackgroundMusicVolume: (volume: number) => void;
  toggleSoundEffects: () => void;
  setSoundEffectsVolume: (volume: number) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Theme settings
      themeMode: 'light',
      setThemeMode: (mode) => set({ themeMode: mode }),
      
      // Audio settings
      backgroundMusic: true,
      backgroundMusicVolume: 0.3, // 30% volume by default
      soundEffects: true,
      soundEffectsVolume: 0.5,
      
      // Actions
      toggleBackgroundMusic: () => set((state) => ({ 
        backgroundMusic: !state.backgroundMusic 
      })),
      setBackgroundMusicVolume: (volume) => set({ backgroundMusicVolume: volume }),
      toggleSoundEffects: () => set((state) => ({ 
        soundEffects: !state.soundEffects 
      })),
      setSoundEffectsVolume: (volume) => set({ soundEffectsVolume: volume })
    }),
    {
      name: 'spelling-saga-theme-storage',
    }
  )
);

// Context for audio playback
type AudioContextType = {
  currentMusic: string | null;
  playBackgroundMusic: (track: string) => void;
  stopBackgroundMusic: () => void;
  playSoundEffect: (effect: string) => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const { backgroundMusic, backgroundMusicVolume, soundEffects, soundEffectsVolume } = useThemeStore();

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audio]);

  // Update volume when changed in settings
  useEffect(() => {
    if (audio && backgroundMusic) {
      audio.volume = backgroundMusicVolume;
    } else if (audio) {
      audio.volume = 0;
    }
  }, [audio, backgroundMusic, backgroundMusicVolume]);

  const playBackgroundMusic = (track: string) => {
    if (!backgroundMusic) return;
    
    // If we already have the same track playing, don't restart
    if (currentMusic === track && audio) return;
    
    // Stop current audio if any
    if (audio) {
      audio.pause();
      audio.src = '';
    }
    
    // Create and play new audio
    const newAudio = new Audio(track);
    newAudio.loop = true;
    newAudio.volume = backgroundMusicVolume;
    
    // Fade in
    newAudio.volume = 0;
    const fadeIn = setInterval(() => {
      if (newAudio.volume < backgroundMusicVolume) {
        newAudio.volume = Math.min(newAudio.volume + 0.05, backgroundMusicVolume);
      } else {
        clearInterval(fadeIn);
      }
    }, 100);
    
    newAudio.play().catch(err => console.error("Audio playback error:", err));
    setAudio(newAudio);
    setCurrentMusic(track);
  };

  const stopBackgroundMusic = () => {
    if (!audio) return;
    
    // Fade out
    const fadeOut = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        audio.pause();
        audio.src = '';
        setAudio(null);
        setCurrentMusic(null);
      }
    }, 100);
  };

  const playSoundEffect = (effect: string) => {
    if (!soundEffects) return;
    
    const effectAudio = new Audio(effect);
    effectAudio.volume = soundEffectsVolume;
    effectAudio.play().catch(err => console.error("Sound effect error:", err));
  };

  return (
    <AudioContext.Provider value={{ 
      currentMusic, 
      playBackgroundMusic, 
      stopBackgroundMusic, 
      playSoundEffect 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

// Context for theme toggling
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeToggleContext = createContext<ThemeContextType | null>(null);

export const useThemeToggle = () => {
  const context = useContext(ThemeToggleContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { themeMode, setThemeMode } = useThemeStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Set theme based on user preference and system preference
  useEffect(() => {
    const updateTheme = () => {
      if (themeMode === 'auto') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      } else {
        setIsDarkMode(themeMode === 'dark');
        document.documentElement.classList.toggle('dark', themeMode === 'dark');
      }
    };
    
    // Update initially
    updateTheme();
    
    // Listen for system theme changes if in auto mode
    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [themeMode]);
  
  const toggleTheme = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };
  
  return (
    <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};

// Combined provider for convenience
export const ThemeAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <AudioProvider>
        {children}
      </AudioProvider>
    </ThemeProvider>
  );
};
