
import { WordList } from '../types';

export const spanishWordLists: WordList[] = [
  {
    id: 'es-basics',
    name: 'Palabras Básicas',
    description: 'Palabras comunes para principiantes',
    words: [
      { id: 'es-1', text: 'manzana', difficulty: 'easy' },
      { id: 'es-2', text: 'plátano', difficulty: 'easy' },
      { id: 'es-3', text: 'gato', difficulty: 'easy' },
      { id: 'es-4', text: 'perro', difficulty: 'easy' },
      { id: 'es-5', text: 'elefante', difficulty: 'medium' },
      { id: 'es-6', text: 'flor', difficulty: 'easy' },
      { id: 'es-7', text: 'jirafa', difficulty: 'medium' },
      { id: 'es-8', text: 'casa', difficulty: 'easy' },
    ],
    languageId: 'es',
    difficulty: 'easy',
  },
];
