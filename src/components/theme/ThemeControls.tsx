
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { useThemeStore, useThemeToggle, useAudio } from '../../contexts/theme/ThemeContext';

interface ThemeControlsProps {
  minimized?: boolean;
}

export const ThemeControls: React.FC<ThemeControlsProps> = ({ minimized = false }) => {
  const { 
    backgroundMusic, 
    toggleBackgroundMusic, 
    backgroundMusicVolume, 
    setBackgroundMusicVolume,
    soundEffects,
    toggleSoundEffects,
    soundEffectsVolume,
    setSoundEffectsVolume
  } = useThemeStore();
  
  const { isDarkMode, toggleTheme } = useThemeToggle();
  
  // Simplified version for minimized mode
  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-md backdrop-blur-sm"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleBackgroundMusic}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-md backdrop-blur-sm"
          aria-label={backgroundMusic ? "Mute music" : "Unmute music"}
        >
          {backgroundMusic ? <Music size={18} /> : <Music2 size={18} />}
        </motion.button>
      </div>
    );
  }
  
  // Full controls version
  return (
    <motion.div 
      className="p-4 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {/* Theme toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium dark:text-white">Theme</span>
          <Toggle 
            pressed={isDarkMode} 
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            className="data-[state=on]:bg-blue-600"
          >
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
          </Toggle>
        </div>
        
        {/* Background music toggle and volume */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">Background Music</span>
            <Toggle 
              pressed={backgroundMusic} 
              onPressedChange={toggleBackgroundMusic}
              aria-label="Toggle background music"
              className="data-[state=on]:bg-green-600"
            >
              {backgroundMusic ? <Music size={16} /> : <Music2 size={16} />}
            </Toggle>
          </div>
          
          {backgroundMusic && (
            <div className="pt-2">
              <Slider 
                value={[backgroundMusicVolume * 100]} 
                onValueChange={(values) => setBackgroundMusicVolume(values[0] / 100)}
                max={100}
                step={5}
                aria-label="Background music volume"
              />
            </div>
          )}
        </div>
        
        {/* Sound effects toggle and volume */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">Sound Effects</span>
            <Toggle 
              pressed={soundEffects} 
              onPressedChange={toggleSoundEffects}
              aria-label="Toggle sound effects"
              className="data-[state=on]:bg-purple-600"
            >
              {soundEffects ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Toggle>
          </div>
          
          {soundEffects && (
            <div className="pt-2">
              <Slider 
                value={[soundEffectsVolume * 100]} 
                onValueChange={(values) => setSoundEffectsVolume(values[0] / 100)}
                max={100}
                step={5}
                aria-label="Sound effects volume"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
