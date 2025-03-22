
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, MessageCircle, Wand2, Home, MapIcon, Gamepad, Book, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GuideAppearance } from '../types';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../../utils/game';

interface GuideBubbleProps {
  showMessage: boolean;
  currentTip: string;
  guide: GuideAppearance;
  isAdventure?: boolean;
  onClose: () => void;
  onUseMagicItem: () => void;
  navigateTo?: (path: string) => void;
}

export const GuideBubble: React.FC<GuideBubbleProps> = ({
  showMessage,
  currentTip,
  guide,
  isAdventure = false,
  onClose,
  onUseMagicItem,
  navigateTo
}) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useGameStore();
  
  // Simplistic translation function based on common phrases
  const translateTip = () => {
    if (!selectedLanguage || selectedLanguage.id === 'en') return null;
    
    // Simple translations for common phrases - in a real app, this would use a proper translation system
    const translations: Record<string, Record<string, string>> = {
      "Explore different rooms": {
        es: "Explora diferentes habitaciones",
        fr: "Explorez différentes pièces",
        hi: "विभिन्न कमरों का अन्वेषण करें",
        zh: "探索不同的房间"
      },
      "Check your progress": {
        es: "Revisa tu progreso",
        fr: "Vérifiez vos progrès",
        hi: "अपनी प्रगति की जांच करें",
        zh: "查看您的进度"
      },
      "Welcome to Language Adventure": {
        es: "Bienvenido a Aventura del Lenguaje",
        fr: "Bienvenue à l'Aventure Linguistique",
        hi: "भाषा साहसिक यात्रा में आपका स्वागत है",
        zh: "欢迎来到语言冒险"
      },
      "Need help?": {
        es: "¿Necesitas ayuda?",
        fr: "Besoin d'aide?",
        hi: "मदद चाहिए?",
        zh: "需要帮助吗?"
      }
    };
    
    // Check if tip contains any of our translatable phrases
    for (const phrase in translations) {
      if (currentTip.includes(phrase)) {
        return translations[phrase][selectedLanguage.id];
      }
    }
    
    return null;
  };
  
  const translatedTip = translateTip();
  
  const bubbleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    }
  };

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      navigateTo(path);
    } else {
      onClose();
      navigate(path);
    }
  };

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          className={`fixed bottom-24 right-8 max-w-xs p-4 rounded-xl rounded-br-none shadow-lg z-40 ${guide.color}`}
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={onClose}
          >
            <X size={12} />
          </Button>
          
          <div className="flex items-start gap-2">
            <div className="pt-1">
              {(guide.personality === 'wise') ? (
                <Lightbulb className="text-yellow-600 h-5 w-5" />
              ) : (
                <MessageCircle className="text-blue-600 h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium mb-1">{guide.name} says:</p>
              <p className="text-sm">{currentTip}</p>
              {translatedTip && (
                <p className="text-sm mt-1 italic text-gray-700 dark:text-gray-300">"{translatedTip}"</p>
              )}
            </div>
          </div>
          
          {/* Quick Navigation Buttons */}
          <div className="mt-3 pt-2 border-t border-white/30">
            <p className="text-xs mb-2">Quick Navigation:</p>
            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNavigate('/')}
                title="Home"
              >
                <Home size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNavigate('/game')}
                title="Games"
              >
                <Gamepad size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNavigate('/adventure')}
                title="Adventure"
              >
                <MapIcon size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNavigate('/progress')}
                title="Progress"
              >
                <Book size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNavigate('/settings')}
                title="Settings"
              >
                <Settings size={14} />
              </Button>
            </div>
          </div>
          
          {isAdventure && (
            <motion.div
              className="mt-3 pt-3 border-t border-white/30 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={onUseMagicItem}
              >
                <Wand2 size={12} className="mr-1" /> Use Magic Lens
              </Button>
              <span className="text-xs opacity-70">Tap me anytime!</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
