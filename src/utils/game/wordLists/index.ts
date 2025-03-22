
import { WordList } from '../types';
import { englishWordLists } from './english';
import { spanishWordLists } from './spanish';
import { hindiWordLists } from './hindi';
import { 
  bengaliWordLists,
  oriyaWordLists,
  tamilWordLists,
  teluguWordLists,
  polishWordLists,
  otherWordLists
} from './other';

// Sample word list for all supported languages
export const wordLists: Record<string, WordList[]> = {
  en: englishWordLists,
  es: spanishWordLists,
  hi: hindiWordLists,
  bn: bengaliWordLists,
  or: oriyaWordLists,
  ta: tamilWordLists,
  te: teluguWordLists,
  pl: polishWordLists,
  ...otherWordLists
};
