
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Reset isLoaded when the image source changes
  useEffect(() => {
    setIsLoaded(false);
  }, [finalImageUrl]);
  
  return (
    <div className="relative mb-3 w-24 h-24 overflow-hidden rounded-lg shadow-md">
      {/* Placeholder/loading state */}
      {!isLoaded && (
        <motion.div 
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-3xl">{text.charAt(0).toUpperCase()}</span>
        </motion.div>
      )}
      
      {/* Actual image with 3D hover effect */}
      <motion.div
        className="w-full h-full"
        whileHover={isSeasonal ? { 
          scale: 1.1,
          rotateY: 10,
          rotateX: -10,
          z: 10
        } : { 
          scale: 1.05,
          rotateY: 5,
          rotateX: -5
        }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <motion.img 
          src={finalImageUrl} 
          alt={text} 
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
            setIsLoaded(true);
          }}
        />
      </motion.div>
      
      {/* 3D-like border overlay */}
      <div className="absolute inset-0 rounded-lg pointer-events-none shadow-inner border border-white/30"></div>
      
      {/* Show sparkle indicator for seasonal content with animation */}
      {isSeasonal && isLoaded && (
        <motion.div 
          className="absolute top-1 right-1 text-yellow-500"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 15, 0, -15, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={18} className="drop-shadow-md" />
        </motion.div>
      )}
    </div>
  );
};
