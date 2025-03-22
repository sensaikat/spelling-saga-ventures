
import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useSpeech } from '../hooks/useSpeech';
import { defaultImages } from '../../word-card/ImageMappings';
import { useSeasonalContent } from '../../../hooks/useSeasonalContent';
import { useGameStore } from '../../../utils/game';

interface SourceWordProps {
  word: Word;
  languageId: string;
}

const SourceWord: React.FC<SourceWordProps> = ({ word, languageId }) => {
  const { speakWord, isSpeaking } = useSpeech();
  const { selectedLanguage } = useGameStore();
  const { getSeasonalImage, isSeasonalWord } = useSeasonalContent(languageId);
  
  // Check if we have a seasonal override for this image
  const baseImageUrl = word.image || defaultImages[word.text.toLowerCase()] || 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
  const seasonalImageUrl = getSeasonalImage(word.text);
  const finalImageUrl = seasonalImageUrl || baseImageUrl;
  
  // Check if this is a seasonal word
  const isSeasonal = isSeasonalWord(word.text);
  
  return (
    <div className="text-center my-8">
      <div className="flex flex-col items-center mb-3">
        <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-lg shadow-sm">
          <img 
            src={finalImageUrl} 
            alt={word.text} 
            className={`w-full h-full object-cover transition-transform ${isSeasonal ? 'hover:scale-110' : ''}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
            }}
          />
          
          {/* Show sparkle indicator for seasonal content */}
          {isSeasonal && (
            <div className="absolute top-2 right-2 text-yellow-500 animate-pulse">
              <Sparkles size={18} />
            </div>
          )}
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
      
      {/* Show seasonal context if this is a seasonal word */}
      {isSeasonal && (
        <div className="mt-2 text-sm bg-amber-50 px-3 py-2 rounded-md inline-flex items-center">
          <Sparkles size={14} className="text-amber-500 mr-1" />
          <span className="text-amber-700">Seasonal word!</span>
        </div>
      )}
    </div>
  );
};

export default SourceWord;
