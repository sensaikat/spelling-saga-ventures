
import React, { useState } from 'react';
import { Lock, Clock, Shield, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParentalControlsStore } from '../../contexts/ParentalControlsContext';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "@/hooks/use-toast";

const ParentalControlsSettings = () => {
  const {
    isParentalControlsEnabled,
    toggleParentalControls,
    pin,
    updatePin,
    timeLimit,
    updateTimeLimit,
    contentRestrictions,
    updateContentRestrictions
  } = useParentalControlsStore();
  
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Handle PIN verification
  const handleVerifyPin = () => {
    if (currentPin === pin) {
      setIsAuthenticated(true);
      setCurrentPin('');
      toast({
        title: "Success",
        description: "PIN verified successfully",
      });
    } else {
      toast({
        title: "Incorrect PIN",
        description: "The PIN you entered is incorrect. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handle PIN change
  const handleUpdatePin = () => {
    if (newPin.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be at least 4 digits",
        variant: "destructive"
      });
      return;
    }
    
    if (newPin !== confirmPin) {
      toast({
        title: "PINs don't match",
        description: "The new PIN and confirmation don't match",
        variant: "destructive"
      });
      return;
    }
    
    updatePin(newPin);
    setNewPin('');
    setConfirmPin('');
    toast({
      title: "PIN Updated",
      description: "Your parental control PIN has been updated",
    });
  };
  
  if (!isAuthenticated && isParentalControlsEnabled) {
    return (
      <motion.div 
        className="glass-panel p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Lock size={20} className="text-game-purple" />
          <h3 className="text-xl font-medium">Parental Controls</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">Enter your PIN to access parental control settings.</p>
          
          <div className="flex gap-2">
            <Input
              type="password"
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full"
            />
            <Button onClick={handleVerifyPin}>Verify</Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="glass-panel p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Lock size={20} className="text-game-purple" />
          <h3 className="text-xl font-medium">Parental Controls</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="enable-controls">Enable Controls</Label>
          <Switch 
            id="enable-controls"
            checked={isParentalControlsEnabled}
            onCheckedChange={toggleParentalControls}
          />
        </div>
      </div>
      
      {isParentalControlsEnabled && (
        <div className="space-y-6 mt-4">
          {/* PIN Settings */}
          <div className="border-b pb-4">
            <h4 className="text-lg font-medium mb-3">Security PIN</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Input 
                  type={isPinVisible ? "text" : "password"} 
                  value={pin}
                  readOnly
                  className="w-full"
                />
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsPinVisible(!isPinVisible)}
                  className="ml-2"
                >
                  {isPinVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Change PIN</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Parental Control PIN</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-pin">New PIN</Label>
                      <Input 
                        id="new-pin"
                        type="password" 
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)} 
                        placeholder="Enter new PIN"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-pin">Confirm PIN</Label>
                      <Input 
                        id="confirm-pin"
                        type="password" 
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)} 
                        placeholder="Confirm new PIN"
                      />
                    </div>
                    <Button onClick={handleUpdatePin} className="w-full mt-4">
                      Update PIN
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Time Limits */}
          <div className="border-b pb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Clock size={18} /> Time Limits
              </h4>
              <Switch 
                checked={timeLimit.enabled}
                onCheckedChange={(checked) => updateTimeLimit({ enabled: checked })}
              />
            </div>
            
            {timeLimit.enabled && (
              <div className="space-y-4 mt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily-limit">Daily Limit (minutes)</Label>
                    <Input 
                      id="daily-limit"
                      type="number" 
                      min="5"
                      max="720"
                      value={timeLimit.dailyMinutes}
                      onChange={(e) => updateTimeLimit({ dailyMinutes: parseInt(e.target.value) || 60 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weekly-limit">Weekly Limit (hours)</Label>
                    <Input 
                      id="weekly-limit"
                      type="number" 
                      min="1"
                      max="50"
                      value={timeLimit.weeklyHours}
                      onChange={(e) => updateTimeLimit({ weeklyHours: parseInt(e.target.value) || 7 })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input 
                      id="start-time"
                      type="time" 
                      value={timeLimit.startTime}
                      onChange={(e) => updateTimeLimit({ startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time"
                      type="time" 
                      value={timeLimit.endTime}
                      onChange={(e) => updateTimeLimit({ endTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Content Restrictions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} />
              <h4 className="text-lg font-medium">Content Access</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="adventure-mode">Adventure Mode</Label>
                <Switch 
                  id="adventure-mode"
                  checked={contentRestrictions.adventureMode}
                  onCheckedChange={(checked) => updateContentRestrictions({ adventureMode: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="spelling-game">Spelling Game</Label>
                <Switch 
                  id="spelling-game"
                  checked={contentRestrictions.spellingGame}
                  onCheckedChange={(checked) => updateContentRestrictions({ spellingGame: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="multi-language">Multi-Language Mode</Label>
                <Switch 
                  id="multi-language"
                  checked={contentRestrictions.multiLanguageMode}
                  onCheckedChange={(checked) => updateContentRestrictions({ multiLanguageMode: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="challenge-mode">Challenge Mode</Label>
                <Switch 
                  id="challenge-mode"
                  checked={contentRestrictions.challengeMode}
                  onCheckedChange={(checked) => updateContentRestrictions({ challengeMode: checked })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ParentalControlsSettings;
