
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Language-specific alphabet mappings with expanded character sets
const alphabets: Record<string, Record<string, string[]>> = {
  en: {
    letters: "abcdefghijklmnopqrstuvwxyz".split(''),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  es: {
    letters: "abcdefghijklmnñopqrstuvwxyz".split(''),
    uppercase: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"¿¡()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  fr: {
    letters: "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ".split(''),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  hi: {
    letters: "अ आ इ ई उ ऊ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह".split(' '),
    vowelSigns: "ा ि ी ु ू े ै ो ौ ं ः ँ ॅ".split(' '),
    numbers: "० १ २ ३ ४ ५ ६ ७ ८ ९".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  bn: {
    letters: "অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ড় ঢ় য় ৎ".split(' '),
    vowelSigns: "া ি ী ু ূ ৃ ে ৈ ো ৌ ং ঃ ঁ".split(' '),
    numbers: "০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  or: {
    letters: "ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଏ ଐ ଓ ଔ କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଳ ଶ ଷ ସ ହ କ୍ଷ ଜ୍ଞ".split(' '),
    vowelSigns: "ା ି ୀ ୁ ୂ ୃ େ ୈ ୋ ୌ ଂ ଃ ଁ".split(' '),
    numbers: "୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  ta: {
    letters: "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ஜ ஷ ஸ ஹ க்ஷ".split(' '),
    vowelSigns: "ா ி ீ ு ூ ெ ே ை ொ ோ ௌ ஂ ஃ".split(' '),
    numbers: "௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  te: {
    letters: "అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష ఱ".split(' '),
    vowelSigns: "ా ి ీ ు ూ ృ ె ే ై ొ ో ౌ ం ః".split(' '),
    numbers: "౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  pl: {
    letters: "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split(''),
    uppercase: "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  ar: {
    letters: "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ء أ إ آ ؤ ئ ة".split(' '),
    diacritics: "َ ِ ُ ّ ْ ً ٍ ٌ".split(' '),
    numbers: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩".split(' '),
    punctuation: "، . ؟ ! : ؛ ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  zh: {
    common: "阿 巴 车 德 俄 佛 该 哈 伊 杰 卡 拉 马 娜 欧 帕 契 日 萨 特 乌 维 万 希 亚 子".split(' '),
    // Fixed the Chinese punctuation - proper escaping of quotes
    punctuation: "。 ， ？ ！ ： ； （ ） 【 】 、 · … — _ @ # ￥ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' '),
    numbers: "０ １ ２ ３ ４ ５ ６ ７ ８ ９ 0 1 2 3 4 5 6 7 8 9".split(' ')
  },
  ur: {
    letters: "ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ء ی ے".split(' '),
    diacritics: "َ ِ ُ ّ ْ ً ٍ ٌ".split(' '),
    numbers: "۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹".split(' '),
    punctuation: "، . ؟ ! : ؛ ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  pa: {
    letters: "ੳ ਅ ੲ ਸ ਹ ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ੜ ਸ਼ ਖ਼ ਗ਼ ਜ਼ ਫ਼ ਲ਼".split(' '),
    vowelSigns: "ਾ ਿ ੀ ੁ ੂ ੇ ੈ ੋ ੌ ੰ ਂ ਃ".split(' '),
    numbers: "੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  kn: {
    letters: "ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ".split(' '),
    vowelSigns: "ಾ ಿ ೀ ು ೂ ೃ ೆ ೇ ೈ ೊ ೋ ೌ ಂ ಃ".split(' '),
    numbers: "೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  ml: {
    letters: "അ ആ ഇ ഈ ഉ ഊ ഋ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ".split(' '),
    vowelSigns: "ാ ി ീ ു ൂ ൃ െ േ ൈ ൊ ോ ൌ ൗ ം ഃ".split(' '),
    numbers: "൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  ro: {
    letters: "aăâbcdefghiîjklmnopqrsștțuvwxyz".split(''),
    uppercase: "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  ru: {
    letters: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split(''),
    uppercase: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
};

// Map of categories by language group
const categoryLabels: Record<string, Record<string, string>> = {
  // Latin script languages
  latin: {
    letters: "Lowercase",
    uppercase: "Uppercase",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Devanagari script languages
  devanagari: {
    letters: "Letters",
    vowelSigns: "Vowel Signs",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Arabic script languages
  arabic: {
    letters: "Letters",
    diacritics: "Diacritics",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Chinese
  chinese: {
    common: "Common Characters",
    numbers: "Numbers",
    punctuation: "Punctuation"
  }
};

// Group languages by script type
const scriptGroups: Record<string, string[]> = {
  latin: ['en', 'es', 'fr', 'pl', 'ro', 'ru'],
  devanagari: ['hi', 'bn', 'or', 'ta', 'te', 'pa', 'kn', 'ml'],
  arabic: ['ar', 'ur'],
  chinese: ['zh']
};

// Get category labels for a language
const getCategoryLabels = (languageId: string): Record<string, string> => {
  for (const [script, languages] of Object.entries(scriptGroups)) {
    if (languages.includes(languageId)) {
      return categoryLabels[script];
    }
  }
  return categoryLabels.latin; // Default to latin
};

interface AlphabetHelperProps {
  languageId: string;
  onCharacterClick: (char: string) => void;
}

const AlphabetHelper: React.FC<AlphabetHelperProps> = ({ languageId, onCharacterClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('letters');
  
  // Default to English if the language isn't supported
  const langAlphabet = alphabets[languageId] || alphabets.en;
  const categories = Object.keys(langAlphabet);
  const labels = getCategoryLabels(languageId);
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue={categories[0]} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full mb-2" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
              {labels[category] || category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="flex flex-wrap justify-center gap-1">
              {langAlphabet[category].map((char, index) => (
                <motion.button
                  key={index}
                  onClick={() => onCharacterClick(char)}
                  className="min-w-8 h-8 flex items-center justify-center px-2 bg-white rounded border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-game-blue transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {char}
                </motion.button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-2 text-center text-xs text-gray-500">
        Click on any character to add it to your input
      </div>
    </motion.div>
  );
};

export default AlphabetHelper;
