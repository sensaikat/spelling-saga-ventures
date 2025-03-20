import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export type Language = {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
};

export type Word = {
  id: string;
  text: string;
  audio?: string;
  image?: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type WordList = {
  id: string;
  name: string;
  description: string;
  words: Word[];
  languageId: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GameMode = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type UserProgress = {
  wordsMastered: string[];
  wordsInProgress: Record<string, number>; // wordId -> correctAttempts
  streakDays: number;
  lastPlayed: string | null;
  points: number;
  level: number;
};

// Available languages
export const languages: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { id: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { id: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { id: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
];

// Game modes
export const gameModes: GameMode[] = [
  { 
    id: 'spelling', 
    name: 'Spelling Challenge', 
    description: 'Test your spelling skills by typing the words you hear', 
    icon: 'pencil', 
    color: 'bg-game-blue'
  },
  { 
    id: 'scramble', 
    name: 'Word Scramble', 
    description: 'Unscramble the letters to form the correct word', 
    icon: 'shuffle', 
    color: 'bg-game-purple'
  },
  { 
    id: 'match', 
    name: 'Match & Learn', 
    description: 'Match words with their correct spelling', 
    icon: 'duplicate', 
    color: 'bg-game-green'
  },
  { 
    id: 'fill', 
    name: 'Fill the Blanks', 
    description: 'Complete words by filling in the missing letters', 
    icon: 'text-cursor-input', 
    color: 'bg-game-red'
  },
];

// Sample word list for English, Spanish, Hindi, and added languages
export const wordLists: Record<string, WordList[]> = {
  en: [
    {
      id: 'en-basics',
      name: 'Basic Words',
      description: 'Common everyday words for beginners',
      words: [
        { id: 'en-1', text: 'apple', difficulty: 'easy' },
        { id: 'en-2', text: 'banana', difficulty: 'easy' },
        { id: 'en-3', text: 'cat', difficulty: 'easy' },
        { id: 'en-4', text: 'dog', difficulty: 'easy' },
        { id: 'en-5', text: 'elephant', difficulty: 'medium' },
        { id: 'en-6', text: 'flower', difficulty: 'medium' },
        { id: 'en-7', text: 'giraffe', difficulty: 'medium' },
        { id: 'en-8', text: 'house', difficulty: 'easy' },
      ],
      languageId: 'en',
      difficulty: 'easy',
    },
    {
      id: 'en-animals',
      name: 'Animals',
      description: 'Words related to animals and wildlife',
      words: [
        { id: 'en-a1', text: 'tiger', difficulty: 'medium' },
        { id: 'en-a2', text: 'penguin', difficulty: 'medium' },
        { id: 'en-a3', text: 'zebra', difficulty: 'medium' },
        { id: 'en-a4', text: 'kangaroo', difficulty: 'hard' },
        { id: 'en-a5', text: 'dolphin', difficulty: 'medium' },
        { id: 'en-a6', text: 'octopus', difficulty: 'hard' },
      ],
      languageId: 'en',
      difficulty: 'medium',
    },
  ],
  es: [
    {
      id: 'es-basics',
      name: 'Palabras Básicas',
      description: 'Palabras comunes para principiantes',
      words: [
        { id: 'es-1', text: 'manzana', difficulty: 'easy' },
        { id: 'es-2', text: 'plátano', difficulty: 'easy' },
        { id: 'es-3', text: 'gato', difficulty: 'easy' },
        { id: 'es-4', text: 'perro', difficulty: 'easy' },
        { id: 'es-5', text: 'elefante', difficulty: 'medium' },
        { id: 'es-6', text: 'flor', difficulty: 'easy' },
        { id: 'es-7', text: 'jirafa', difficulty: 'medium' },
        { id: 'es-8', text: 'casa', difficulty: 'easy' },
      ],
      languageId: 'es',
      difficulty: 'easy',
    },
  ],
  hi: [
    {
      id: 'hi-basics',
      name: 'मूल शब्द',
      description: 'शुरुआती लोगों के लिए आम शब्द',
      words: [
        { id: 'hi-1', text: 'सेब', difficulty: 'easy' },
        { id: 'hi-2', text: 'केला', difficulty: 'easy' },
        { id: 'hi-3', text: 'बिल्ली', difficulty: 'easy' },
        { id: 'hi-4', text: 'कुत्ता', difficulty: 'easy' },
        { id: 'hi-5', text: 'हाथी', difficulty: 'medium' },
        { id: 'hi-6', text: 'फूल', difficulty: 'easy' },
      ],
      languageId: 'hi',
      difficulty: 'easy',
    },
  ],
  bn: [
    {
      id: 'bn-basics',
      name: 'মৌলিক শব্দ',
      description: 'শিশুদের জন্য প্রাথমিক শব্দ',
      words: [
        { id: 'bn-1', text: 'আপেল', hint: 'একটি লাল বা সবুজ ফল যা গাছে জন্মায়', difficulty: 'easy' },
        { id: 'bn-2', text: 'কলা', hint: 'একটি লম্বা হলুদ ফল যার আকার বাঁকা', difficulty: 'easy' },
        { id: 'bn-3', text: 'বিড়াল', hint: 'একটি ছোট পশুপালন প্রাণী যা মিউ মিউ শব্দ করে', difficulty: 'easy' },
        { id: 'bn-4', text: 'কুকুর', hint: 'একটি সাধারণ পোষা প্রাণী যা ঘেউ ঘেউ করে', difficulty: 'easy' },
        { id: 'bn-5', text: 'হাতি', hint: 'একটি বড় ধূসর প্রাণী যার শুঁড় আছে', difficulty: 'medium' },
        { id: 'bn-6', text: 'ফুল', hint: 'একটি রঙিন উদ্ভিদ যা ফোটে', difficulty: 'easy' },
      ],
      languageId: 'bn',
      difficulty: 'easy',
    }
  ],
  or: [
    {
      id: 'or-basics',
      name: 'ମୌଳିକ ଶବ୍ଦ',
      description: 'ପ୍ରାରମ୍ଭିକ ମାନଙ୍କ ପାଇଁ ସାଧାରଣ ଶବ୍ଦ',
      words: [
        { id: 'or-1', text: 'ଆପଲ', hint: 'ଏକ ଲାଲ କିମ୍ବା ସବୁଜ ଫଳ ଯାହା ଗଛରେ ହୁଏ', difficulty: 'easy' },
        { id: 'or-2', text: 'କଦଳୀ', hint: 'ଏକ ଲମ୍ବା ହଳଦିଆ ଫଳ ଯାହାର ବକ୍ର ଆକୃତି', difficulty: 'easy' },
        { id: 'or-3', text: 'ବିଲେଇ', hint: 'ଏକ ଛୋଟ ପୋଷା ପ୍ରାଣୀ ଯିଏ ମେଉଁ ମେଉଁ କରେ', difficulty: 'easy' },
        { id: 'or-4', text: 'କୁକୁର', hint: 'ଏକ ସାଧାରଣ ପୋଷା ଯିଏ ଭୁକିଥାଏ', difficulty: 'easy' },
      ],
      languageId: 'or',
      difficulty: 'easy',
    }
  ],
  ta: [
    {
      id: 'ta-basics',
      name: 'அடிப்படை வார்த்தைகள்',
      description: 'ஆரம்ப பயிற்சிக்கான பொதுவான வார்த்தைகள்',
      words: [
        { id: 'ta-1', text: 'ஆப்பிள்', hint: 'மரத்தில் வளரும் சிவப்பு அல்லது பச்சை பழம்', difficulty: 'easy' },
        { id: 'ta-2', text: 'வாழைப்பழம்', hint: 'வளைந்த வடிவம் கொண்ட நீளமான மஞ்சள் நிற பழம்', difficulty: 'easy' },
        { id: 'ta-3', text: 'பூனை', hint: 'மியாவ் என்று சத்தமிடும் சிறிய விலங்கு', difficulty: 'easy' },
        { id: 'ta-4', text: 'நாய்', hint: 'குரைக்கும் பொதுவான செல்லப்பிராணி', difficulty: 'easy' },
      ],
      languageId: 'ta',
      difficulty: 'easy',
    }
  ],
  te: [
    {
      id: 'te-basics',
      name: 'ప్రాథమిక పదాలు',
      description: 'ప్రారంభకులకు సాధారణ పదాలు',
      words: [
        { id: 'te-1', text: 'యాపిల్', hint: 'చెట్లపై పెరిగే ఎరుపు లేదా ఆకుపచ్చ పండు', difficulty: 'easy' },
        { id: 'te-2', text: 'అరటిపండు', hint: 'వంపు ఆకారంతో ఉన్న పొడవైన పసుపు రంగు పండు', difficulty: 'easy' },
        { id: 'te-3', text: 'పిల్లి', hint: 'మ్యావ్ అనే శబ్దం చేసే చిన్న పెంపుడు జంతువు', difficulty: 'easy' },
        { id: 'te-4', text: 'కుక్క', hint: 'మొరిగే సాధారణ పెంపుడు జంతువు', difficulty: 'easy' },
      ],
      languageId: 'te',
      difficulty: 'easy',
    }
  ],
  pl: [
    {
      id: 'pl-basics',
      name: 'Podstawowe Słowa',
      description: 'Codzienne słowa dla pocz��tkujących',
      words: [
        { id: 'pl-1', text: 'jabłko', hint: 'Czerwony lub zielony owoc, który rośnie na drzewach', difficulty: 'easy' },
        { id: 'pl-2', text: 'banan', hint: 'Długi żółty owoc o zakrzywionym kształcie', difficulty: 'easy' },
        { id: 'pl-3', text: 'kot', hint: 'Małe futrzaste zwierzę domowe, które miauczy', difficulty: 'easy' },
        { id: 'pl-4', text: 'pies', hint: 'Popularne zwierzę domowe, które szczeka', difficulty: 'easy' },
        { id: 'pl-5', text: 'słoń', hint: 'Duże szare zwierzę z trąbą', difficulty: 'medium' },
      ],
      languageId: 'pl',
      difficulty: 'easy',
    }
  ],
  ar: [
    {
      id: 'ar-basics',
      name: 'الكلمات الأساسية',
      description: 'كلمات يومية شائعة للمبتدئين',
      words: [
        { id: 'ar-1', text: 'تفاحة', hint: 'فاكهة حمراء أو خضراء تنمو على الأشجار', difficulty: 'easy' },
        { id: 'ar-2', text: 'موز', hint: 'فاكهة صفراء طويلة ذات شكل منحني', difficulty: 'easy' },
        { id: 'ar-3', text: 'قطة', hint: 'حيوان أليف صغير ذو فرو يموء', difficulty: 'easy' },
        { id: 'ar-4', text: 'كلب', hint: 'حيوان أليف شائع ينبح', difficulty: 'easy' },
        { id: 'ar-5', text: 'فيل', hint: 'حيوان رمادي كبير له خرطوم', difficulty: 'medium' },
        { id: 'ar-6', text: 'زهرة', hint: 'نبات ملون يزهر', difficulty: 'easy' },
      ],
      languageId: 'ar',
      difficulty: 'easy',
    }
  ],
  fr: [
    {
      id: 'fr-basics',
      name: 'Mots de Base',
      description: 'Mots quotidiens pour les débutants',
      words: [
        { id: 'fr-1', text: 'pomme', hint: 'Un fruit rouge ou vert qui pousse sur les arbres', difficulty: 'easy' },
        { id: 'fr-2', text: 'banane', hint: 'Un fruit jaune long à forme courbée', difficulty: 'easy' },
        { id: 'fr-3', text: 'chat', hint: 'Un petit animal de compagnie qui miaule', difficulty: 'easy' },
        { id: 'fr-4', text: 'chien', hint: 'Un animal de compagnie commun qui aboie', difficulty: 'easy' },
        { id: 'fr-5', text: 'éléphant', hint: 'Un grand animal gris avec une trompe', difficulty: 'medium' },
      ],
      languageId: 'fr',
      difficulty: 'easy',
    }
  ],
  zh: [
    {
      id: 'zh-basics',
      name: '基础词汇',
      description: '初学者常用的日常词汇',
      words: [
        { id: 'zh-1', text: '苹果', hint: '一种生长在树上的红色或绿色水果', difficulty: 'easy' },
        { id: 'zh-2', text: '香蕉', hint: '一种弯曲形状的长黄色水果', difficulty: 'easy' },
        { id: 'zh-3', text: '猫', hint: '一种会喵喵叫的小型毛茸茸宠物', difficulty: 'easy' },
        { id: 'zh-4', text: '狗', hint: '一种常见的会汪汪叫的宠物', difficulty: 'easy' },
        { id: 'zh-5', text: '大象', hint: '一种有长鼻子的大型灰色动物', difficulty: 'medium' },
      ],
      languageId: 'zh',
      difficulty: 'easy',
    }
  ],
};

// Store for application state
export interface GameState {
  selectedLanguage: Language | null;
  selectLanguage: (language: Language) => void;
  
  currentWordList: WordList | null;
  setCurrentWordList: (wordList: WordList | null) => void;
  
  selectedGameMode: GameMode | null;
  setSelectedGameMode: (gameMode: GameMode | null) => void;
  
  progress: UserProgress;
  addMasteredWord: (wordId: string) => void;
  updateWordProgress: (wordId: string, isCorrect: boolean) => void;
  addPoints: (points: number) => void;
  checkAndUpdateStreak: () => void;
  
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      selectedLanguage: null,
      selectLanguage: (language) => set({ selectedLanguage: language }),
      
      currentWordList: null,
      setCurrentWordList: (wordList) => set({ currentWordList: wordList }),
      
      selectedGameMode: null,
      setSelectedGameMode: (gameMode) => set({ selectedGameMode: gameMode }),
      
      progress: {
        wordsMastered: [],
        wordsInProgress: {},
        streakDays: 0,
        lastPlayed: null,
        points: 0,
        level: 1,
      },
      
      addMasteredWord: (wordId) => set((state) => ({
        progress: {
          ...state.progress,
          wordsMastered: [...state.progress.wordsMastered, wordId]
        }
      })),
      
      updateWordProgress: (wordId, isCorrect) => set((state) => {
        const currentProgress = state.progress.wordsInProgress[wordId] || 0;
        const newProgress = isCorrect ? currentProgress + 1 : Math.max(0, currentProgress - 1);
        
        // If reached mastery threshold (3 correct attempts)
        if (newProgress >= 3 && !state.progress.wordsMastered.includes(wordId)) {
          return {
            progress: {
              ...state.progress,
              wordsMastered: [...state.progress.wordsMastered, wordId],
              wordsInProgress: {
                ...state.progress.wordsInProgress,
                [wordId]: newProgress
              },
              points: state.progress.points + 10 // Bonus points for mastering
            }
          };
        }
        
        return {
          progress: {
            ...state.progress,
            wordsInProgress: {
              ...state.progress.wordsInProgress,
              [wordId]: newProgress
            },
            points: state.progress.points + (isCorrect ? 2 : 0)
          }
        };
      }),
      
      addPoints: (points) => set((state) => {
        const newPoints = state.progress.points + points;
        const newLevel = Math.floor(newPoints / 100) + 1; // Level up every 100 points
        
        return {
          progress: {
            ...state.progress,
            points: newPoints,
            level: newLevel
          }
        };
      }),
      
      checkAndUpdateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastPlayed = state.progress.lastPlayed;
        
        // If first time playing or played on a different day
        if (!lastPlayed || lastPlayed !== today) {
          // Check if the last day played was yesterday
          if (lastPlayed) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split('T')[0];
            
            if (lastPlayed === yesterdayString) {
              // Streak continues
              return {
                progress: {
                  ...state.progress,
                  streakDays: state.progress.streakDays + 1,
                  lastPlayed: today
                }
              };
            }
          }
          
          // Streak reset or first day
          return {
            progress: {
              ...state.progress,
              streakDays: 1,
              lastPlayed: today
            }
          };
        }
        
        // Same day, no change to streak
        return { progress: state.progress };
      }),
      
      isOfflineMode: false,
      toggleOfflineMode: () => set((state) => ({ isOfflineMode: !state.isOfflineMode })),
    }),
    {
      name: 'spelling-saga-game-storage',
    }
  )
);

