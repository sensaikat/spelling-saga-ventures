
import { WordList } from '../types';

export const spanishWordLists: WordList[] = [
  {
    id: 'es-basics',
    name: 'Palabras Básicas',
    description: 'Palabras comunes para principiantes',
    words: [
      { id: 'es-1', text: 'manzana', difficulty: 'easy', hint: 'fruta roja' },
      { id: 'es-2', text: 'plátano', difficulty: 'easy', hint: 'fruta amarilla' },
      { id: 'es-3', text: 'gato', difficulty: 'easy', hint: 'animal doméstico' },
      { id: 'es-4', text: 'perro', difficulty: 'easy', hint: 'mejor amigo del hombre' },
      { id: 'es-5', text: 'elefante', difficulty: 'medium', hint: 'animal grande con trompa' },
      { id: 'es-6', text: 'flor', difficulty: 'easy', hint: 'crece en jardines' },
      { id: 'es-7', text: 'jirafa', difficulty: 'medium', hint: 'animal con cuello largo' },
      { id: 'es-8', text: 'casa', difficulty: 'easy', hint: 'donde vivimos' },
    ],
    languageId: 'es',
    difficulty: 'easy',
  },
  {
    id: 'es-comida',
    name: 'Comida Latina',
    description: 'Platos típicos de Latinoamérica y España',
    words: [
      { id: 'es-food-1', text: 'paella', difficulty: 'medium', hint: 'plato de arroz español' },
      { id: 'es-food-2', text: 'tacos', difficulty: 'easy', hint: 'comida mexicana' },
      { id: 'es-food-3', text: 'tortilla', difficulty: 'easy', hint: 'hecha con huevos o maíz' },
      { id: 'es-food-4', text: 'churros', difficulty: 'medium', hint: 'postre frito con azúcar' },
      { id: 'es-food-5', text: 'empanada', difficulty: 'medium', hint: 'masa rellena horneada' },
      { id: 'es-food-6', text: 'tamales', difficulty: 'hard', hint: 'envueltos en hojas de maíz' },
    ],
    languageId: 'es',
    difficulty: 'medium',
  },
  {
    id: 'es-lugares',
    name: 'Lugares Hispanos',
    description: 'Lugares famosos en países de habla hispana',
    words: [
      { id: 'es-places-1', text: 'Barcelona', difficulty: 'medium', hint: 'ciudad con la Sagrada Familia' },
      { id: 'es-places-2', text: 'Andes', difficulty: 'medium', hint: 'cordillera en Sudamérica' },
      { id: 'es-places-3', text: 'México', difficulty: 'easy', hint: 'país al sur de Estados Unidos' },
      { id: 'es-places-4', text: 'Amazonas', difficulty: 'medium', hint: 'río más caudaloso del mundo' },
      { id: 'es-places-5', text: 'Madrid', difficulty: 'easy', hint: 'capital de España' },
    ],
    languageId: 'es',
    difficulty: 'medium',
  },
  {
    id: 'es-cultura',
    name: 'Cultura Hispana',
    description: 'Elementos culturales del mundo hispano',
    words: [
      { id: 'es-culture-1', text: 'guitarra', difficulty: 'medium', hint: 'instrumento musical de cuerdas' },
      { id: 'es-culture-2', text: 'flamenco', difficulty: 'medium', hint: 'baile tradicional español' },
      { id: 'es-culture-3', text: 'piñata', difficulty: 'medium', hint: 'se rompe en fiestas' },
      { id: 'es-culture-4', text: 'siesta', difficulty: 'easy', hint: 'descanso después de comer' },
      { id: 'es-culture-5', text: 'mariachi', difficulty: 'hard', hint: 'música tradicional mexicana' },
    ],
    languageId: 'es',
    difficulty: 'medium',
  }
];
