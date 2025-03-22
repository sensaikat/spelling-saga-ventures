
import { WordList } from '../types';

export const hindiWordLists: WordList[] = [
  {
    id: 'hi-basics',
    name: 'मूल शब्द',
    description: 'शुरुआती लोगों के लिए आम शब्द',
    words: [
      { id: 'hi-1', text: 'सेब', difficulty: 'easy', hint: 'एक लाल फल' },
      { id: 'hi-2', text: 'केला', difficulty: 'easy', hint: 'पीला फल' },
      { id: 'hi-3', text: 'बिल्ली', difficulty: 'easy', hint: 'एक घरेलु जानवर' },
      { id: 'hi-4', text: 'कुत्ता', difficulty: 'easy', hint: 'एक वफादार जानवर' },
      { id: 'hi-5', text: 'हाथी', difficulty: 'medium', hint: 'एक बड़ा जानवर' },
      { id: 'hi-6', text: 'फूल', difficulty: 'easy', hint: 'सुगंधित और सुंदर' },
    ],
    languageId: 'hi',
    difficulty: 'easy',
  },
  {
    id: 'hi-food',
    name: 'भारतीय व्यंजन',
    description: 'भारतीय खाना और व्यंजन के नाम',
    words: [
      { id: 'hi-food-1', text: 'समोसा', difficulty: 'easy', hint: 'तला हुआ नाश्ता' },
      { id: 'hi-food-2', text: 'जलेबी', difficulty: 'medium', hint: 'मीठी और घुमावदार मिठाई' },
      { id: 'hi-food-3', text: 'पकोड़ा', difficulty: 'medium', hint: 'बारिश में खाया जाता है' },
      { id: 'hi-food-4', text: 'दाल', difficulty: 'easy', hint: 'रोज खाई जाती है' },
      { id: 'hi-food-5', text: 'चावल', difficulty: 'easy', hint: 'सफेद दाने' },
      { id: 'hi-food-6', text: 'रोटी', difficulty: 'easy', hint: 'गेहूं से बनती है' },
      { id: 'hi-food-7', text: 'चाय', difficulty: 'easy', hint: 'गरम पेय पदार्थ' },
    ],
    languageId: 'hi',
    difficulty: 'easy',
  },
  {
    id: 'hi-places',
    name: 'भारतीय स्थान',
    description: 'भारत के प्रसिद्ध स्थान',
    words: [
      { id: 'hi-places-1', text: 'ताजमहल', difficulty: 'medium', hint: 'आगरा में स्थित है' },
      { id: 'hi-places-2', text: 'दिल्ली', difficulty: 'easy', hint: 'भारत की राजधानी' },
      { id: 'hi-places-3', text: 'गंगा', difficulty: 'easy', hint: 'पवित्र नदी' },
      { id: 'hi-places-4', text: 'हिमालय', difficulty: 'medium', hint: 'पर्वत श्रृंखला' },
      { id: 'hi-places-5', text: 'जयपुर', difficulty: 'medium', hint: 'गुलाबी शहर' },
    ],
    languageId: 'hi',
    difficulty: 'medium',
  },
  {
    id: 'hi-folklore',
    name: 'भारतीय लोककथाएँ',
    description: 'भारतीय लोककथाओं और पौराणिक कहानियों के पात्र',
    words: [
      { id: 'hi-folk-1', text: 'कृष्ण', difficulty: 'medium', hint: 'बांसुरी बजाते हैं' },
      { id: 'hi-folk-2', text: 'गणेश', difficulty: 'medium', hint: 'हाथी के सिर वाले देवता' },
      { id: 'hi-folk-3', text: 'हनुमान', difficulty: 'medium', hint: 'बलवान वानर देवता' },
      { id: 'hi-folk-4', text: 'पंचतंत्र', difficulty: 'hard', hint: 'जानवरों की कहानियां' },
      { id: 'hi-folk-5', text: 'राम', difficulty: 'easy', hint: 'अयोध्या के राजकुमार' },
    ],
    languageId: 'hi',
    difficulty: 'medium',
  }
];
