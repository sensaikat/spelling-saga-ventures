
import React from 'react';
import { Language } from '../../utils/game';
import { MultiLanguageWordList } from './types';
import { useMultiLanguageGame } from './hooks/useMultiLanguageGame';
import MultiLanguageQuestionComponent from './MultiLanguageQuestion';
import MultiLanguageResult from './MultiLanguageResult';
import GameHeader from './GameHeader';

interface MultiLanguageGameContainerProps {
  selectedLanguages: Language[];
  selectedWordLists: MultiLanguageWordList[];
}

const MultiLanguageGameContainer: React.FC<MultiLanguageGameContainerProps> = ({
  selectedLanguages,
  selectedWordLists
}) => {
  const { gameState, handleAnswer, handleRestart } = useMultiLanguageGame(
    selectedLanguages,
    selectedWordLists
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {!gameState.isGameCompleted ? (
          <>
            <GameHeader
              score={gameState.score}
              remainingLives={gameState.remainingLives}
              questionsAnswered={gameState.questionsAnswered}
              questionsTotal={gameState.questionsTotal}
            />
            
            {gameState.currentQuestion && (
              <MultiLanguageQuestionComponent
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
            onBackToMenu={() => window.location.href = '/multi-language'}
          />
        )}
      </div>
    </div>
  );
};

export default MultiLanguageGameContainer;
