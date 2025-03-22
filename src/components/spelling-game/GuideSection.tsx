
import React, { useEffect, useState } from 'react';
import { GuideCharacter } from '@/components/guide';
import { learningAnalytics } from '../../services/analytics/learningAnalytics';
import { Language } from '../../utils/game/types';

interface GuideSectionProps {
  currentWordDifficulty: string;
  currentLanguage: Language;
  correctSubmission: boolean | null;
  wordHintRequested: boolean;
  isGameActive: boolean;
  isGameCompleted: boolean;
  gameProgress: number;
  selectedTerrain: string;
  wordAttempts: number;
}

const GuideSection: React.FC<GuideSectionProps> = ({
  currentWordDifficulty,
  currentLanguage,
  correctSubmission,
  wordHintRequested,
  isGameActive,
  isGameCompleted,
  gameProgress,
  selectedTerrain,
  wordAttempts
}) => {
  const [guideMessage, setGuideMessage] = useState<string | null>(null);

  // Show appropriate guide messages based on game state
  useEffect(() => {
    if (!isGameActive) return;
    
    if (isGameCompleted) {
      setGuideMessage("Congratulations! You've completed all the words.");
      return;
    }
    
    if (correctSubmission === true) {
      const messages = [
        "Great job! That's correct!",
        "Excellent! Keep going!",
        "Perfect spelling!",
        "Well done! You're doing great!"
      ];
      setGuideMessage(messages[Math.floor(Math.random() * messages.length)]);
      return;
    }
    
    if (correctSubmission === false) {
      const messages = [
        "Not quite right. Try again!",
        "Almost! Check your spelling.",
        "You can do this! Try once more."
      ];
      setGuideMessage(messages[Math.floor(Math.random() * messages.length)]);
      return;
    }
    
    if (wordHintRequested) {
      setGuideMessage("Here's a hint to help you spell this word!");
      return;
    }
    
    if (wordAttempts > 2) {
      setGuideMessage("Need help? Try using the hint button.");
      return;
    }
    
    // Progress-based messages
    if (gameProgress > 0.75) {
      setGuideMessage("You're almost done! Just a few more words!");
      return;
    }
    
    if (gameProgress > 0.5) {
      setGuideMessage("You're making great progress! Keep it up!");
      return;
    }
    
    if (gameProgress > 0.25) {
      setGuideMessage("You're doing well so far!");
      return;
    }
    
    // Default to null to not show any message
    setGuideMessage(null);
    
  }, [
    correctSubmission, 
    wordHintRequested, 
    isGameActive, 
    isGameCompleted, 
    gameProgress, 
    wordAttempts
  ]);
  
  // Reset message after a delay
  useEffect(() => {
    if (guideMessage) {
      const timer = setTimeout(() => {
        setGuideMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [guideMessage]);
  
  // Get personalized guide message if available
  useEffect(() => {
    if (!isGameActive || guideMessage || !currentLanguage) return;
    
    // Only show personalized messages occasionally
    if (Math.random() > 0.7) {
      const userPreferences = learningAnalytics.getUserPreferences();
      
      if (userPreferences.allowPersonalization) {
        const difficulty = currentWordDifficulty;
        let personalizedTip = "";
        
        if (difficulty === 'hard') {
          personalizedTip = "This is a challenging word! Take your time.";
        } else if (difficulty === 'medium') {
          personalizedTip = "Focus on the word patterns you've learned.";
        } else {
          personalizedTip = "Try sounding out the word letter by letter.";
        }
        
        setGuideMessage(personalizedTip);
      }
    }
  }, [isGameActive, guideMessage, currentWordDifficulty, currentLanguage]);

  return (
    <div className="h-32 flex items-end justify-center">
      <GuideCharacter 
        terrain={selectedTerrain}
        proactiveMessage={guideMessage || undefined}
        selectedLanguage={currentLanguage.id}
      />
    </div>
  );
};

export default GuideSection;
