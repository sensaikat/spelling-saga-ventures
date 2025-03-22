
import { 
  Calendar, 
  Music, 
  BookOpen, 
  TreeDeciduous, 
  Snowflake, 
  Sun, 
  Flower, 
  Cherry, 
  Cake, 
  VenetianMask, 
  Trophy,
  Ticket
} from 'lucide-react';

// Types for the seasonal content system
export type EventCategory = 'festival' | 'season' | 'sports' | 'entertainment';

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  startDate: Date; // Format: new Date(year, month-1, day)
  endDate: Date;   // Format: new Date(year, month-1, day)
  languages: string[]; // Language codes this event is relevant for
  colorClass: string; // Tailwind background color class
  items: {
    food: string[];
    clothing: string[];
    cultural: string[];
    vehicles: string[];
    places: string[];
  };
  imageOverrides?: Record<string, string>; // Override images for specific words during this event
}

// Function to get the current date with year
const getCurrentDate = (): Date => {
  return new Date();
};

// Get current year for dynamic date creation
const currentYear = new Date().getFullYear();

// Define cultural and seasonal events
export const seasonalEvents: SeasonalEvent[] = [
  // Spring festivals
  {
    id: 'holi',
    name: 'Holi',
    description: 'Festival of colors and spring',
    category: 'festival',
    icon: Flower,
    startDate: new Date(currentYear, 2, 1), // March 1
    endDate: new Date(currentYear, 2, 31),  // March 31
    languages: ['hi', 'bn', 'en'],
    colorClass: 'bg-pink-100',
    items: {
      food: ['गुजिया', 'thandai', 'puran poli', 'dahi bhalle'],
      clothing: ['white kurta', 'colorful dupatta'],
      cultural: ['होली गीत', 'folk songs', 'drum circles'],
      vehicles: ['decorated carts', 'palki'],
      places: ['mathura', 'vrindavan']
    },
    imageOverrides: {
      'festival': 'https://images.unsplash.com/photo-1592234403516-67462a8dc4d2?q=80&w=600',
      'colors': 'https://images.unsplash.com/photo-1576084428642-6005750a8b4f?q=80&w=600'
    }
  },
  {
    id: 'baisakhi',
    name: 'Baisakhi',
    description: 'Punjabi harvest festival',
    category: 'festival',
    icon: Flower,
    startDate: new Date(currentYear, 3, 10), // April 10
    endDate: new Date(currentYear, 3, 20),   // April 20
    languages: ['hi', 'pa', 'en'],
    colorClass: 'bg-yellow-100',
    items: {
      food: ['makki di roti', 'sarson da saag', 'lassi'],
      clothing: ['phulkari', 'turban', 'salwar kameez'],
      cultural: ['bhangra', 'giddha', 'folk music'],
      vehicles: ['tractor', 'bullock cart'],
      places: ['golden temple', 'anandpur sahib']
    }
  },
  // Summer festivals
  {
    id: 'ramadan',
    name: 'Ramadan',
    description: 'Holy month of fasting',
    category: 'festival',
    icon: Calendar,
    startDate: new Date(currentYear, 4, 1),  // Variable dates, placeholder
    endDate: new Date(currentYear, 4, 30),   // Variable dates, placeholder
    languages: ['ar', 'ur', 'hi', 'en', 'es'],
    colorClass: 'bg-indigo-100',
    items: {
      food: ['dates', 'iftar', 'haleem', 'biryani', 'sheer khurma'],
      clothing: ['kaftan', 'thobes', 'hijab'],
      cultural: ['prayer mats', 'lanterns', 'mosque'],
      vehicles: ['night buses', 'family cars'],
      places: ['mecca', 'jama masjid', 'local mosques']
    }
  },
  {
    id: 'semana-santa',
    name: 'Semana Santa',
    description: 'Holy Week celebrations',
    category: 'festival',
    icon: VenetianMask,
    startDate: new Date(currentYear, 2, 24), // Variable dates, placeholder
    endDate: new Date(currentYear, 3, 1),    // Variable dates, placeholder
    languages: ['es', 'en'],
    colorClass: 'bg-purple-100',
    items: {
      food: ['torrijas', 'pestiños', 'bacalao', 'potaje de vigilia'],
      clothing: ['nazareno robes', 'mantilla'],
      cultural: ['processions', 'pasos', 'religious music'],
      vehicles: ['decorated floats', 'carrozas'],
      places: ['sevilla', 'málaga', 'granada', 'churches']
    }
  },
  // Autumn festivals
  {
    id: 'diwali',
    name: 'Diwali',
    description: 'Festival of lights',
    category: 'festival',
    icon: Cherry,
    startDate: new Date(currentYear, 9, 20),  // Variable dates, placeholder
    endDate: new Date(currentYear, 10, 5),    // Variable dates, placeholder
    languages: ['hi', 'bn', 'ta', 'en'],
    colorClass: 'bg-amber-100',
    items: {
      food: ['mithai', 'laddoo', 'jalebi', 'barfi'],
      clothing: ['new clothes', 'saree', 'sherwani'],
      cultural: ['rangoli', 'diyas', 'lanterns'],
      vehicles: ['decorated cars', 'bikes with lights'],
      places: ['ayodhya', 'golden temple', 'homes with lights']
    },
    imageOverrides: {
      'lights': 'https://images.unsplash.com/photo-1605021309116-7e4b94258aee?q=80&w=600',
      'diya': 'https://images.unsplash.com/photo-1636952088968-5bd9dfa8d996?q=80&w=600'
    }
  },
  {
    id: 'durga-puja',
    name: 'Durga Puja',
    description: 'Worship of goddess Durga',
    category: 'festival',
    icon: VenetianMask,
    startDate: new Date(currentYear, 9, 1),   // Variable dates, placeholder
    endDate: new Date(currentYear, 9, 15),    // Variable dates, placeholder
    languages: ['hi', 'bn', 'en'],
    colorClass: 'bg-red-100',
    items: {
      food: ['khichuri', 'labda', 'payesh', 'mishti'],
      clothing: ['dhoti', 'saree', 'kurta'],
      cultural: ['dhunuchi dance', 'dhak', 'pandals'],
      vehicles: ['decorated trucks', 'immersion processions'],
      places: ['kolkata', 'pandals', 'community halls']
    },
    imageOverrides: {
      'goddess': 'https://images.unsplash.com/photo-1634478576014-bc3ade29fded?q=80&w=600',
      'pandal': 'https://images.unsplash.com/photo-1633629025084-2ff1307e86c1?q=80&w=600'
    }
  },
  {
    id: 'halloween',
    name: 'Halloween',
    description: 'Spooky celebration',
    category: 'festival',
    icon: VenetianMask,
    startDate: new Date(currentYear, 9, 25),  // Oct 25
    endDate: new Date(currentYear, 10, 1),    // Nov 1
    languages: ['en', 'es'],
    colorClass: 'bg-orange-100',
    items: {
      food: ['candy', 'pumpkin pie', 'caramel apples'],
      clothing: ['costumes', 'masks', 'witch hat'],
      cultural: ['trick or treat', 'jack-o-lanterns', 'haunted houses'],
      vehicles: ['hayride', 'decorated cars'],
      places: ['haunted houses', 'salem', 'cemeteries']
    },
    imageOverrides: {
      'pumpkin': 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?q=80&w=600',
      'ghost': 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=600'
    }
  },
  // Winter festivals
  {
    id: 'christmas',
    name: 'Christmas',
    description: 'Christmas season celebrations',
    category: 'festival',
    icon: Snowflake,
    startDate: new Date(currentYear, 11, 1),  // Dec 1
    endDate: new Date(currentYear, 11, 31),   // Dec 31
    languages: ['en', 'es', 'fr', 'de'],
    colorClass: 'bg-green-100',
    items: {
      food: ['turkey', 'christmas pudding', 'cookies', 'gingerbread'],
      clothing: ['santa hat', 'christmas sweaters', 'scarves'],
      cultural: ['carols', 'nativity', 'christmas tree'],
      vehicles: ['sleigh', 'reindeer', 'santa\'s sleigh'],
      places: ['bethlehem', 'north pole', 'christmas markets']
    },
    imageOverrides: {
      'santa': 'https://images.unsplash.com/photo-1607469256872-da943b7027d4?q=80&w=600',
      'tree': 'https://images.unsplash.com/photo-1575379473440-e7fabad10838?q=80&w=600',
      'gift': 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600'
    }
  },
  {
    id: 'lunar-new-year',
    name: 'Lunar New Year',
    description: 'Chinese New Year celebrations',
    category: 'festival',
    icon: Calendar,
    startDate: new Date(currentYear, 0, 25),  // Variable dates, placeholder
    endDate: new Date(currentYear, 1, 15),    // Variable dates, placeholder
    languages: ['zh', 'en'],
    colorClass: 'bg-red-100',
    items: {
      food: ['dumplings', 'longevity noodles', 'rice cakes', 'spring rolls'],
      clothing: ['qipao', 'red clothes', 'new outfits'],
      cultural: ['red envelopes', 'lion dance', 'lanterns'],
      vehicles: ['dragon parade floats', 'decorated bicycles'],
      places: ['chinatown', 'temples', 'family homes']
    },
    imageOverrides: {
      'dragon': 'https://images.unsplash.com/photo-1578707800776-51d1f19de20e?q=80&w=600',
      'lantern': 'https://images.unsplash.com/photo-1582989625652-768f6caec512?q=80&w=600'
    }
  },
  
  // Seasons
  {
    id: 'spring',
    name: 'Spring',
    description: 'Season of renewal',
    category: 'season',
    icon: Flower,
    startDate: new Date(currentYear, 2, 1),   // March 1
    endDate: new Date(currentYear, 4, 31),    // May 31
    languages: ['en', 'es', 'hi', 'fr', 'de'],
    colorClass: 'bg-green-100',
    items: {
      food: ['salads', 'fresh berries', 'spring vegetables'],
      clothing: ['light jackets', 'floral prints', 'pastel colors'],
      cultural: ['spring cleaning', 'gardening', 'nature walks'],
      vehicles: ['bicycles', 'convertibles', 'scooters'],
      places: ['gardens', 'parks', 'flower fields']
    }
  },
  {
    id: 'summer',
    name: 'Summer',
    description: 'Season of sun and fun',
    category: 'season',
    icon: Sun,
    startDate: new Date(currentYear, 5, 1),   // June 1
    endDate: new Date(currentYear, 7, 31),    // August 31
    languages: ['en', 'es', 'hi', 'fr', 'de'],
    colorClass: 'bg-yellow-100',
    items: {
      food: ['ice cream', 'watermelon', 'popsicles', 'barbecue'],
      clothing: ['swimsuits', 'sunglasses', 'shorts', 'sandals'],
      cultural: ['beach trips', 'summer camps', 'outdoor concerts'],
      vehicles: ['boats', 'jet skis', 'bicycles', 'convertibles'],
      places: ['beach', 'pool', 'amusement parks', 'camping sites']
    },
    imageOverrides: {
      'beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600',
      'ice': 'https://images.unsplash.com/photo-1568464774554-2cde8bf2c15f?q=80&w=600'
    }
  },
  {
    id: 'autumn',
    name: 'Autumn',
    description: 'Season of colorful leaves',
    category: 'season',
    icon: TreeDeciduous,
    startDate: new Date(currentYear, 8, 1),   // September 1
    endDate: new Date(currentYear, 10, 30),   // November 30
    languages: ['en', 'es', 'hi', 'fr', 'de'],
    colorClass: 'bg-orange-100',
    items: {
      food: ['pumpkin spice', 'apple cider', 'soups', 'stews'],
      clothing: ['sweaters', 'scarves', 'boots', 'warm jackets'],
      cultural: ['leaf peeping', 'harvest festivals', 'hayrides'],
      vehicles: ['vintage cars', 'harvest trucks', 'tractors'],
      places: ['forests', 'orchards', 'corn mazes', 'haunted houses']
    },
    imageOverrides: {
      'leaves': 'https://images.unsplash.com/photo-1506182433950-e2971397f198?q=80&w=600',
      'maple': 'https://images.unsplash.com/photo-1510829454517-33169e7eaedc?q=80&w=600'
    }
  },
  {
    id: 'winter',
    name: 'Winter',
    description: 'Season of snow and celebration',
    category: 'season',
    icon: Snowflake,
    startDate: new Date(currentYear, 11, 1),  // December 1
    endDate: new Date(currentYear, 1, 28),    // February 28
    languages: ['en', 'es', 'hi', 'fr', 'de'],
    colorClass: 'bg-blue-100',
    items: {
      food: ['hot chocolate', 'soups', 'holiday meals', 'warm breads'],
      clothing: ['coats', 'gloves', 'scarves', 'boots', 'earmuffs'],
      cultural: ['skiing', 'ice skating', 'snowman building', 'fireplaces'],
      vehicles: ['snowmobiles', 'sleds', 'snowplows', 'snow boots'],
      places: ['ski resorts', 'ice rinks', 'cozy cabins', 'fireplaces']
    },
    imageOverrides: {
      'snow': 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=600',
      'snowman': 'https://images.unsplash.com/photo-1512933821089-67dc585640b7?q=80&w=600'
    }
  },
  
  // Sports Events
  {
    id: 'olympics',
    name: 'Olympics',
    description: 'International sporting event',
    category: 'sports',
    icon: Trophy,
    startDate: new Date(currentYear, 6, 15),  // July 15, date changes based on year
    endDate: new Date(currentYear, 7, 15),    // August 15, date changes based on year
    languages: ['en', 'es', 'hi', 'fr', 'zh', 'ja'],
    colorClass: 'bg-blue-100',
    items: {
      food: ['international cuisines', 'sports drinks', 'protein bars'],
      clothing: ['jerseys', 'athletic wear', 'country colors'],
      cultural: ['opening ceremony', 'olympic torch', 'medals'],
      vehicles: ['olympic shuttle', 'team buses', 'bikes'],
      places: ['olympic village', 'stadiums', 'host city']
    },
    imageOverrides: {
      'medal': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16bd?q=80&w=600',
      'stadium': 'https://images.unsplash.com/photo-1461253205884-36a14513ed27?q=80&w=600'
    }
  },
  {
    id: 'world-cup',
    name: 'World Cup',
    description: 'Football/Soccer championship',
    category: 'sports',
    icon: Trophy,
    startDate: new Date(currentYear, 5, 1),   // June 1, date changes based on year
    endDate: new Date(currentYear, 6, 15),    // July 15, date changes based on year
    languages: ['en', 'es', 'fr', 'ar', 'pt'],
    colorClass: 'bg-green-100',
    items: {
      food: ['stadium snacks', 'international foods', 'team cakes'],
      clothing: ['jerseys', 'team colors', 'face paint'],
      cultural: ['national anthems', 'fan zones', 'watch parties'],
      vehicles: ['team buses', 'fan caravans'],
      places: ['stadiums', 'fan zones', 'home viewing parties']
    }
  },
  
  // Entertainment
  {
    id: 'blockbuster-season',
    name: 'Summer Blockbusters',
    description: 'Major film releases',
    category: 'entertainment',
    icon: Ticket,
    startDate: new Date(currentYear, 4, 1),   // May 1
    endDate: new Date(currentYear, 7, 31),    // August 31
    languages: ['en', 'es', 'hi', 'zh', 'ja'],
    colorClass: 'bg-purple-100',
    items: {
      food: ['popcorn', 'movie snacks', 'themed meals'],
      clothing: ['movie merchandise', 'character costumes'],
      cultural: ['premieres', 'fan events', 'movie marathons'],
      vehicles: ['limousines', 'movie prop vehicles'],
      places: ['theaters', 'drive-ins', 'premiere venues']
    },
    imageOverrides: {
      'movie': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600',
      'cinema': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600'
    }
  },
  {
    id: 'award-season',
    name: 'Award Season',
    description: 'Film and music awards',
    category: 'entertainment',
    icon: Trophy,
    startDate: new Date(currentYear, 0, 1),   // January 1
    endDate: new Date(currentYear, 2, 15),    // March 15
    languages: ['en', 'es'],
    colorClass: 'bg-yellow-100',
    items: {
      food: ['fancy appetizers', 'champagne', 'gala dinners'],
      clothing: ['gowns', 'tuxedos', 'red carpet looks'],
      cultural: ['award shows', 'acceptance speeches', 'after parties'],
      vehicles: ['limousines', 'luxury cars'],
      places: ['theaters', 'auditoriums', 'red carpets']
    }
  }
];

// Function to get active seasonal events
export const getActiveEvents = (date: Date = new Date()): SeasonalEvent[] => {
  return seasonalEvents.filter(event => {
    // Check if the current date falls within the event's start and end dates
    return date >= event.startDate && date <= event.endDate;
  });
};

// Function to get active events for a specific language
export const getActiveEventsForLanguage = (
  languageId: string,
  date: Date = new Date()
): SeasonalEvent[] => {
  return getActiveEvents(date).filter(event => {
    return event.languages.includes(languageId) || event.languages.includes('all');
  });
};

// Function to get seasonal image overrides based on active events
export const getSeasonalImageOverrides = (
  languageId: string,
  date: Date = new Date()
): Record<string, string> => {
  const activeEvents = getActiveEventsForLanguage(languageId, date);
  
  // Combine all image overrides from active events
  return activeEvents.reduce((overrides, event) => {
    return event.imageOverrides ? { ...overrides, ...event.imageOverrides } : overrides;
  }, {});
};

// Function to get seasonal words based on active events
export const getSeasonalWords = (
  languageId: string,
  category: keyof SeasonalEvent['items'],
  date: Date = new Date()
): string[] => {
  const activeEvents = getActiveEventsForLanguage(languageId, date);
  
  // Combine words from all active events for the given category
  return activeEvents.reduce((words, event) => {
    return [...words, ...event.items[category]];
  }, [] as string[]);
};

// Get current active events
export const getCurrentEvents = (): SeasonalEvent[] => {
  return getActiveEvents(getCurrentDate());
};

