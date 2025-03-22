
import React from 'react';
import { useGameStore } from '../../../../utils/game';

interface TranslationHelperProps {
  currentTip: string;
}

export const TranslationHelper: React.FC<TranslationHelperProps> = ({
  currentTip
}) => {
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
  
  return {
    translatedTip: translateTip()
  };
};
