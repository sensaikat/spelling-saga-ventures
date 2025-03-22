
import { useEffect, useState } from 'react';
import { Language } from '../../../../utils/game';

interface CulturalPrompt {
  encouragement: string;
  funFact: string;
  contextualHint: string;
}

export const useGameCulture = (language: Language | null) => {
  const [culturalPrompts, setCulturalPrompts] = useState<CulturalPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<CulturalPrompt | null>(null);
  
  // Initialize cultural prompts based on selected language
  useEffect(() => {
    if (!language) return;
    
    let prompts: CulturalPrompt[] = [];
    
    switch (language.id) {
      case 'en':
        prompts = [
          {
            encouragement: "Great job! You're learning words that help you explore the world!",
            funFact: "Did you know? English is spoken in over 100 countries worldwide!",
            contextualHint: "Think about things you might see in a book or movie!"
          },
          {
            encouragement: "Fantastic spelling! These words connect you to different cultures!",
            funFact: "English has borrowed words from over 350 different languages!",
            contextualHint: "Many English words come from Latin, French, and German roots!"
          },
          {
            encouragement: "You're becoming a word explorer! Keep discovering new terms!",
            funFact: "Shakespeare invented over 1,700 words we still use today!",
            contextualHint: "Try sounding out each syllable separately!"
          }
        ];
        break;
        
      case 'hi':
        prompts = [
          {
            encouragement: "शाबाश! आप बहुत अच्छा कर रहे हैं!",
            funFact: "क्या आप जानते हैं? हिंदी दुनिया की चौथी सबसे अधिक बोली जाने वाली भाषा है!",
            contextualHint: "भारतीय संस्कृति में इन शब्दों का विशेष महत्व है!"
          },
          {
            encouragement: "वाह! आपकी हिंदी बहुत अच्छी हो रही है!",
            funFact: "हिंदी और उर्दू की लिपि अलग है लेकिन बोली-चाली मिलती-जुलती है!",
            contextualHint: "इस शब्द को भारतीय त्योहारों के संदर्भ में सोचें!"
          },
          {
            encouragement: "बहुत बढ़िया! आप एक भाषा विशेषज्ञ बन रहे हैं!",
            funFact: "हिंदी में 11 स्वर और 33 व्यंजन होते हैं!",
            contextualHint: "इस शब्द के हर अक्षर को अलग-अलग उच्चारित करके देखें!"
          }
        ];
        break;
        
      case 'es':
        prompts = [
          {
            encouragement: "¡Muy bien! ¡Estás aprendiendo palabras importantes de la cultura hispana!",
            funFact: "¿Sabías que el español es hablado por más de 460 millones de personas?",
            contextualHint: "¡Piensa en las tradiciones culturales de los países de habla hispana!"
          },
          {
            encouragement: "¡Excelente trabajo! ¡Sigues mejorando tu español!",
            funFact: "El español tiene palabras de origen árabe como 'almohada' y 'azúcar'.",
            contextualHint: "Esta palabra es importante en las celebraciones hispanas."
          },
          {
            encouragement: "¡Fantástico! Estás conectando con la cultura hispana.",
            funFact: "El español es el idioma oficial en 21 países diferentes.",
            contextualHint: "Intenta dividir la palabra en sílabas para deletrearla."
          }
        ];
        break;
        
      default:
        prompts = [
          {
            encouragement: "Great job learning new words!",
            funFact: "Every language has its own unique sounds and rhythms!",
            contextualHint: "Try breaking the word into smaller parts!"
          },
          {
            encouragement: "You're doing great with your language skills!",
            funFact: "Learning multiple languages helps your brain develop!",
            contextualHint: "Think about what this word means in the culture!"
          },
          {
            encouragement: "Excellent progress on your language journey!",
            funFact: "Language connects us to different cultures and traditions!",
            contextualHint: "Practice saying the word out loud as you spell it!"
          }
        ];
    }
    
    setCulturalPrompts(prompts);
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, [language]);
  
  const getRandomPrompt = () => {
    if (culturalPrompts.length === 0) return null;
    const randomPrompt = culturalPrompts[Math.floor(Math.random() * culturalPrompts.length)];
    setCurrentPrompt(randomPrompt);
    return randomPrompt;
  };
  
  const getEncouragement = () => currentPrompt?.encouragement || "Great job!";
  
  const getFunFact = () => currentPrompt?.funFact || "Languages connect us to different cultures!";
  
  const getContextualHint = () => currentPrompt?.contextualHint || "Think about the cultural context!";
  
  return {
    currentPrompt,
    getRandomPrompt,
    getEncouragement,
    getFunFact,
    getContextualHint
  };
};
