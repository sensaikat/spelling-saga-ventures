
import { useState, useEffect } from 'react';
import { Language, Word } from '../../../utils/game';
import { useGameStore } from '../../../utils/game';
import { toast } from '@/components/ui/use-toast';
import { 
  MultiLanguageWordList, 
  MultiLanguageQuestion, 
  MultiLanguageGameState 
} from '../types';
import { 
  getRandomWord, 
  findMatchingWord, 
  generateQuestionOptions 
} from '../utils/wordUtils';

export function useMultiLanguageGame(
  selectedLanguages: Language[],
  selectedWordLists: MultiLanguageWordList[]
) {
  const { addPoints, checkAndUpdateStreak } = useGameStore();
  
  const [gameState, setGameState] = useState<MultiLanguageGameState>({
    selectedLanguages,
    selectedWordLists,
    score: 0,
    remainingLives: 3,
    questionsAnswered: 0,
    questionsTotal: 10,
    isGameCompleted: false
  });
  
  useEffect(() => {
    generateQuestion();
    checkAndUpdateStreak();
  }, []);
  
  const generateQuestion = () => {
    if (selectedLanguages.length < 2) {
      toast({
        title: "Error",
        description: "Need at least 2 languages to generate questions",
        variant: "destructive"
      });
      return;
    }
    
    const sourceLanguageIndex = Math.floor(Math.random() * selectedLanguages.length);
    let targetLanguageIndex;
    do {
      targetLanguageIndex = Math.floor(Math.random() * selectedLanguages.length);
    } while (targetLanguageIndex === sourceLanguageIndex);
    
    const sourceLanguage = selectedLanguages[sourceLanguageIndex];
    const targetLanguage = selectedLanguages[targetLanguageIndex];
    
    const sourceWord = getRandomWord(sourceLanguage.id, selectedWordLists);
    if (!sourceWord) return;
    
    const correctAnswer = findMatchingWord(sourceWord, targetLanguage.id, selectedWordLists);
    if (!correctAnswer) return;
    
    const shuffledOptions = generateQuestionOptions(
      correctAnswer, 
      targetLanguage.id, 
      selectedWordLists
    );
    
    const question: MultiLanguageQuestion = {
      sourceLanguage,
      targetLanguage,
      sourceWord,
      correctAnswer,
      options: shuffledOptions
    };
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: question
    }));
  };
  
  const handleAnswer = (selectedWord: Word) => {
    if (!gameState.currentQuestion) return;
    
    const isCorrect = selectedWord.id === gameState.currentQuestion.correctAnswer.id;
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Well done! You got it right.",
        variant: "default"
      });
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        questionsAnswered: prev.questionsAnswered + 1
      }));
      
      addPoints(10);
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${gameState.currentQuestion.correctAnswer.text}`,
        variant: "destructive"
      });
      
      setGameState(prev => ({
        ...prev,
        remainingLives: prev.remainingLives - 1,
        questionsAnswered: prev.questionsAnswered + 1
      }));
    }
    
    setTimeout(() => {
      setGameState(prev => {
        const gameCompleted = 
          prev.remainingLives <= 0 || 
          prev.questionsAnswered >= prev.questionsTotal;
        
        if (gameCompleted) {
          return { ...prev, isGameCompleted: true };
        }
        
        generateQuestion();
        return prev;
      });
    }, 1500);
  };
  
  const handleRestart = () => {
    setGameState({
      selectedLanguages,
      selectedWordLists,
      score: 0,
      remainingLives: 3,
      questionsAnswered: 0,
      questionsTotal: 10,
      isGameCompleted: false
    });
    generateQuestion();
  };
  
  return {
    gameState,
    handleAnswer,
    handleRestart
  };
}
