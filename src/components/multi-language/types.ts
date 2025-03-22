
import { Language, Word, WordList } from '../../utils/game/types';

export interface MultiLanguageWordList extends WordList {
  originalId: string;  // Reference to the original word list
  language: Language;  // The language this word list belongs to
}

export interface MultiLanguageQuestion {
  sourceLanguage: Language;
  targetLanguage: Language;
  sourceWord: Word;
  correctAnswer: Word;
  options?: Word[];
}

export interface MultiLanguageGameState {
  selectedLanguages: Language[];
  selectedWordLists: MultiLanguageWordList[];
  currentQuestion?: MultiLanguageQuestion;
  score: number;
  remainingLives: number;
  questionsAnswered: number;
  questionsTotal: number;
  isGameCompleted: boolean;
}
