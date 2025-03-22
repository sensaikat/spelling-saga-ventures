import { Character, Location, StoryPhase } from './types';

export const defaultCharacter: Character = {
  name: 'Explorer',
  avatar: '👦',
  currentLocation: 'bedroom',
  inventory: [],
  credits: 0,
  stars: 0,
  currentStoryPhase: 'introduction',
};

// Initialize with culturally enhanced locations
export const defaultLocations: Location[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    room: 'bedroom',
    terrain: 'forest',
    description: 'Your cozy bedroom has transformed into an enchanted forest with tall, magical trees! Can you spot local wildlife and plants?',
    challengeDescription: 'Learn the names of animals, plants, and natural features in your chosen language to navigate through the forest.',
    isLocked: false,
    isCompleted: false,
    requiredPoints: 0,
    storylines: {
      introduction: [
        "Welcome to your magical bedroom forest! I'm Flora, and I'll be your guide on this wonderful adventure.",
        "Look at how your bedroom has transformed! The bed is now a mossy hill, and your closet has become a hollow tree.",
        "Our mission is to explore this forest and learn the language of nature. Are you ready to begin?"
      ],
      exploration: [
        "Do you see those beautiful flowers over there? In this language, they have special names with deep meanings.",
        "Listen carefully to the sounds of the forest. Each animal makes a unique sound we can learn to identify.",
        "Feel the texture of the tree bark. Learning words for 'rough', 'smooth', and 'bumpy' will help us describe our surroundings."
      ],
      challenge: [
        "It's time for our forest challenge! We need to identify different plants and animals in our new language.",
        "Don't worry if you make mistakes - that's how we learn! I'll give you hints if you need them.",
        "Remember to listen carefully to the pronunciation. The forest spirits appreciate when we speak their language correctly!"
      ],
      reward: [
        "Amazing job! You've learned so many new words about the forest.",
        "The forest spirits are pleased with your progress and have opened a path to our next location!",
        "You've earned credits and stars for your excellent work. Keep it up!"
      ],
      conclusion: [
        "You've completed your first adventure! The forest will always be here if you want to return and practice more.",
        "The knowledge you've gained will help you in future adventures. I'm so proud of your progress!",
        "Now, shall we see what awaits us in the next magical location?"
      ]
    }
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    room: 'kitchen',
    terrain: 'desert',
    description: 'The kitchen has become a vast desert with sand dunes and an oasis in the distance! Traditional foods and spices create magical aromas in the air.',
    challengeDescription: 'Master the names of regional dishes, fruits, and food items to find water and sustenance in the desert.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 50,
    storylines: {
      introduction: [
        "Welcome to the Desert Kitchen! I'm Sandy, your guide in this hot and magical place.",
        "Your kitchen has transformed into a vast desert with sand dunes as far as the eye can see! The refrigerator is now an oasis with cool water.",
        "We need to learn about traditional foods and spices to survive in this harsh environment. Are you ready for a tasty adventure?"
      ],
      exploration: [
        "Smell those exotic spices in the air! Each one has a special name and use in desert cuisine.",
        "See that date palm by the oasis? Desert cultures have many words for different types of dates and how they're prepared.",
        "The desert may seem barren, but it's full of surprising ingredients that locals use in their cooking."
      ],
      challenge: [
        "Time for our desert cooking challenge! We need to identify ingredients and prepare a traditional meal.",
        "Listen carefully to the names of spices and foods. Pronunciation is important in desert cooking!",
        "Remember, in the desert, knowing the right words for food and water can be a matter of survival!"
      ],
      reward: [
        "Excellent cooking! You've mastered so many food words in your new language.",
        "The desert nomads are impressed with your knowledge and have shared their map to the next location!",
        "Your recipe book is growing, and so is your vocabulary. Great job!"
      ],
      conclusion: [
        "Your desert kitchen adventure is complete! You can always return to practice more food vocabulary.",
        "The culinary skills you've learned will serve you well on future journeys. I'm impressed with your progress!",
        "Ready to see what magical transformation awaits in the next room?"
      ]
    }
  },
  {
    id: 'livingRoom',
    name: 'Living Room',
    room: 'livingRoom',
    terrain: 'river',
    description: 'The living room is now a rushing river with waterfalls and whirlpools! Famous landmarks from the language\'s culture line the riverbanks.',
    challengeDescription: 'Learn about famous rivers, lakes, and water-related words from the culture to safely navigate the currents.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 100,
    storylines: {
      introduction: [
        "Ahoy there, explorer! Welcome to the Living Room River! I'm Marina, your guide on this aquatic adventure.",
        "Your living room has transformed into a rushing river, filled with cultural landmarks! The sofa is now a raft, and the TV is a waterfall.",
        "We need to learn about rivers, lakes, and water-related words to navigate these currents safely. Are you ready to set sail?"
      ],
      exploration: [
        "See that famous bridge in the distance? It has a special name and history in this culture.",
        "Listen to the sound of the rushing water. Each ripple and splash has a unique word to describe it.",
        "Feel the cool mist coming from the waterfall. Learning words for 'wet', 'dry', and 'humid' will help us describe our surroundings."
      ],
      challenge: [
        "It's time for our river challenge! We need to identify different landmarks and water features in our new language.",
        "Don't worry if you make mistakes - that's how we learn! I'll give you hints if you need them.",
        "Remember to listen carefully to the pronunciation. The river spirits appreciate when we speak their language correctly!"
      ],
      reward: [
        "Amazing job! You've learned so many new words about the river.",
        "The river spirits are pleased with your progress and have opened a path to our next location!",
        "You've earned credits and stars for your excellent work. Keep it up!"
      ],
      conclusion: [
        "You've completed your river adventure! The river will always be here if you want to return and practice more.",
        "The knowledge you've gained will help you in future adventures. I'm so proud of your progress!",
        "Now, shall we see what awaits us in the next magical location?"
      ]
    }
  },
  {
    id: 'garden',
    name: 'Garden',
    room: 'garden',
    terrain: 'mountain',
    description: 'Your garden has transformed into towering mountains with snow-capped peaks! Folk tales and legends come alive among the mountain passes.',
    challengeDescription: 'Master words related to mythology, folk stories, and natural wonders to climb to the mountain summit.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 150,
    storylines: {
      introduction: [
        "Greetings, climber! Welcome to the Garden Mountains! I'm Sierra, your guide on this towering adventure.",
        "Your garden has transformed into snow-capped mountains, filled with folk tales and legends! The flowerbeds are now mountain passes, and the trees are towering peaks.",
        "We need to learn about mythology, folk stories, and natural wonders to climb to the summit. Are you ready to ascend?"
      ],
      exploration: [
        "See that snow-capped peak in the distance? It has a special name and significance in local legends.",
        "Listen to the wind whistling through the mountain passes. Each gust has a unique word to describe it.",
        "Feel the rough texture of the mountain rocks. Learning words for 'steep', 'flat', and 'jagged' will help us describe our surroundings."
      ],
      challenge: [
        "It's time for our mountain challenge! We need to identify different landmarks and natural features in our new language.",
        "Don't worry if you make mistakes - that's how we learn! I'll give you hints if you need them.",
        "Remember to listen carefully to the pronunciation. The mountain spirits appreciate when we speak their language correctly!"
      ],
      reward: [
        "Amazing job! You've learned so many new words about the mountains.",
        "The mountain spirits are pleased with your progress and have opened a path to our next location!",
        "You've earned credits and stars for your excellent work. Keep it up!"
      ],
      conclusion: [
        "You've completed your mountain adventure! The mountains will always be here if you want to return and practice more.",
        "The knowledge you've gained will help you in future adventures. I'm so proud of your progress!",
        "Now, shall we see what awaits us in the next magical location?"
      ]
    }
  },
  {
    id: 'school',
    name: 'School',
    room: 'school',
    terrain: 'castle',
    description: 'Your school is now a magnificent castle inspired by historical architecture! Famous scholars and characters from literature roam the halls.',
    challengeDescription: 'Learn about historical figures, books, and academic terms to solve the castle\'s ancient riddles.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 200,
    storylines: {
      introduction: [
        "Hark, learner! Welcome to the School Castle! I'm Reggie, your guide in this scholarly fortress.",
        "Your school has transformed into a magnificent castle, filled with historical figures and literary characters! The classrooms are now grand halls, and the library is an ancient archive.",
        "We need to learn about history, literature, and academic terms to solve the castle's riddles. Are you ready to study?"
      ],
      exploration: [
        "See that portrait of a famous scholar? They have a special name and legacy in this culture.",
        "Listen to the echoes of historical debates in the halls. Each argument has a unique word to describe it.",
        "Feel the weight of the ancient books in the library. Learning words for 'knowledge', 'wisdom', and 'learning' will help us on our quest."
      ],
      challenge: [
        "It's time for our castle challenge! We need to identify different historical figures and literary works in our new language.",
        "Don't worry if you make mistakes - that's how we learn! I'll give you hints if you need them.",
        "Remember to listen carefully to the pronunciation. The castle scholars appreciate when we speak their language correctly!"
      ],
      reward: [
        "Amazing job! You've learned so many new words about the castle.",
        "The castle scholars are pleased with your progress and have opened a path to our next location!",
        "You've earned credits and stars for your excellent work. Keep it up!"
      ],
      conclusion: [
        "You've completed your castle adventure! The castle will always be here if you want to return and practice more.",
        "The knowledge you've gained will help you in future adventures. I'm so proud of your progress!",
        "Now, shall we see what awaits us in the next magical location?"
      ]
    }
  },
  {
    id: 'market',
    name: 'Market',
    room: 'market',
    terrain: 'space',
    description: 'The market has become a colorful festival in space! Traditional crafts, music, and cultural celebrations float among the stars.',
    challengeDescription: 'Master vocabulary related to celebrations, arts, music and cultural traditions to engage with the cosmic festival.',
    isLocked: true,
    isCompleted: false,
    requiredPoints: 250,
    storylines: {
      introduction: [
        "Greetings, traveler! Welcome to the Space Market! I'm Nova, your guide in this cosmic celebration.",
        "Your market has transformed into a colorful festival in space, filled with traditional crafts, music, and cultural celebrations! The stalls are now floating platforms, and the stars are twinkling lights.",
        "We need to learn about celebrations, arts, music, and cultural traditions to engage with the festival. Are you ready to party?"
      ],
      exploration: [
        "See that alien band playing traditional music? They have a special name and rhythm in this culture.",
        "Listen to the sounds of the cosmic celebrations. Each cheer and song has a unique word to describe it.",
        "Feel the texture of the alien crafts on display. Learning words for 'art', 'music', and 'celebration' will help us enjoy the festival."
      ],
      challenge: [
        "It's time for our space market challenge! We need to identify different cultural elements and traditions in our new language.",
        "Don't worry if you make mistakes - that's how we learn! I'll give you hints if you need them.",
        "Remember to listen carefully to the pronunciation. The cosmic celebrators appreciate when we speak their language correctly!"
      ],
      reward: [
        "Amazing job! You've learned so many new words about the space market.",
        "The cosmic celebrators are pleased with your progress and have opened a path to our next location!",
        "You've earned credits and stars for your excellent work. Keep it up!"
      ],
      conclusion: [
        "You've completed your space market adventure! The market will always be here if you want to return and practice more.",
        "The knowledge you've gained will help you in future adventures. I'm so proud of your progress!",
        "Now, shall we see what awaits us in the next magical location?"
      ]
    }
  },
];
