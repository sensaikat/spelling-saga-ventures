
import React from 'react';
import { motion } from 'framer-motion';

// Language-specific alphabet mappings
const alphabets: Record<string, string[]> = {
  en: "abcdefghijklmnopqrstuvwxyz".split(''),
  es: "abcdefghijklmnñopqrstuvwxyz".split(''),
  fr: "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ".split(''),
  hi: "अ आ इ ई उ ऊ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह".split(' '),
  bn: "অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ড় ঢ় য় ৎ".split(' '),
  or: "ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଏ ଐ ଓ ଔ କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଳ ଶ ଷ ସ ହ କ୍ଷ ଜ୍ଞ".split(' '),
  ta: "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ஜ ஷ ஸ ஹ க்ஷ".split(' '),
  te: "అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష ఱ".split(' '),
  pl: "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".split(''),
  ar: "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي".split(' '),
  zh: "阿 巴 车 德 俄 佛 该 哈 伊 杰 卡 拉 马 娜 欧 帕 契 日 萨 特 乌 维 万 希 亚 子".split(' '), // Simplified set
};

interface AlphabetHelperProps {
  languageId: string;
  onCharacterClick: (char: string) => void;
}

const AlphabetHelper: React.FC<AlphabetHelperProps> = ({ languageId, onCharacterClick }) => {
  // Default to English if the language isn't supported
  const chars = alphabets[languageId] || alphabets.en;
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-1">
        {chars.map((char, index) => (
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
    </motion.div>
  );
};

export default AlphabetHelper;
