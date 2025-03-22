
import { WordList } from '../types';

export const englishWordLists: WordList[] = [
  {
    id: 'en-basics',
    name: 'Basic Words',
    description: 'Common everyday words for beginners',
    words: [
      { id: 'en-1', text: 'apple', difficulty: 'easy', hint: 'A red fruit' },
      { id: 'en-2', text: 'banana', difficulty: 'easy', hint: 'A yellow fruit' },
      { id: 'en-3', text: 'cat', difficulty: 'easy', hint: 'A furry pet' },
      { id: 'en-4', text: 'dog', difficulty: 'easy', hint: 'Man\'s best friend' },
      { id: 'en-5', text: 'elephant', difficulty: 'medium', hint: 'A large animal with a trunk' },
      { id: 'en-6', text: 'flower', difficulty: 'medium', hint: 'Grows in gardens' },
      { id: 'en-7', text: 'giraffe', difficulty: 'medium', hint: 'An animal with a long neck' },
      { id: 'en-8', text: 'house', difficulty: 'easy', hint: 'Where people live' },
    ],
    languageId: 'en',
    difficulty: 'easy',
  },
  {
    id: 'en-animals',
    name: 'Animals',
    description: 'Words related to animals and wildlife',
    words: [
      { id: 'en-a1', text: 'tiger', difficulty: 'medium', hint: 'Striped big cat' },
      { id: 'en-a2', text: 'penguin', difficulty: 'medium', hint: 'Bird that can\'t fly but swims' },
      { id: 'en-a3', text: 'zebra', difficulty: 'medium', hint: 'Has black and white stripes' },
      { id: 'en-a4', text: 'kangaroo', difficulty: 'hard', hint: 'Has a pouch for its baby' },
      { id: 'en-a5', text: 'dolphin', difficulty: 'medium', hint: 'Smart sea mammal' },
      { id: 'en-a6', text: 'octopus', difficulty: 'hard', hint: 'Has eight arms' },
    ],
    languageId: 'en',
    difficulty: 'medium',
  },
  {
    id: 'en-food',
    name: 'International Foods',
    description: 'Foods from around the world',
    words: [
      { id: 'en-food-1', text: 'pizza', difficulty: 'easy', hint: 'Italian dish with cheese and toppings' },
      { id: 'en-food-2', text: 'sushi', difficulty: 'medium', hint: 'Japanese dish with rice and fish' },
      { id: 'en-food-3', text: 'burger', difficulty: 'easy', hint: 'Sandwich with a meat patty' },
      { id: 'en-food-4', text: 'pasta', difficulty: 'easy', hint: 'Italian noodles' },
      { id: 'en-food-5', text: 'taco', difficulty: 'easy', hint: 'Mexican folded tortilla with filling' },
      { id: 'en-food-6', text: 'curry', difficulty: 'medium', hint: 'Spicy dish from India' },
    ],
    languageId: 'en',
    difficulty: 'easy',
  },
  {
    id: 'en-places',
    name: 'Famous Places',
    description: 'Well-known locations around the world',
    words: [
      { id: 'en-places-1', text: 'London', difficulty: 'easy', hint: 'Capital of England' },
      { id: 'en-places-2', text: 'Paris', difficulty: 'easy', hint: 'City with the Eiffel Tower' },
      { id: 'en-places-3', text: 'Tokyo', difficulty: 'medium', hint: 'Capital of Japan' },
      { id: 'en-places-4', text: 'Egypt', difficulty: 'medium', hint: 'Country with pyramids' },
      { id: 'en-places-5', text: 'Amazon', difficulty: 'medium', hint: 'World\'s largest rainforest' },
      { id: 'en-places-6', text: 'Africa', difficulty: 'easy', hint: 'Continent with many animals' },
    ],
    languageId: 'en',
    difficulty: 'medium',
  },
  {
    id: 'en-stories',
    name: 'Stories & Characters',
    description: 'Characters from famous stories and books',
    words: [
      { id: 'en-stories-1', text: 'dragon', difficulty: 'medium', hint: 'Mythical fire-breathing creature' },
      { id: 'en-stories-2', text: 'wizard', difficulty: 'medium', hint: 'Person who uses magic' },
      { id: 'en-stories-3', text: 'princess', difficulty: 'medium', hint: 'Royal daughter' },
      { id: 'en-stories-4', text: 'pirate', difficulty: 'medium', hint: 'Sails the seas looking for treasure' },
      { id: 'en-stories-5', text: 'knight', difficulty: 'medium', hint: 'Wears armor and serves a king' },
      { id: 'en-stories-6', text: 'fairy', difficulty: 'easy', hint: 'Tiny magical being with wings' },
    ],
    languageId: 'en',
    difficulty: 'medium',
  }
];
