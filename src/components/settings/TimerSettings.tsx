
import React from 'react';
import { Clock, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-localStorage';
import { toast } from '@/hooks/use-toast';

export interface TimerSettings {
  enabled: boolean;
  defaultSeconds: number;
  showWarnings: boolean;
  autoSkip: boolean;
}

const defaultTimerSettings: TimerSettings = {
  enabled: true,
  defaultSeconds: 30,
  showWarnings: true,
  autoSkip: false
};

const TimerSettings = () => {
  const [timerSettings, setTimerSettings] = useLocalStorage<TimerSettings>(
    'spelling-game-timer-settings',
    defaultTimerSettings
  );
  
  const handleToggleTimer = (checked: boolean) => {
    setTimerSettings({
      ...timerSettings,
      enabled: checked
    });
    
    toast({
      title: checked ? "Timer Enabled" : "Timer Disabled",
      description: checked 
        ? "The timer will now appear during games." 
        : "The timer has been turned off.",
    });
  };
  
  const handleTimeChange = (value: number[]) => {
    setTimerSettings({
      ...timerSettings,
      defaultSeconds: value[0]
    });
  };
  
  const handleToggleWarnings = (checked: boolean) => {
    setTimerSettings({
      ...timerSettings,
      showWarnings: checked
    });
  };
  
  const handleToggleAutoSkip = (checked: boolean) => {
    setTimerSettings({
      ...timerSettings,
      autoSkip: checked
    });
  };
  
  const handleReset = () => {
    setTimerSettings(defaultTimerSettings);
    toast({
      title: "Timer Settings Reset",
      description: "Timer settings have been restored to defaults.",
    });
  };

  return (
    <motion.div 
      className="glass-panel p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Timer size={20} className="text-game-purple" />
        <h3 className="text-xl font-medium">Timer Settings</h3>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="enable-timer" className="flex items-center gap-2">
            <Clock size={16} />
            <span>Enable Timer</span>
          </Label>
          <Switch 
            id="enable-timer"
            checked={timerSettings.enabled}
            onCheckedChange={handleToggleTimer}
          />
        </div>
        
        {timerSettings.enabled && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Default Time: {timerSettings.defaultSeconds} seconds</Label>
                <span className="text-sm text-gray-500">{Math.floor(timerSettings.defaultSeconds / 60)}:{(timerSettings.defaultSeconds % 60).toString().padStart(2, '0')}</span>
              </div>
              <Slider 
                value={[timerSettings.defaultSeconds]} 
                min={10} 
                max={120}
                step={5}
                onValueChange={handleTimeChange}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10s</span>
                <span>30s</span>
                <span>60s</span>
                <span>90s</span>
                <span>120s</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="timer-warnings">Show Time Warnings</Label>
              <Switch 
                id="timer-warnings"
                checked={timerSettings.showWarnings}
                onCheckedChange={handleToggleWarnings}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-skip" className="flex items-center gap-2">
                <span>Auto-Skip When Time's Up</span>
                <span className="text-xs text-gray-500">(Skip to next word)</span>
              </Label>
              <Switch 
                id="auto-skip"
                checked={timerSettings.autoSkip}
                onCheckedChange={handleToggleAutoSkip}
              />
            </div>
          </>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleReset}
        >
          Reset to Defaults
        </Button>
      </div>
    </motion.div>
  );
};

export default TimerSettings;
