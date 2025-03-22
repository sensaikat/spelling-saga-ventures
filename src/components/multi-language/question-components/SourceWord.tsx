
import React from 'react';
import { Volume2 } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useSpeech } from '../hooks/useSpeech';

interface SourceWordProps {
  word: Word;
  languageId: string;
}

const SourceWord: React.FC<SourceWordProps> = ({ word, languageId }) => {
  const { speakWord, isSpeaking } = useSpeech();
  
  return (
    <div className="text-center my-8">
      <div className="flex items-center justify-center mb-3">
        <div className="bg-white rounded-lg px-8 py-4 shadow-sm border border-gray-200 inline-block">
          <h3 className="text-2xl font-medium">{word.text}</h3>
        </div>
        <button 
          className={`ml-3 p-2 rounded-full ${isSpeaking ? 'bg-game-blue/10 text-game-blue' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
          onClick={() => speakWord(word.text, languageId)}
          aria-label={`Pronounce ${word.text}`}
        >
          <Volume2 size={20} />
        </button>
      </div>
      
      {word.hint && (
        <p className="text-sm text-gray-600 italic">Hint: {word.hint}</p>
      )}
    </div>
  );
};

export default SourceWord;
