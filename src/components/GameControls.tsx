
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Volume, 
  VolumeX, 
  RefreshCw, 
  HelpCircle,
  Settings,
  Info,
  Type
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

interface GameControlsProps {
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

const GameControls: React.FC<GameControlsProps> = ({
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

  const handleHintClick = () => {
    if (hintsUsed < maxHints) {
      onHint();
    } else {
      toast({
        title: "No hints left",
        description: "You've used all your available hints for this game.",
        duration: 3000,
      });
    }
  };

  return (
    <motion.div 
      className="rounded-xl bg-white/90 shadow-md p-4 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onSpeak}
            className="game-control-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Pronounce word"
          >
            {audioEnabled ? <Volume size={20} /> : <VolumeX size={20} />}
          </motion.button>

          <motion.button
            onClick={handleHintClick}
            disabled={hintsUsed >= maxHints || !isPlaying}
            className={`game-control-button ${hintsUsed >= maxHints ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={hintsUsed < maxHints ? { scale: 1.1 } : {}}
            whileTap={hintsUsed < maxHints ? { scale: 0.9 } : {}}
            title="Get hint"
          >
            <HelpCircle size={20} />
            <span className="text-xs bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
              {maxHints - hintsUsed}
            </span>
          </motion.button>

          {onAlphabetHelperToggle && (
            <motion.button
              onClick={onAlphabetHelperToggle}
              className="game-control-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={showAlphabetHelper ? "Hide alphabet helper" : "Show alphabet helper"}
            >
              <Type size={20} />
              {showAlphabetHelper && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-game-green rounded-full"></span>
              )}
            </motion.button>
          )}

          <motion.button
            onClick={onSkip}
            disabled={!isPlaying}
            className={`game-control-button ${!isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={isPlaying ? { scale: 1.1 } : {}}
            whileTap={isPlaying ? { scale: 0.9 } : {}}
            title="Skip word"
          >
            Skip
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <Select 
            value={difficultyLevel} 
            onValueChange={onDifficultyChange}
            disabled={!isPlaying}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="all">All Levels</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch 
              checked={audioEnabled} 
              onCheckedChange={onAudioToggle}
              id="audio-toggle"
            />
            <label htmlFor="audio-toggle" className="text-sm cursor-pointer">
              Audio
            </label>
          </div>

          <motion.button
            onClick={() => setShowInfo(!showInfo)}
            className="game-control-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Game information"
          >
            <Info size={20} />
          </motion.button>
        </div>
      </div>

      {showInfo && (
        <motion.div 
          className="mt-4 p-3 bg-blue-50 rounded-lg text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <h4 className="font-semibold mb-1">Game Information</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Type the word correctly to earn points</li>
            <li>You have a limited number of hints per game</li>
            <li>Skipping a word costs one life</li>
            <li>You can change difficulty level during the game</li>
            <li>Toggle audio to hear word pronunciations</li>
            {onAlphabetHelperToggle && (
              <li>Use the alphabet helper to type in languages you may not have keyboard support for</li>
            )}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameControls;
