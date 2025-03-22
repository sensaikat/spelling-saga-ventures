import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Lightbulb, MessageCircle, X, UserRound, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '../utils/game';
import { TerrainType } from '../contexts/adventure/types';

const guideAppearances = {
  wizard: { 
    emoji: '🧙‍♂️', 
    name: 'Wizzy', 
    color: 'bg-violet-100 border-violet-300 text-violet-800',
    personality: 'wise',
    greetings: {
      en: { hello: "Hello there, young scholar!", wellDone: "Magnificent spell-casting!", goodbye: "Farewell, until next time!" },
      es: { hello: "¡Hola, joven aprendiz!", wellDone: "¡Hechizo magnífico!", goodbye: "¡Adiós, hasta la próxima!" },
      hi: { hello: "नमस्ते, युवा विद्वान!", wellDone: "शानदार प्रदर्शन!", goodbye: "अलविदा, अगली बार तक!" },
      fr: { hello: "Bonjour, jeune érudit!", wellDone: "Sortilège magnifique!", goodbye: "Au revoir, à la prochaine!" }
    }
  },
  explorer: { 
    emoji: '👧', 
    name: 'Flora', 
    color: 'bg-green-100 border-green-300 text-green-800',
    personality: 'adventurous',
    greetings: {
      en: { hello: "Hi there, fellow explorer!", wellDone: "Amazing discovery!", goodbye: "See you on our next adventure!" },
      es: { hello: "¡Hola, compañero explorador!", wellDone: "¡Descubrimiento asombroso!", goodbye: "¡Nos vemos en nuestra próxima aventura!" },
      hi: { hello: "नमस्ते, साथी अन्वेषक!", wellDone: "अद्भुत खोज!", goodbye: "हमारे अगले रोमांच पर मिलते हैं!" },
      fr: { hello: "Salut, explorateur!", wellDone: "Découverte incroyable!", goodbye: "À la prochaine aventure!" }
    }
  },
  robot: { 
    emoji: '🤖', 
    name: 'Beep', 
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    personality: 'logical',
    greetings: {
      en: { hello: "Greetings, human learner.", wellDone: "Calculation correct. Well done.", goodbye: "Ending session. Goodbye." },
      es: { hello: "Saludos, aprendiz humano.", wellDone: "Cálculo correcto. Bien hecho.", goodbye: "Terminando sesión. Adiós." },
      hi: { hello: "नमस्कार, मानव शिक्षार्थी।", wellDone: "गणना सही। शाबाश।", goodbye: "सत्र समाप्त। अलविदा।" },
      fr: { hello: "Salutations, apprenant humain.", wellDone: "Calcul correct. Bien joué.", goodbye: "Fin de session. Au revoir." }
    }
  },
  dragon: { 
    emoji: '🐉', 
    name: 'Sparky', 
    color: 'bg-red-100 border-red-300 text-red-800',
    personality: 'energetic',
    greetings: {
      en: { hello: "ROAR! Ready to learn?", wellDone: "AMAZING! You're on fire!", goodbye: "Fly you later, word warrior!" },
      es: { hello: "¡RUGIDO! ¿Listo para aprender?", wellDone: "¡INCREÍBLE! ¡Estás que ardes!", goodbye: "¡Hasta luego, guerrero de palabras!" },
      hi: { hello: "दहाड़! सीखने के लिए तैयार?", wellDone: "अद्भुत! आप आग लगा रहे हैं!", goodbye: "बाद में मिलते हैं, शब्द योद्धा!" },
      fr: { hello: "RUGISSEMENT! Prêt à apprendre?", wellDone: "INCROYABLE! Tu es en feu!", goodbye: "À plus tard, guerrier des mots!" }
    }
  },
  alien: { 
    emoji: '👽', 
    name: 'Nova', 
    color: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    personality: 'curious',
    greetings: {
      en: { hello: "Greetings, Earth learner!", wellDone: "Most impressive Earth skills!", goodbye: "Until our paths cross again!" },
      es: { hello: "¡Saludos, aprendiz de la Tierra!", wellDone: "¡Habilidades terrestres muy impresionantes!", goodbye: "¡Hasta que nuestros caminos se crucen de nuevo!" },
      hi: { hello: "नमस्कार, पृथ्वी के शिक्षार्थी!", wellDone: "बहुत प्रभावशाली पृथ्वी कौशल!", goodbye: "जब तक हमारे रास्ते फिर से न मिलें!" },
      fr: { hello: "Salutations, apprenant terrien!", wellDone: "Compétences terriennes très impressionnantes!", goodbye: "Jusqu'à ce que nos chemins se croisent à nouveau!" }
    }
  },
  forest: { emoji: '👧', name: 'Flora', color: 'bg-green-100 border-green-300 text-green-800' },
  desert: { emoji: '👦', name: 'Sandy', color: 'bg-amber-100 border-amber-300 text-amber-800' },
  river: { emoji: '🧒', name: 'Marina', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  mountain: { emoji: '👧', name: 'Sierra', color: 'bg-slate-100 border-slate-300 text-slate-800' },
  castle: { emoji: '👑', name: 'Reggie', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  space: { emoji: '👽', name: 'Nova', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  default: { emoji: '🧙‍♂️', name: 'Wizzy', color: 'bg-violet-100 border-violet-300 text-violet-800' }
};

const getTipsByPersonality = (personality: string = 'wise') => {
  const commonTips = [
    "Look for patterns in the spelling.",
    "Take your time with each word, no need to rush.",
    "If you're stuck, try sounding out the word slowly.",
    "Practice makes perfect - keep trying!"
  ];
  
  const personalityTips = {
    wise: [
      "Remember to listen carefully to the pronunciation!",
      "When in doubt, break the word into smaller parts.",
      "The ancient scholars would approve of your dedication.",
      "Knowledge is a journey, not a destination."
    ],
    adventurous: [
      "Another word conquered on your spelling adventure!",
      "Let's explore the world of words together!",
      "Brave explorers are never afraid to try!",
      "What exciting new words will we discover today?"
    ],
    logical: [
      "Analyzing word structure improves recall by 42%.",
      "Statistical analysis shows your improvement curve is optimal.",
      "Memory processes engaged. Learning sequence initiated.",
      "Systematic approach yields optimal spelling results."
    ],
    energetic: [
      "AWESOME! Your spelling powers are INCREDIBLE!",
      "You're BLAZING through these words like a CHAMPION!",
      "WOW! That was SPECTACULAR spelling!",
      "Your energy for learning is UNSTOPPABLE!"
    ],
    curious: [
      "Fascinating how these Earth words connect together!",
      "Your species' language contains such interesting patterns!",
      "I'm curious - how do you remember all these spellings?",
      "What an interesting word! I've added it to my database."
    ]
  };
  
  return [...commonTips, ...(personalityTips[personality as keyof typeof personalityTips] || personalityTips.wise)];
};

interface GuideCharacterProps {
  terrain?: TerrainType;
  isAdventure?: boolean;
  onUseMagicItem?: () => void;
  selectedAvatar?: string;
  selectedLanguage?: string;
  onChangeAvatar?: () => void;
  proactiveMessage?: string;
}

const GuideCharacter: React.FC<GuideCharacterProps> = ({ 
  terrain = 'forest',
  isAdventure = true,
  onUseMagicItem,
  selectedAvatar,
  selectedLanguage,
  onChangeAvatar,
  proactiveMessage
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [magicItemUsed, setMagicItemUsed] = useState(false);
  const [greetingType, setGreetingType] = useState<'hello' | 'wellDone' | 'goodbye'>('hello');
  const { selectedLanguage: gameLanguage } = useGameStore();
  
  const avatarKey = selectedAvatar || terrain;
  const guide = guideAppearances[avatarKey as keyof typeof guideAppearances] || guideAppearances.default;
  const personality = (guide as any).personality || 'wise';
  
  const languageCode = selectedLanguage || (gameLanguage ? gameLanguage.id.split('-')[0] : 'en');
  const tipTypes = getTipsByPersonality(personality);
  
  const getGreeting = () => {
    if ((guide as any).greetings) {
      const langGreetings = (guide as any).greetings[languageCode] || (guide as any).greetings.en;
      return langGreetings[greetingType];
    }
    return "Hello!";
  };
  
  useEffect(() => {
    if (proactiveMessage) {
      setCurrentTip(proactiveMessage);
      setShowMessage(true);
      
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [proactiveMessage]);
  
  useEffect(() => {
    if (!proactiveMessage) {
      const randomAppearance = Math.random() > 0.7;
      if (randomAppearance && !showMessage) {
        const timer = setTimeout(() => {
          const randomTip = tipTypes[Math.floor(Math.random() * tipTypes.length)];
          setCurrentTip(randomTip);
          setGreetingType(Math.random() > 0.8 ? 'wellDone' : 'hello');
          setShowMessage(true);
        }, 5000 + Math.random() * 15000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [showMessage, tipTypes, proactiveMessage]);
  
  const handleUseMagicItem = () => {
    setMagicItemUsed(true);
    if (onUseMagicItem) {
      onUseMagicItem();
    }
    
    setTimeout(() => {
      setMagicItemUsed(false);
    }, 5000);
  };
  
  const showSpecificMessage = (message: string) => {
    setCurrentTip(message);
    setShowMessage(true);
  };
  
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
  
  const guideVariants = {
    normal: { 
      scale: 1, 
      rotate: 0 
    },
    excited: { 
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={showMessage ? "excited" : "normal"}
        variants={guideVariants}
        transition={{ type: 'spring', delay: 1 }}
      >
        <div className="relative">
          <motion.div
            className={`absolute -top-16 -left-10 p-3 rounded-full ${
              magicItemUsed ? 'bg-yellow-200' : 'bg-white'
            } shadow-md cursor-pointer`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={handleUseMagicItem}
            animate={magicItemUsed ? {
              boxShadow: ['0px 0px 8px rgba(255,220,100,0.8)', '0px 0px 16px rgba(255,220,100,0.8)', '0px 0px 8px rgba(255,220,100,0.8)'],
            } : {}}
            transition={{ repeat: magicItemUsed ? Infinity : 0, duration: 1.5 }}
          >
            <div className="relative">
              <Wand2 size={24} className={magicItemUsed ? 'text-yellow-600' : 'text-gray-600'} />
              {magicItemUsed && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Sparkles size={32} className="text-yellow-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {onChangeAvatar && (
            <motion.div
              className="absolute -top-16 -right-10 p-3 rounded-full bg-white shadow-md cursor-pointer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9, rotate: 5 }}
              onClick={onChangeAvatar}
            >
              <UserRound size={24} className="text-gray-600" />
            </motion.div>
          )}
          
          <motion.div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
              showMessage ? 'border-4' : 'border-2'
            } shadow-lg cursor-pointer relative ${guide.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!showMessage) {
                if (Math.random() > 0.5) {
                  const randomType = Math.random() > 0.7 ? 'goodbye' : (Math.random() > 0.5 ? 'wellDone' : 'hello');
                  setGreetingType(randomType as 'hello' | 'wellDone' | 'goodbye');
                  setCurrentTip(getGreeting());
                } else {
                  const randomTip = tipTypes[Math.floor(Math.random() * tipTypes.length)];
                  setCurrentTip(randomTip);
                }
                setShowMessage(true);
              }
            }}
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
          >
            {guide.emoji}
            
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ 
                boxShadow: ['0px 0px 0px rgba(255,255,255,0)', '0px 0px 10px rgba(255,255,255,0.5)', '0px 0px 0px rgba(255,255,255,0)'],
                scale: [1, 1.1, 1]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            
            {!showMessage && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
      
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
              onClick={() => setShowMessage(false)}
            >
              <X size={12} />
            </Button>
            
            <div className="flex items-start gap-2">
              <div className="pt-1">
                {(guide as any).personality === 'wise' ? (
                  <Lightbulb className="text-yellow-600 h-5 w-5" />
                ) : (
                  <MessageCircle className="text-blue-600 h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium mb-1">{guide.name} says:</p>
                <p className="text-sm">{currentTip}</p>
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
                  onClick={handleUseMagicItem}
                >
                  <Wand2 size={12} className="mr-1" /> Use Magic Lens
                </Button>
                <span className="text-xs opacity-70">Tap me anytime!</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideCharacter;
