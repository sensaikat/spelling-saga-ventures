
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Languages, Heart, Shuffle, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useGameStore, Word } from '../../utils/game';
import { Language } from '../../utils/game/types';
import {
  MultiLanguageWordList,
  MultiLanguageQuestion,
  MultiLanguageGameState
} from './types';
import MultiLanguageQuestion from './MultiLanguageQuestion';
import MultiLanguageResult from './MultiLanguageResult';

interface MultiLanguageGameContainerProps {
  selectedLanguages: Language[];
  selectedWordLists: MultiLanguageWordList[];
}

const MultiLanguageGameContainer: React.FC<MultiLanguageGameContainerProps> = ({
  selectedLanguages,
  selectedWordLists
}) => {
  const navigate = useNavigate();
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
  
  // Generate questions when game starts
  useEffect(() => {
    generateQuestion();
    checkAndUpdateStreak();
  }, []);
  
  // Get a random word from a specific language word list
  const getRandomWord = (languageId: string): Word | null => {
    const wordList = selectedWordLists.find(list => list.languageId === languageId);
    if (!wordList || wordList.words.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * wordList.words.length);
    return wordList.words[randomIndex];
  };
  
  // Find matching word in target language
  const findMatchingWord = (sourceWord: Word, targetLanguageId: string): Word | null => {
    const targetWordList = selectedWordLists.find(list => list.languageId === targetLanguageId);
    if (!targetWordList) return null;
    
    // Try to find a word with the same meaning (in this simplified version,
    // we'll just use words with the same array index, assuming they match in meaning)
    const sourceWordList = selectedWordLists.find(list => 
      list.words.some(word => word.id === sourceWord.id)
    );
    
    if (!sourceWordList) return null;
    
    const sourceIndex = sourceWordList.words.findIndex(word => word.id === sourceWord.id);
    
    // If the target word list has this index, use it, otherwise pick a random word
    if (sourceIndex >= 0 && sourceIndex < targetWordList.words.length) {
      return targetWordList.words[sourceIndex];
    } else {
      return getRandomWord(targetLanguageId);
    }
  };
  
  // Generate a new question
  const generateQuestion = () => {
    if (selectedLanguages.length < 2) {
      toast({
        title: "Error",
        description: "Need at least 2 languages to generate questions",
        variant: "destructive"
      });
      return;
    }
    
    // Pick random source and target languages
    const sourceLanguageIndex = Math.floor(Math.random() * selectedLanguages.length);
    let targetLanguageIndex;
    do {
      targetLanguageIndex = Math.floor(Math.random() * selectedLanguages.length);
    } while (targetLanguageIndex === sourceLanguageIndex);
    
    const sourceLanguage = selectedLanguages[sourceLanguageIndex];
    const targetLanguage = selectedLanguages[targetLanguageIndex];
    
    // Get a random word from source language
    const sourceWord = getRandomWord(sourceLanguage.id);
    if (!sourceWord) return;
    
    // Find matching word in target language
    const correctAnswer = findMatchingWord(sourceWord, targetLanguage.id);
    if (!correctAnswer) return;
    
    // Generate wrong options
    const options: Word[] = [correctAnswer];
    const optionsCount = 3;
    
    while (options.length < optionsCount + 1) {
      const wrongOption = getRandomWord(targetLanguage.id);
      if (wrongOption && !options.some(opt => opt.id === wrongOption.id)) {
        options.push(wrongOption);
      }
    }
    
    // Shuffle options
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    
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
    
    // Check if game should end
    setTimeout(() => {
      setGameState(prev => {
        const gameCompleted = 
          prev.remainingLives <= 0 || 
          prev.questionsAnswered >= prev.questionsTotal;
        
        if (gameCompleted) {
          return { ...prev, isGameCompleted: true };
        }
        
        // Continue with next question
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {!gameState.isGameCompleted ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <button 
                onClick={() => navigate('/multi-language')} 
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span>Back</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(gameState.remainingLives)].map((_, i) => (
                    <Heart 
                      key={i} 
                      size={20} 
                      className="text-red-500 fill-red-500" 
                    />
                  ))}
                  {[...Array(3 - gameState.remainingLives)].map((_, i) => (
                    <Heart 
                      key={i + gameState.remainingLives} 
                      size={20} 
                      className="text-gray-300" 
                    />
                  ))}
                </div>
                
                <div className="text-lg font-medium">
                  Score: <span className="text-game-purple">{gameState.score}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-game-blue h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(gameState.questionsAnswered / gameState.questionsTotal) * 100}%` }}
              />
            </div>
            
            <div className="text-center mb-4">
              <p className="text-gray-600">
                Question {gameState.questionsAnswered + 1} of {gameState.questionsTotal}
              </p>
            </div>
            
            {gameState.currentQuestion && (
              <MultiLanguageQuestion
                question={gameState.currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </>
        ) : (
          <MultiLanguageResult
            score={gameState.score}
            totalQuestions={gameState.questionsTotal}
            onPlayAgain={handleRestart}
            onBackToMenu={() => navigate('/multi-language')}
          />
        )}
      </div>
    </div>
  );
};

export default MultiLanguageGameContainer;
