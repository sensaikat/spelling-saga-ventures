
import React from 'react';

interface WordCardImageProps {
  text: string;
  imageUrl: string;
}

export const WordCardImage: React.FC<WordCardImageProps> = ({ text, imageUrl }) => {
  return (
    <div className="mb-3 w-20 h-20 overflow-hidden rounded-md flex items-center justify-center bg-gray-50">
      <img 
        src={imageUrl} 
        alt={text} 
        className="w-full h-full object-cover" 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
        }}
      />
    </div>
  );
};

