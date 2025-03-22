
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface AudioToggleProps {
  audioEnabled: boolean;
  onAudioToggle: () => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({
  audioEnabled,
  onAudioToggle,
}) => {
  return (
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
  );
};
