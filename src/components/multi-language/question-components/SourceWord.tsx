
import React from 'react';
import { Volume2 } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useSpeech } from '../hooks/useSpeech';
import { defaultImages } from '../../word-card/ImageMappings';

interface SourceWordProps {
  word: Word;
  languageId: string;
}

const SourceWord: React.FC<SourceWordProps> = ({ word, languageId }) => {
  const { speakWord, isSpeaking } = useSpeech();
  
  // Use provided image or get from default mapping or use placeholder
  const imageUrl = word.image || defaultImages[word.text.toLowerCase()] || 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
  
  return (
    <div className="text-center my-8">
      <div className="flex flex-col items-center mb-3">
        <div className="w-24 h-24 mb-4 overflow-hidden rounded-lg shadow-sm">
          <img 
            src={imageUrl} 
            alt={word.text} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
            }}
          />
        </div>
        
        <div className="flex items-center bg-white rounded-lg px-8 py-4 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-medium">{word.text}</h3>
          <button 
            className={`ml-3 p-2 rounded-full ${isSpeaking ? 'bg-game-blue/10 text-game-blue' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
            onClick={() => speakWord(word.text, languageId)}
            aria-label={`Pronounce ${word.text}`}
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>
      
      {word.hint && (
        <p className="text-sm text-gray-600 italic">Hint: {word.hint}</p>
      )}
    </div>
  );
};

export default SourceWord;

