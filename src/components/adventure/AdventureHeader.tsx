
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Trophy, Sparkles, HelpCircle, Home, Gamepad, Settings, Book } from 'lucide-react';
import { Character, Location } from '../../contexts/adventure/types';
import { Language } from '../../utils/game';
import { terrainImages } from './constants/terrainData';
import { useNavigate } from 'react-router-dom';

interface AdventureHeaderProps {
  currentLocation: Location;
  character: Character;
  selectedLanguage: Language | null;
  onReturnToMap: () => void;
  onToggleTips: () => void;
  showTips: boolean;
}

const AdventureHeader: React.FC<AdventureHeaderProps> = ({
  currentLocation,
  character,
  selectedLanguage,
  onReturnToMap,
  onToggleTips,
  showTips
}) => {
  const navigate = useNavigate();
  
  // Get vernacular name based on selected language if available
  const getVernacularName = () => {
    if (!selectedLanguage) return null;
    
    const vernacularNames: Record<string, Record<string, string>> = {
      bedroom: {
        es: "Dormitorio",
        fr: "Chambre",
        hi: "शयनकक्ष",
        zh: "卧室",
        ar: "غرفة النوم",
      },
      kitchen: {
        es: "Cocina",
        fr: "Cuisine",
        hi: "रसोई",
        zh: "厨房",
        ar: "مطبخ",
      },
      livingRoom: {
        es: "Sala de estar",
        fr: "Salon",
        hi: "बैठक",
        zh: "客厅",
        ar: "غرفة المعيشة",
      },
      garden: {
        es: "Jardín",
        fr: "Jardin",
        hi: "बगीचा",
        zh: "花园",
        ar: "حديقة",
      },
      school: {
        es: "Escuela",
        fr: "École",
        hi: "विद्यालय",
        zh: "学校",
        ar: "مدرسة",
      },
      market: {
        es: "Mercado",
        fr: "Marché",
        hi: "बाज़ार",
        zh: "市场",
        ar: "سوق",
      }
    };
    
    const locationVernacular = vernacularNames[currentLocation.id]?.[selectedLanguage.id];
    return locationVernacular || null;
  };
  
  const vernacularName = getVernacularName();
  const previewImage = terrainImages[currentLocation.terrain];
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <motion.button
          className="flex items-center gap-1 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReturnToMap}
        >
          <ChevronLeft size={18} />
          <span>Adventure Map</span>
        </motion.button>
        
        <div className="flex items-center space-x-2">
          {/* Quick Navigation Menu */}
          <motion.button
            className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            aria-label="Home"
          >
            <Home size={18} />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/game')}
            aria-label="Games"
          >
            <Gamepad size={18} />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/progress')}
            aria-label="Progress"
          >
            <Book size={18} />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/settings')}
            aria-label="Settings"
          >
            <Settings size={18} />
          </motion.button>
          
          <motion.button
            className={`p-2 rounded-full shadow-md transition-colors ${
              showTips ? 'bg-blue-500 text-white' : 'bg-white/70 text-blue-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTips}
            aria-label="Tips"
          >
            <HelpCircle size={18} />
          </motion.button>
          
          <motion.div 
            className="flex items-center bg-yellow-100 px-3 py-1.5 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <Star size={18} className="mr-1 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700">{character.stars}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy size={18} className="mr-1 text-blue-500" />
            <span className="font-bold text-blue-700">{character.credits}</span>
          </motion.div>
        </div>
      </div>
      
      <div className="glass-panel bg-white/60 backdrop-blur-sm p-5 rounded-xl shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold mb-1">{currentLocation.name}</h1>
            {vernacularName && (
              <div className="text-lg text-gray-600 italic mb-2">
                <span>"{vernacularName}"</span>
              </div>
            )}
            {selectedLanguage && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">{selectedLanguage.flag}</span>
                <span>Learning in {selectedLanguage.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {previewImage && (
              <motion.div 
                className="relative w-24 h-24 mr-4 overflow-hidden rounded-lg shadow-md bg-gray-100"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={previewImage} 
                  alt={`${currentLocation.name} preview`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                    e.currentTarget.onerror = null; // Prevent infinite loop if placeholder also fails
                  }}
                />
              </motion.div>
            )}
            
            <motion.div
              className="text-4xl"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {character.avatar}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureHeader;
