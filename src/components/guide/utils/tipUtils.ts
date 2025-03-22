
import { GuideAppearance } from '../types';

export const getTipsByPersonality = (personality: string = 'wise') => {
  const commonTips = [
    "Look for patterns in the spelling.",
    "Take your time with each word, no need to rush.",
    "If you're stuck, try sounding out the word slowly.",
    "Practice makes perfect - keep trying!"
  ];
  
  const personalityTips = {
    wise: [
      "Remember to listen carefully to the pronunciation!",
      "When in doubt, break the word into smaller parts.",
      "The ancient scholars would approve of your dedication.",
      "Knowledge is a journey, not a destination."
    ],
    adventurous: [
      "Another word conquered on your spelling adventure!",
      "Let's explore the world of words together!",
      "Brave explorers are never afraid to try!",
      "What exciting new words will we discover today?"
    ],
    logical: [
      "Analyzing word structure improves recall by 42%.",
      "Statistical analysis shows your improvement curve is optimal.",
      "Memory processes engaged. Learning sequence initiated.",
      "Systematic approach yields optimal spelling results."
    ],
    energetic: [
      "AWESOME! Your spelling powers are INCREDIBLE!",
      "You're BLAZING through these words like a CHAMPION!",
      "WOW! That was SPECTACULAR spelling!",
      "Your energy for learning is UNSTOPPABLE!"
    ],
    curious: [
      "Fascinating how these Earth words connect together!",
      "Your species' language contains such interesting patterns!",
      "I'm curious - how do you remember all these spellings?",
      "What an interesting word! I've added it to my database."
    ]
  };
  
  return [...commonTips, ...(personalityTips[personality as keyof typeof personalityTips] || personalityTips.wise)];
};

export const getGuideGreeting = (
  guide: GuideAppearance, 
  greetingType: 'hello' | 'wellDone' | 'goodbye', 
  languageCode: string
): string => {
  if (guide.greetings) {
    const langGreetings = guide.greetings[languageCode] || guide.greetings.en;
    return langGreetings[greetingType];
  }
  return "Hello!";
};

export const getRandomTip = (tipList: string[]): string => {
  return tipList[Math.floor(Math.random() * tipList.length)];
};
