
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AudioButton } from './AudioButton';
import { HintButton } from './HintButton';
import { AlphabetHelperButton } from './AlphabetHelperButton';
import { SkipButton } from './SkipButton';
import { DifficultySelector } from './DifficultySelector';
import { AudioToggle } from './AudioToggle';
import { InfoButton } from './InfoButton';
import { GameInfo } from './GameInfo';

interface GameControlsContainerProps {
  onSkip: () => void;
  onSpeak: () => void;
  onHint: () => void;
  onRestart: () => void;
  difficultyLevel: string;
  onDifficultyChange: (level: string) => void;
  audioEnabled: boolean;
  onAudioToggle: () => void;
  hintsUsed: number;
  maxHints: number;
  isPlaying: boolean;
  showAlphabetHelper?: boolean;
  onAlphabetHelperToggle?: () => void;
}

export const GameControlsContainer: React.FC<GameControlsContainerProps> = ({
  onSkip,
  onSpeak,
  onHint,
  onRestart,
  difficultyLevel,
  onDifficultyChange,
  audioEnabled,
  onAudioToggle,
  hintsUsed,
  maxHints,
  isPlaying,
  showAlphabetHelper = false,
  onAlphabetHelperToggle
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div 
      className="rounded-xl bg-white/90 shadow-md p-4 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <AudioButton 
            audioEnabled={audioEnabled} 
            onSpeak={onSpeak} 
          />

          <HintButton 
            onHint={onHint}
            hintsUsed={hintsUsed}
            maxHints={maxHints}
            isPlaying={isPlaying}
          />

          {onAlphabetHelperToggle && (
            <AlphabetHelperButton
              onAlphabetHelperToggle={onAlphabetHelperToggle}
              showAlphabetHelper={showAlphabetHelper}
            />
          )}

          <SkipButton 
            onSkip={onSkip}
            isPlaying={isPlaying}
          />
        </div>

        <div className="flex items-center gap-2">
          <DifficultySelector 
            difficultyLevel={difficultyLevel}
            onDifficultyChange={onDifficultyChange}
            isPlaying={isPlaying}
          />

          <AudioToggle 
            audioEnabled={audioEnabled}
            onAudioToggle={onAudioToggle}
          />

          <InfoButton onClick={() => setShowInfo(!showInfo)} />
        </div>
      </div>

      <GameInfo 
        showInfo={showInfo}
        hasAlphabetHelper={!!onAlphabetHelperToggle}
      />
    </motion.div>
  );
};
