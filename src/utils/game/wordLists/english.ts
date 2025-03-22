
import { WordList } from '../types';

export const englishWordLists: WordList[] = [
  {
    id: 'en-basics',
    name: 'Basic Words',
    description: 'Common everyday words for beginners',
    words: [
      { id: 'en-1', text: 'apple', difficulty: 'easy' },
      { id: 'en-2', text: 'banana', difficulty: 'easy' },
      { id: 'en-3', text: 'cat', difficulty: 'easy' },
      { id: 'en-4', text: 'dog', difficulty: 'easy' },
      { id: 'en-5', text: 'elephant', difficulty: 'medium' },
      { id: 'en-6', text: 'flower', difficulty: 'medium' },
      { id: 'en-7', text: 'giraffe', difficulty: 'medium' },
      { id: 'en-8', text: 'house', difficulty: 'easy' },
    ],
    languageId: 'en',
    difficulty: 'easy',
  },
  {
    id: 'en-animals',
    name: 'Animals',
    description: 'Words related to animals and wildlife',
    words: [
      { id: 'en-a1', text: 'tiger', difficulty: 'medium' },
      { id: 'en-a2', text: 'penguin', difficulty: 'medium' },
      { id: 'en-a3', text: 'zebra', difficulty: 'medium' },
      { id: 'en-a4', text: 'kangaroo', difficulty: 'hard' },
      { id: 'en-a5', text: 'dolphin', difficulty: 'medium' },
      { id: 'en-a6', text: 'octopus', difficulty: 'hard' },
    ],
    languageId: 'en',
    difficulty: 'medium',
  },
];
