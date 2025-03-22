
import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../utils/game';
import { useSeasonalContent } from '../../hooks/useSeasonalContent';
import { Sparkles } from 'lucide-react';

interface WordCardImageProps {
  text: string;
  imageUrl: string;
}

export const WordCardImage: React.FC<WordCardImageProps> = ({ text, imageUrl }) => {
  const { selectedLanguage } = useGameStore();
  const [isSeasonal, setIsSeasonal] = useState(false);
  const { getSeasonalImage, isSeasonalWord } = useSeasonalContent(
    selectedLanguage?.id || 'en'
  );
  
  // Check if we have a seasonal override for this image
  const seasonalImageUrl = getSeasonalImage(text);
  const finalImageUrl = seasonalImageUrl || imageUrl;
  
  // Check if this is a seasonal word
  useEffect(() => {
    setIsSeasonal(isSeasonalWord(text));
  }, [text, isSeasonalWord]);
  
  return (
    <div className="relative mb-3 w-20 h-20 overflow-hidden rounded-md flex items-center justify-center bg-gray-50">
      <img 
        src={finalImageUrl} 
        alt={text} 
        className={`w-full h-full object-cover transition-transform ${isSeasonal ? 'hover:scale-110' : ''}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
        }}
      />
      
      {/* Show sparkle indicator for seasonal content */}
      {isSeasonal && (
        <div className="absolute top-1 right-1 text-yellow-500 animate-pulse">
          <Sparkles size={16} />
        </div>
      )}
    </div>
  );
};
