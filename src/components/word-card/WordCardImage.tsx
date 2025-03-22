
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../utils/game';
import { useSeasonalContent } from '../../hooks/useSeasonalContent';
import { Sparkles } from 'lucide-react';
import { useThemeToggle } from '../../contexts/theme/ThemeContext';
import { useResolutionContext } from '../../contexts/resolution/ResolutionContext';

interface WordCardImageProps {
  text: string;
  imageUrl: string;
}

export const WordCardImage: React.FC<WordCardImageProps> = ({ text, imageUrl }) => {
  const { selectedLanguage } = useGameStore();
  const { isDarkMode } = useThemeToggle();
  const { resolutionTier, isMobile } = useResolutionContext();
  const [isSeasonal, setIsSeasonal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { getSeasonalImage, isSeasonalWord } = useSeasonalContent(
    selectedLanguage?.id || 'en'
  );
  
  // Check if we have a seasonal override for this image
  const seasonalImageUrl = getSeasonalImage(text);
  const finalImageUrl = seasonalImageUrl || imageUrl;
  
  // Modify image URL to load appropriate resolution based on device
  const getOptimizedImageUrl = (url: string) => {
    // Only process if it's a URL we can append parameters to
    if (!url || !url.includes('unsplash.com')) return url;
    
    // Determine appropriate dimensions based on resolution tier
    let quality = 80; // Default quality
    let width = 600;  // Default width
    
    switch (resolutionTier) {
      case 'low':
        quality = 60;
        width = isMobile ? 300 : 400;
        break;
      case 'medium':
        quality = 70;
        width = isMobile ? 400 : 500;
        break;
      case 'high':
        quality = 80;
        width = isMobile ? 500 : 600;
        break;
      case 'ultra':
        quality = 90;
        width = isMobile ? 600 : 800;
        break;
    }
    
    // Append quality and size parameters
    return `${url}?q=${quality}&w=${width}`;
  };
  
  const optimizedImageUrl = getOptimizedImageUrl(finalImageUrl);
  
  // Check if this is a seasonal word
  useEffect(() => {
    setIsSeasonal(isSeasonalWord(text));
  }, [text, isSeasonalWord]);

  // Reset isLoaded when the image source changes
  useEffect(() => {
    setIsLoaded(false);
  }, [optimizedImageUrl]);
  
  // Determine animation complexity based on resolution tier
  const getAnimationSettings = () => {
    // Simpler animations for lower resolutions
    if (resolutionTier === 'low' || isMobile) {
      return {
        hover: { scale: 1.05 },
        transition: { type: "spring", stiffness: 300 }
      };
    }
    
    // More complex animations for higher resolutions
    const isSeasonal3DEffect = isSeasonal && ['high', 'ultra'].includes(resolutionTier);
    
    return {
      hover: isSeasonal3DEffect ? { 
        scale: 1.2,
        rotateY: 10,
        rotateX: -10,
        z: 20
      } : { 
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
        z: 10
      },
      transition: { type: "spring", stiffness: 400 }
    };
  };
  
  const animationSettings = getAnimationSettings();
  
  return (
    <div className="relative mb-3 w-24 h-24 overflow-hidden rounded-lg shadow-md transition-all duration-300">
      {/* Placeholder/loading state */}
      {!isLoaded && (
        <motion.div 
          className={`absolute inset-0 flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className={`text-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {text.charAt(0).toUpperCase()}
          </span>
        </motion.div>
      )}
      
      {/* Actual image with enhanced 3D hover effect scaled to resolution */}
      <motion.div
        className="w-full h-full"
        whileHover={animationSettings.hover}
        transition={animationSettings.transition}
      >
        <motion.img 
          src={optimizedImageUrl} 
          alt={text} 
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${
            isDarkMode ? 'brightness-90 contrast-125' : ''
          }`}
          initial={{ scale: 0.95 }}
          animate={{ 
            scale: 1,
            filter: isDarkMode ? 'brightness(0.9) contrast(1.25)' : 'brightness(1) contrast(1)'
          }}
          transition={{ type: "spring", stiffness: 300 }}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
            setIsLoaded(true);
          }}
        />
      </motion.div>
      
      {/* 3D-like border overlay with adaptive colors for dark mode */}
      <div className={`absolute inset-0 rounded-lg pointer-events-none shadow-inner ${
        isDarkMode 
          ? 'border border-gray-600/30' 
          : 'border border-white/30'
      }`}></div>
      
      {/* Show sparkle indicator for seasonal content with enhanced animation */}
      {isSeasonal && isLoaded && (
        <motion.div 
          className="absolute top-1 right-1 text-yellow-500"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 15, 0, -15, 0],
            filter: isDarkMode ? 'brightness(1.2)' : 'brightness(1)'
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={18} className={`${isDarkMode ? 'drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'drop-shadow-md'}`} />
        </motion.div>
      )}
    </div>
  );
};
