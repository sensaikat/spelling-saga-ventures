
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
          },
          {
            encouragement: "Amazing progress! You're learning about English-speaking cultures!",
            funFact: "The shortest complete sentence in English is 'I am.'",
            contextualHint: "Think about the cultural context of this word in English traditions!"
          },
          {
            encouragement: "Brilliant work! Your English vocabulary is growing!",
            funFact: "The most common letter in English is 'e'!",
            contextualHint: "This word appears frequently in English literature and daily life!"
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
          },
          {
            encouragement: "उत्तम! आप भारतीय संस्कृति के बारे में सीख रहे हैं!",
            funFact: "हिंदी भारत की आधिकारिक भाषा है और 10 से अधिक देशों में बोली जाती है!",
            contextualHint: "यह शब्द भारतीय इतिहास और परंपरा से जुड़ा हुआ है!"
          },
          {
            encouragement: "अद्भुत! आप हिंदी भाषा में निपुण हो रहे हैं!",
            funFact: "विश्व हिंदी दिवस हर साल 10 जनवरी को मनाया जाता है!",
            contextualHint: "इस शब्द का उपयोग भारतीय दैनिक जीवन में बहुत होता है!"
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
          },
          {
            encouragement: "¡Magnífico! Estás aprendiendo sobre las tradiciones hispanas.",
            funFact: "La letra 'ñ' es única del alfabeto español y algunas lenguas relacionadas.",
            contextualHint: "Esta palabra tiene un significado cultural especial en América Latina."
          },
          {
            encouragement: "¡Increíble! Tu vocabulario español está creciendo rápidamente.",
            funFact: "Don Quijote de la Mancha es considerada la primera novela moderna.",
            contextualHint: "Esta palabra aparece frecuentemente en la vida diaria de países hispanohablantes."
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
          },
          {
            encouragement: "Wonderful work learning about world cultures!",
            funFact: "There are over 7,000 languages spoken in the world today!",
            contextualHint: "This word has cultural significance in many regions!"
          },
          {
            encouragement: "Fantastic effort! Keep exploring languages!",
            funFact: "Many languages share common roots and word origins!",
            contextualHint: "Visualize what this word represents in its culture!"
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
