
import React, { useEffect, useState } from 'react';
import { GuideCharacter } from '@/components/guide';
import { learningAnalytics } from '../../services/analytics/learningAnalytics';
import { Language } from '../../utils/game/types';
import { AdaptiveSettings } from '../../services/analytics/types';

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
  const [adaptiveSettings, setAdaptiveSettings] = useState<AdaptiveSettings | null>(null);

  // Get adaptive settings on mount
  useEffect(() => {
    if (isGameActive && currentLanguage) {
      const userPreferences = learningAnalytics.getUserPreferences();
      
      if (userPreferences.allowPersonalization) {
        // Get local analytics data
        const localData = learningAnalytics.getLocalAnalyticsData();
        
        // Get adaptive settings
        if (localData.length > 5) {
          const settings = learningAnalytics.getAdaptiveSettings();
          setAdaptiveSettings(settings);
        }
      }
    }
  }, [isGameActive, currentLanguage]);

  // Show appropriate guide messages based on game state and analytics
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
      // Use more tailored feedback for incorrect answers
      if (adaptiveSettings && adaptiveSettings.focusAreas.length > 0) {
        const focusArea = adaptiveSettings.focusAreas[0];
        
        const patternSpecificMessages: Record<string, string[]> = {
          'phonetic': [
            "Listen carefully to the sounds in this word.",
            "Try sounding out each syllable slowly.",
            "Focus on the pronunciation of each letter."
          ],
          'visual': [
            "Look at the shape and pattern of the letters.",
            "Try to visualize the word in your mind.",
            "Notice any unusual letter combinations."
          ],
          'structural': [
            "Break this word into smaller parts.",
            "Look for familiar prefixes or suffixes.",
            "This word has a pattern you can learn."
          ],
          'memory': [
            "Let's try to remember this word together.",
            "Think about when you've seen this word before.",
            "Try associating this word with an image."
          ],
          'semantic': [
            "Think about what this word means.",
            "Try using this word in a sentence.",
            "Connect this word to something you know."
          ]
        };
        
        const messages = patternSpecificMessages[focusArea] || [
          "Not quite right. Try again!",
          "Almost! Check your spelling.",
          "You can do this! Try once more."
        ];
        
        setGuideMessage(messages[Math.floor(Math.random() * messages.length)]);
      } else {
        const messages = [
          "Not quite right. Try again!",
          "Almost! Check your spelling.",
          "You can do this! Try once more."
        ];
        setGuideMessage(messages[Math.floor(Math.random() * messages.length)]);
      }
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
    
    // Adaptive difficulty prompts
    if (adaptiveSettings && Math.random() > 0.7) {
      if (adaptiveSettings.challengeLevel > 7) {
        setGuideMessage("You're doing so well! Let's keep challenging you with harder words.");
        return;
      } else if (adaptiveSettings.challengeLevel < 4) {
        setGuideMessage("Take your time with each word. We'll build up your skills step by step.");
        return;
      }
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
    wordAttempts,
    adaptiveSettings
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
        // Get difficulty-specific tip
        let personalizedTip = "";
        
        if (adaptiveSettings && adaptiveSettings.focusAreas.length > 0) {
          // Provide specific tips based on learning patterns
          const focusArea = adaptiveSettings.focusAreas[0];
          
          switch (focusArea) {
            case 'phonetic':
              personalizedTip = "Focus on the sounds of the letters in this word.";
              break;
            case 'visual':
              personalizedTip = "Try to notice the visual pattern of this word.";
              break;
            case 'structural':
              personalizedTip = "Look for familiar parts within this word.";
              break;
            case 'memory':
              personalizedTip = "Creating a mental image can help remember this word.";
              break;
            default:
              // Difficulty-based tip as fallback
              if (currentWordDifficulty === 'hard') {
                personalizedTip = "This is a challenging word! Take your time.";
              } else if (currentWordDifficulty === 'medium') {
                personalizedTip = "Focus on the word patterns you've learned.";
              } else {
                personalizedTip = "Try sounding out the word letter by letter.";
              }
          }
        } else {
          // Difficulty-based tip as fallback
          if (currentWordDifficulty === 'hard') {
            personalizedTip = "This is a challenging word! Take your time.";
          } else if (currentWordDifficulty === 'medium') {
            personalizedTip = "Focus on the word patterns you've learned.";
          } else {
            personalizedTip = "Try sounding out the word letter by letter.";
          }
        }
        
        setGuideMessage(personalizedTip);
      }
    }
  }, [isGameActive, guideMessage, currentWordDifficulty, currentLanguage, adaptiveSettings]);

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
