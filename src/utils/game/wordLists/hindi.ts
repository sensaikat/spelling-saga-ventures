
import { WordList } from '../types';

export const hindiWordLists: WordList[] = [
  {
    id: 'hi-basics',
    name: 'मूल शब्द',
    description: 'शुरुआती लोगों के लिए आम शब्द',
    words: [
      { id: 'hi-1', text: 'सेब', difficulty: 'easy' },
      { id: 'hi-2', text: 'केला', difficulty: 'easy' },
      { id: 'hi-3', text: 'बिल्ली', difficulty: 'easy' },
      { id: 'hi-4', text: 'कुत्ता', difficulty: 'easy' },
      { id: 'hi-5', text: 'हाथी', difficulty: 'medium' },
      { id: 'hi-6', text: 'फूल', difficulty: 'easy' },
    ],
    languageId: 'hi',
    difficulty: 'easy',
  },
];
