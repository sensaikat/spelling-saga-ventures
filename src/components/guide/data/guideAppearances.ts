
import { GuideAppearances } from '../types';

export const guideAppearances: GuideAppearances = {
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
