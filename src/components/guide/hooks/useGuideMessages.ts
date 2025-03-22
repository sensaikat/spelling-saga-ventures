
import { useCallback } from 'react';
import { GreetingType } from '../types';
import { getTipsByPersonality, getRandomTip } from '../utils/tipUtils';

export const useGuideMessages = () => {
  // Get contextual tips based on current route
  const getContextualTip = useCallback(() => {
    const path = window.location.pathname;
    
    if (path.includes('adventure')) {
      if (path.includes('bedroom')) {
        return "This is the bedroom area. You can learn vocabulary related to furniture and daily routines here.";
      } else if (path.includes('kitchen')) {
        return "Welcome to the kitchen! Here you'll learn words related to food, cooking, and kitchen utensils.";
      } else if (path.includes('garden')) {
        return "The garden is full of new words about plants, nature, and outdoor activities.";
      } else if (path.includes('forest')) {
        return "Explore the forest to discover words about nature, animals, and outdoor adventures!";
      } else {
        return "Explore different rooms to learn location-specific vocabulary. Each area has unique challenges!";
      }
    } else if (path.includes('game')) {
      return "Challenge yourself with fun word games! Complete challenges to earn points and rewards.";
    } else if (path.includes('progress')) {
      return "Check your progress here. You can see how many words you've learned and your improvement over time.";
    } else if (path.includes('settings')) {
      return "Customize your learning experience in settings. You can change your language, theme, and more.";
    } else {
      return "Welcome to Language Adventure! Choose a room to explore or a game to play to improve your language skills.";
    }
  }, []);
  
  // Navigation assistance
  const getNavigationHelp = useCallback(() => {
    return "Need to go somewhere? You can click any icon in the navigation bar to quickly move between sections!";
  }, []);

  // Get a random greeting based on type
  const getRandomGreeting = useCallback((type: GreetingType = 'hello'): string => {
    const greetings = {
      hello: [
        "Hello there! Ready for an adventure?",
        "Hi friend! Need some help?",
        "Greetings! How can I assist you today?"
      ],
      wellDone: [
        "Great job! You're making excellent progress!",
        "Well done! Keep up the good work!",
        "Amazing effort! You're learning so quickly!"
      ],
      goodbye: [
        "See you next time! Keep practicing!",
        "Goodbye for now! Come back soon!",
        "Until next time! Don't forget what you've learned!"
      ]
    };
    
    const options = greetings[type];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  // Get a random tip based on personality
  const getRandomPersonalityTip = useCallback((personality: string = 'wise') => {
    const tipTypes = getTipsByPersonality(personality);
    return getRandomTip(tipTypes);
  }, []);
  
  return {
    getContextualTip,
    getNavigationHelp,
    getRandomGreeting,
    getRandomPersonalityTip
  };
};
