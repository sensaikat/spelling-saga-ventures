
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
  
  // Default image mapping
  const defaultImages: Record<string, string> = {
    'apple': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    'cat': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'dog': 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8',
    'elephant': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    'flower': 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    'giraffe': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50',
    'house': 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
    'manzana': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'plátano': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    'gato': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'perro': 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8',
    'elefante': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    'flor': 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
    'jirafa': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50',
    'casa': 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
    'सेब': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'केला': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    'बिल्ली': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'कुत्ता': 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8',
    'हाथी': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    'फूल': 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  };
  
  // Use provided image or get from default mapping or use placeholder
  const imageUrl = word.image || defaultImages[word.text.toLowerCase()] || 'https://images.unsplash.com/photo-1472396961693-142e6e269027';
  
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
              target.src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027';
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
