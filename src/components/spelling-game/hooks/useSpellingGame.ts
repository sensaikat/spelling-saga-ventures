
import { useState, useEffect } from 'react';
import { Word } from '../../../utils/game';

export const useSpellingGame = (
  words: Word[],
  isAdventure: boolean,
  onAdventureComplete?: (score: number) => void
) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [inputStatus, setInputStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showHintButton, setShowHintButton] = useState(true);
  const [remainingLives, setRemainingLives] = useState(3);
  const [showGuide, setShowGuide] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");

  // Initialize game state
  useEffect(() => {
    if (words && words.length > 0) {
      setCurrentWord(words[0]);
      setWordCount(words.length);
    }
  }, [words]);
  
  // Timer for elapsed time
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (!gameFinished) {
      intervalId = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [gameFinished]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingAnswer(true);
    
    if (!currentWord) return;
    
    const isCorrect = userInput.trim() === currentWord.text.trim();
    
    setInputStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCorrectWords(prevCorrectWords => [...prevCorrectWords, currentWord]);
    } else {
      setIncorrectWords(prevIncorrectWords => [...prevIncorrectWords, {
        ...currentWord,
        userAnswer: userInput
      } as Word]);
    }
    
    setUserInput('');
    
    setTimeout(() => {
      setIsCheckingAnswer(false);
      setInputStatus(null);
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setCurrentWord(words[currentIndex + 1]);
      } else {
        setGameFinished(true);
      }
    }, 1500);
  };
  
  const handlePlayAgainClick = () => {
    setScore(0);
    setCurrentIndex(0);
    setIncorrectWords([]);
    setCorrectWords([]);
    setGameFinished(false);
    setElapsedTime(0);
    setUserInput('');
    if (words && words.length > 0) {
      setCurrentWord(words[0]);
      setWordCount(words.length);
    }
  };
  
  const handleSkipClick = () => {
    if (!currentWord) return;
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
      setUserInput('');
    } else {
      setGameFinished(true);
    }
  };
  
  const handleShowHint = () => {
    setShowHintButton(false);
    setShowHint(true);
  };
  
  const handleAdventureReturn = () => {
    if (onAdventureComplete) {
      onAdventureComplete(score);
    }
  };

  const showGuideWithMessage = (message: string) => {
    setShowGuide(true);
    setGuideMessage(message);
    
    // Hide the guide after animation
    setTimeout(() => {
      setShowGuide(false);
    }, 2000);
  };

  return {
    // State
    currentWord,
    userInput,
    score,
    wordCount,
    currentIndex,
    incorrectWords,
    correctWords,
    gameFinished,
    elapsedTime,
    isCheckingAnswer,
    inputStatus,
    showHint,
    showHintButton,
    remainingLives,
    showGuide,
    guideMessage,
    
    // Actions
    setUserInput,
    handleSubmit,
    handlePlayAgainClick,
    handleSkipClick,
    handleShowHint,
    handleAdventureReturn,
    showGuideWithMessage
  };
};
