
import { Word } from '../../../utils/game';
import { MultiLanguageWordList } from '../types';
import { toast } from '@/components/ui/use-toast';

export const getRandomWord = (
  languageId: string, 
  wordLists: MultiLanguageWordList[]
): Word | null => {
  const wordList = wordLists.find(list => list.languageId === languageId);
  if (!wordList || wordList.words.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * wordList.words.length);
  return wordList.words[randomIndex];
};

export const findMatchingWord = (
  sourceWord: Word, 
  targetLanguageId: string,
  wordLists: MultiLanguageWordList[]
): Word | null => {
  const targetWordList = wordLists.find(list => list.languageId === targetLanguageId);
  if (!targetWordList) return null;
  
  const sourceWordList = wordLists.find(list => 
    list.words.some(word => word.id === sourceWord.id)
  );
  
  if (!sourceWordList) return null;
  
  const sourceIndex = sourceWordList.words.findIndex(word => word.id === sourceWord.id);
  
  if (sourceIndex >= 0 && sourceIndex < targetWordList.words.length) {
    return targetWordList.words[sourceIndex];
  } else {
    return getRandomWord(targetLanguageId, wordLists);
  }
};

export const generateQuestionOptions = (
  correctAnswer: Word,
  targetLanguageId: string,
  wordLists: MultiLanguageWordList[],
  optionsCount: number = 3
): Word[] => {
  const options: Word[] = [correctAnswer];
  
  while (options.length < optionsCount + 1) {
    const wrongOption = getRandomWord(targetLanguageId, wordLists);
    if (wrongOption && !options.some(opt => opt.id === wrongOption.id)) {
      options.push(wrongOption);
    }
  }
  
  return [...options].sort(() => Math.random() - 0.5);
};
