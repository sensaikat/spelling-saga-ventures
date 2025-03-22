
import React, { useEffect, useState } from 'react';
import { GuideCharacter } from '../guide';
import { TerrainType } from '../../contexts/adventure/types';
import { toast } from '@/hooks/use-toast';

interface GuideSectionProps {
  showGuide: boolean;
  isAdventure: boolean;
  terrain?: TerrainType;
  timeRemaining?: number;
}

const GuideSection: React.FC<GuideSectionProps> = ({ 
  showGuide,
  isAdventure,
  terrain = 'forest',
  timeRemaining
}) => {
  const [nudged, setNudged] = useState(false);
  
  // Provide time-based nudges
  useEffect(() => {
    if (timeRemaining !== undefined && timeRemaining <= 15 && !nudged) {
      const guideMessages = [
        "Hurry! Time is running out!",
        "Can you solve this before time runs out?",
        "Quick, try to answer before the timer ends!",
        "Just a few seconds left! What's your answer?",
        "Time's almost up! Make your best guess!"
      ];
      
      const randomMessage = guideMessages[Math.floor(Math.random() * guideMessages.length)];
      toast({
        title: "Guide says:",
        description: randomMessage,
      });
      
      setNudged(true);
    }
    
    if (timeRemaining !== undefined && timeRemaining > 20) {
      setNudged(false);
    }
  }, [timeRemaining, nudged]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <GuideCharacter
        selectedAvatar={isAdventure ? terrain : 'default'}
        showGuide={showGuide}
        proactiveMessage={nudged ? null : undefined}
      />
    </div>
  );
};

export default GuideSection;
