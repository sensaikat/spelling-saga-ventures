import { WordList } from '../types';

export const hindiWordLists: WordList[] = [
  {
    id: 'hi-basics',
    name: 'मूल शब्द',
    description: 'शुरुआती लोगों के लिए आम शब्द',
    words: [
      { id: 'hi-1', text: 'सेब', difficulty: 'easy', hint: 'एक लाल फल', category: 'food' },
      { id: 'hi-2', text: 'केला', difficulty: 'easy', hint: 'पीला फल', category: 'food' },
      { id: 'hi-3', text: 'बिल्ली', difficulty: 'easy', hint: 'एक घरेलु जानवर', category: 'animal' },
      { id: 'hi-4', text: 'कुत्ता', difficulty: 'easy', hint: 'एक वफादार जानवर', category: 'animal' },
      { id: 'hi-5', text: 'हाथी', difficulty: 'medium', hint: 'एक बड़ा जानवर', category: 'animal' },
      { id: 'hi-6', text: 'फूल', difficulty: 'easy', hint: 'सुगंधित और सुंदर', category: 'plant' },
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
      { id: 'hi-places-6', text: 'हवा महल', difficulty: 'hard', hint: 'जयपुर का प्रसिद्ध स्मारक' },
      { id: 'hi-places-7', text: 'वाराणसी', difficulty: 'medium', hint: 'पवित्र नगरी' },
      { id: 'hi-places-8', text: 'खजुराहो', difficulty: 'hard', hint: 'प्राचीन मंदिरों का शहर' },
      { id: 'hi-places-9', text: 'अजंता', difficulty: 'hard', hint: 'प्राचीन गुफाएँ' },
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
      { id: 'hi-folk-2', text: 'गणेश', difficulty: 'medium', hint: 'ह���थी के सिर वाले देवता' },
      { id: 'hi-folk-3', text: 'हनुमान', difficulty: 'medium', hint: 'बलवान वानर देवता' },
      { id: 'hi-folk-4', text: 'पंचतंत्र', difficulty: 'hard', hint: 'जानवरों की कहानियां' },
      { id: 'hi-folk-5', text: 'राम', difficulty: 'easy', hint: 'अयोध्या के राजकुमार' },
    ],
    languageId: 'hi',
    difficulty: 'medium',
  },
  {
    id: 'hi-professions',
    name: 'पारंपरिक व्यवसाय',
    description: 'भारतीय पारंपरिक व्यवसाय और पेशे',
    words: [
      { id: 'hi-prof-1', text: 'कुम्हार', difficulty: 'medium', hint: 'मिट्टी के बर्तन बनाता है' },
      { id: 'hi-prof-2', text: 'सुनार', difficulty: 'medium', hint: 'सोने-चांदी के गहने बनाता है' },
      { id: 'hi-prof-3', text: 'लुहार', difficulty: 'hard', hint: 'लोहे का काम करता है' },
      { id: 'hi-prof-4', text: 'दर्जी', difficulty: 'medium', hint: 'कपड़े सिलता है' },
      { id: 'hi-prof-5', text: 'हलवाई', difficulty: 'medium', hint: 'मिठाई बनाता है' },
      { id: 'hi-prof-6', text: 'मोची', difficulty: 'hard', hint: 'जूते बनाता और मरम्मत करता है' },
      { id: 'hi-prof-7', text: 'मालाकार', difficulty: 'hard', hint: 'फूलों की माला बनाता है' },
    ],
    languageId: 'hi',
    difficulty: 'hard',
  },
  {
    id: 'hi-transport',
    name: 'परिवहन साधन',
    description: 'पारंपरिक और आधुनिक परिवहन के साधन',
    words: [
      { id: 'hi-trans-1', text: 'पालकी', difficulty: 'hard', hint: 'लोग उठाकर ले जाते थे' },
      { id: 'hi-trans-2', text: 'बैलगाड़ी', difficulty: 'medium', hint: 'बैलों द्वारा खींची जाती है' },
      { id: 'hi-trans-3', text: 'तांगा', difficulty: 'hard', hint: 'घोड़े वाला परिवहन' },
      { id: 'hi-trans-4', text: 'रिक्शा', difficulty: 'medium', hint: 'मनुष्य द्वारा खींचा जाता है' },
      { id: 'hi-trans-5', text: 'ऊंटगाड़ी', difficulty: 'hard', hint: 'रेगिस्तान में उपयोग' },
      { id: 'hi-trans-6', text: 'नाव', difficulty: 'easy', hint: 'जल परिवहन का साधन' },
    ],
    languageId: 'hi',
    difficulty: 'hard',
  },
  {
    id: 'hi-heroes',
    name: 'भारतीय महापुरुष',
    description: 'भारत के प्रसिद्ध नेता और महापुरुष',
    words: [
      { id: 'hi-hero-1', text: 'गांधी', difficulty: 'easy', hint: 'राष्ट्रपिता कहलाते हैं' },
      { id: 'hi-hero-2', text: 'नेहरू', difficulty: 'medium', hint: 'पहले प्रधानमंत्री' },
      { id: 'hi-hero-3', text: 'भगतसिंह', difficulty: 'medium', hint: 'क्रांतिकारी स्वतंत्रता सेनानी' },
      { id: 'hi-hero-4', text: 'शिवाजी', difficulty: 'medium', hint: 'मराठा साम्राज्य के संस्थापक' },
      { id: 'hi-hero-5', text: 'रानी लक्ष्मीबाई', difficulty: 'hard', hint: 'झांसी की रानी' },
      { id: 'hi-hero-6', text: 'टैगोर', difficulty: 'medium', hint: 'प्रसिद्ध कवि और नोबेल पुरस्कार विजेता' },
      { id: 'hi-hero-7', text: 'अशोक', difficulty: 'medium', hint: 'प्राचीन भारत के महान सम्राट' },
    ],
    languageId: 'hi',
    difficulty: 'medium',
  }
];
