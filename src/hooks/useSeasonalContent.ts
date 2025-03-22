
import { useState, useEffect } from 'react';
import { 
  getSeasonalImageOverrides, 
  getSeasonalWords,
  getCurrentEvents
} from '../utils/seasonal/seasonalEvents';

export const useSeasonalContent = (languageId: string = 'en') => {
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [seasonalWords, setSeasonalWords] = useState<{
    food: string[];
    clothing: string[];
    cultural: string[];
    vehicles: string[];
    places: string[];
  }>({
    food: [],
    clothing: [],
    cultural: [],
    vehicles: [],
    places: []
  });
  const [activeEvents, setActiveEvents] = useState(getCurrentEvents());
  
  useEffect(() => {
    // Get image overrides for the current language and date
    const overrides = getSeasonalImageOverrides(languageId);
    setImageOverrides(overrides);
    
    // Get seasonal words for the current language and date
    setSeasonalWords({
      food: getSeasonalWords(languageId, 'food'),
      clothing: getSeasonalWords(languageId, 'clothing'),
      cultural: getSeasonalWords(languageId, 'cultural'),
      vehicles: getSeasonalWords(languageId, 'vehicles'),
      places: getSeasonalWords(languageId, 'places')
    });
    
    // Get active events
    setActiveEvents(getCurrentEvents().filter(
      event => event.languages.includes(languageId) || event.languages.includes('all')
    ));
  }, [languageId]);
  
  /**
   * Get a seasonal image URL for a word if available
   */
  const getSeasonalImage = (word: string, defaultImage?: string): string | undefined => {
    // Check for direct word match in seasonal overrides
    if (imageOverrides[word.toLowerCase()]) {
      return imageOverrides[word.toLowerCase()];
    }
    
    // Return the default image if provided and no seasonal override exists
    return defaultImage;
  };
  
  /**
   * Check if a word has seasonal relevance
   */
  const isSeasonalWord = (word: string): boolean => {
    const lowerWord = word.toLowerCase();
    return (
      seasonalWords.food.some(item => item.toLowerCase() === lowerWord) ||
      seasonalWords.clothing.some(item => item.toLowerCase() === lowerWord) ||
      seasonalWords.cultural.some(item => item.toLowerCase() === lowerWord) ||
      seasonalWords.vehicles.some(item => item.toLowerCase() === lowerWord) ||
      seasonalWords.places.some(item => item.toLowerCase() === lowerWord)
    );
  };
  
  /**
   * Get related seasonal content for a word
   */
  const getRelatedSeasonalContent = (word: string) => {
    const lowerWord = word.toLowerCase();
    
    const category = 
      seasonalWords.food.some(item => item.toLowerCase() === lowerWord) 
        ? 'food'
        : seasonalWords.clothing.some(item => item.toLowerCase() === lowerWord)
        ? 'clothing'
        : seasonalWords.cultural.some(item => item.toLowerCase() === lowerWord)
        ? 'cultural'
        : seasonalWords.vehicles.some(item => item.toLowerCase() === lowerWord)
        ? 'vehicles'
        : seasonalWords.places.some(item => item.toLowerCase() === lowerWord)
        ? 'places'
        : null;
    
    if (!category) return null;
    
    // Find events that have this word in their items
    const relatedEvents = activeEvents.filter(event => 
      event.items[category].some(item => 
        item.toLowerCase() === lowerWord
      )
    );
    
    return {
      category,
      events: relatedEvents
    };
  };
  
  return {
    imageOverrides,
    seasonalWords,
    activeEvents,
    getSeasonalImage,
    isSeasonalWord,
    getRelatedSeasonalContent
  };
};
