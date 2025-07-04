
import { AlphabetData, ScriptCategoryLabels, ScriptGroups } from './types';

// Alphabet data for different scripts
export const alphabetData: Record<string, AlphabetData> = {
  devanagari: {
    'Vowels': ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
    'Consonants': ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
    'Matras': ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः', '्'],
    'Half Forms': ['क्', 'ख्', 'ग्', 'घ्', 'च्', 'छ्', 'ज्', 'झ्', 'ट्', 'ठ्', 'ड्', 'ढ्', 'त्', 'थ्', 'द्', 'ध्', 'न्', 'प्', 'फ्', 'ब्', 'भ्', 'म्', 'य्', 'र्', 'ल्', 'व्', 'श्', 'ष्', 'स्', 'ह्'],
    'Common Conjuncts': ['क्ष', 'त्र', 'ज्ञ', 'श्र', 'द्व', 'द्य', 'द्ध'],
    'Numbers': ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  },
  bengali: {
    'Vowels': ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'],
    'Consonants': ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়'],
    'Matras': ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', 'ঁ', 'ং', 'ঃ', '্'],
    'Common Conjuncts': ['ক্ষ', 'জ্ঞ', 'দ্ব', 'দ্ম', 'ন্ড', 'ন্ধ', 'ন্ত', 'প্ত', 'শ্চ', 'শ্র', 'ষ্ট', 'স্ক', 'স্ট', 'স্ত', 'স্থ'],
    'Numbers': ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  },
  arabic: {
    'Letters': ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],
    'Positional Forms': ['ـا', 'ـب', 'ـت', 'ـث', 'ـج', 'ـح', 'ـخ', 'ـد', 'ـذ', 'ـر', 'ـز', 'ـس', 'ـش', 'ـص', 'ـض', 'ـط', 'ـظ', 'ـع', 'ـغ', 'ـف', 'ـق', 'ـك', 'ـل', 'ـم', 'ـن', 'ـه', 'ـو', 'ـي'],
    'Diacritics': ['َ', 'ِ', 'ُ', 'ً', 'ٍ', 'ٌ', 'ّ', 'ْ', 'ـَ', 'ـِ', 'ـُ', 'ـّ', 'ـْ', 'ـٰ', 'ـٖ'],
    'Common Ligatures': ['لا', 'لآ', 'لأ', 'لإ', 'ﷲ'],
    'Numbers': ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
  },
  chinese: {
    'Common': ['的', '一', '是', '不', '了', '在', '人', '有', '我', '他', '这', '个', '们', '中', '来', '上', '大', '为', '和', '国', '地', '到', '以', '说', '时', '要', '就', '出', '会', '可', '也', '你', '对', '生', '能', '而', '子', '那', '得', '于', '着', '下', '自', '之', '年'],
    'Numbers': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿', '零'],
    'Basics': ['我', '你', '他', '她', '它', '们', '好', '谢谢', '请', '是', '否', '吃', '喝', '看', '听', '说', '读', '写', '去', '来', '做', '买', '卖', '家', '学校', '工作']
  },
  oriya: {
    'Vowels': ['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଋ', 'ଏ', 'ଐ', 'ଓ', 'ଔ'],
    'Consonants': ['କ', 'ଖ', 'ଗ', 'ଘ', 'ଙ', 'ଚ', 'ଛ', 'ଜ', 'ଝ', 'ଞ', 'ଟ', 'ଠ', 'ଡ', 'ଢ', 'ଣ', 'ତ', 'ଥ', 'ଦ', 'ଧ', 'ନ', 'ପ', 'ଫ', 'ବ', 'ଭ', 'ମ', 'ଯ', 'ର', 'ଲ', 'ଵ', 'ଶ', 'ଷ', 'ସ', 'ହ', 'ଳ'],
    'Matras': ['ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'ୃ', 'େ', 'ୈ', 'ୋ', 'ୌ', 'ଂ', 'ଃ', '୍'],
    'Common Conjuncts': ['କ୍ଷ', 'ଜ୍ଞ', 'ଦ୍ଧ', 'ନ୍ଦ', 'ନ୍ଧ', 'ଶ୍ଚ', 'ଶ୍ର', 'ଷ୍ଟ', 'ସ୍ତ'],
    'Numbers': ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
  },
  tamil: {
    'Vowels': ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],
    'Consonants': ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'],
    'Vowel Marks': ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', '்'],
    'Combined': ['கா', 'கி', 'கீ', 'கு', 'கூ', 'கெ', 'கே', 'கை', 'கொ', 'கோ', 'கௌ'],
    'Numbers': ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯', '௰', '௱', '௲'],
  },
  telugu: {
    'Vowels': ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ఌ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ'],
    'Consonants': ['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'],
    'Matras': ['ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ం', 'ః', '్'],
    'Numbers': ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  },
  assamese: {
    'Vowels': ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'],
    'Consonants': ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'ৰ', 'ল', 'ৱ', 'শ', 'ষ', 'স', 'হ', 'ক্ষ'],
    'Matras': ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', 'ঁ', 'ং', 'ঃ', '্'],
    'Numbers': ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  },
  sinhalese: {
    'Vowels': ['අ', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'ඍ', 'ඎ', 'ඏ', 'ඐ', 'එ', 'ඒ', 'ඓ', 'ඔ', 'ඕ', 'ඖ'],
    'Consonants': ['ක', 'ඛ', 'ග', 'ඝ', 'ඞ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ඣ', 'ඤ', 'ඥ', 'ඦ', 'ට', 'ඨ', 'ඩ', 'ඪ', 'ණ', 'ඬ', 'ත', 'ථ', 'ද', 'ධ', 'න', 'ඳ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ව', 'ශ', 'ෂ', 'ස', 'හ', 'ළ', 'ෆ'],
    'Matras': ['ා', 'ැ', 'ෑ', 'ි', 'ී', 'ු', 'ූ', 'ෘ', 'ෙ', 'ේ', 'ෛ', 'ො', 'ෝ', 'ෞ', 'ං', 'ඃ', '්'],
    'Numbers': ['෦', '෧', '෨', '෩', '෪', '෫', '෬', '෭', '෮', '෯'],
  },
  gujarati: {
    'Vowels': ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'ૠ', 'ઌ', 'ૡ', 'એ', 'ઐ', 'ઓ', 'ઔ'],
    'Consonants': ['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ'],
    'Matras': ['ા', 'િ', 'ી', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૅ', 'ે', 'ૈ', 'ૉ', 'ો', 'ૌ', 'ં', 'ઃ', '્'],
    'Numbers': ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  },
  latin: {
    'Letters': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    'Numbers': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'German Special': ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'],
    'French Special': ['é', 'è', 'ê', 'ë', 'à', 'â', 'î', 'ï', 'ô', 'ù', 'û', 'ç', 'œ', 'æ', 'É', 'È', 'Ê', 'Ë', 'À', 'Â', 'Î', 'Ï', 'Ô', 'Ù', 'Û', 'Ç', 'Œ', 'Æ'],
    'Spanish Special': ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'Ü'],
    'Polish Special': ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż', 'Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
    'Romanian Special': ['ă', 'â', 'î', 'ș', 'ț', 'Ă', 'Â', 'Î', 'Ș', 'Ț'],
  },
  pashto: {
    'Letters': ['ا', 'ب', 'پ', 'ت', 'ټ', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ډ', 'ذ', 'ر', 'ړ', 'ز', 'ژ', 'ږ', 'س', 'ش', 'ښ', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'ګ', 'ل', 'م', 'ن', 'ڼ', 'و', 'ه', 'ی', 'ې', 'ۍ', 'ئ'],
    'Diacritics': ['َ', 'ِ', 'ُ', 'ً', 'ٍ', 'ٌ', 'ّ', 'ْ', 'ٰ'],
    'Positional Forms': ['ـا', 'ـب', 'ـپ', 'ـت', 'ـټ', 'ـث', 'ـج', 'ـچ', 'ـح', 'ـخ', 'ـد', 'ـډ', 'ـذ', 'ـر', 'ـړ', 'ـز', 'ـژ', 'ـږ', 'ـس', 'ـش', 'ـښ', 'ـص', 'ـض', 'ـط', 'ـظ', 'ـع', 'ـغ', 'ـف', 'ـق', 'ـک', 'ـګ', 'ـل', 'ـم', 'ـن', 'ـڼ', 'ـو', 'ـه', 'ـی', 'ـې', 'ـۍ', 'ـئ'],
    'Numbers': ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  },
};

// Category labels in different languages
export const scriptCategoryLabels: ScriptCategoryLabels = {
  devanagari: {
    'Vowels': 'स्वर',
    'Consonants': 'व्यंजन',
    'Matras': 'मात्राएँ',
    'Half Forms': 'आधे अक्षर',
    'Common Conjuncts': 'संयुक्त अक्षर',
    'Numbers': 'अंक',
  },
  bengali: {
    'Vowels': 'স্বরবর্ণ',
    'Consonants': 'ব্যঞ্জনবর্ণ',
    'Matras': 'কার চিহ্ন',
    'Common Conjuncts': 'যুক্তাক্ষর',
    'Numbers': 'সংখ্যা',
  },
  arabic: {
    'Letters': 'حروف',
    'Positional Forms': 'أشكال الحروف',
    'Diacritics': 'علامات التشكيل',
    'Common Ligatures': 'تشكيلات شائعة',
    'Numbers': 'أرقام',
  },
  chinese: {
    'Common': '常用',
    'Numbers': '数字',
    'Basics': '基础',
  },
  oriya: {
    'Vowels': 'ସ୍ଵର',
    'Consonants': 'ବ୍ୟଞ୍ଜନ',
    'Matras': 'ମାତ୍ରା',
    'Common Conjuncts': 'ଯୁକ୍ତାକ୍ଷର',
    'Numbers': 'ସଂଖ୍ୟା',
  },
  tamil: {
    'Vowels': 'உயிரெழுத்து',
    'Consonants': 'மெய்யெழுத்து',
    'Vowel Marks': 'உயிர்மெய் குறிகள்',
    'Combined': 'உயிர்மெய் எழுத்துகள்',
    'Numbers': 'எண்கள்',
  },
  telugu: {
    'Vowels': 'అచ్చులు',
    'Consonants': 'హల్లులు',
    'Matras': 'గుణింతాలు',
    'Numbers': 'సంఖ్యలు',
  },
  assamese: {
    'Vowels': 'স্বৰবৰ্ণ',
    'Consonants': 'ব্যঞ্জনবৰ্ণ',
    'Matras': 'মাত্ৰা',
    'Numbers': 'সংখ্যা',
  },
  sinhalese: {
    'Vowels': 'ස්වර',
    'Consonants': 'ව්යඤ්ජන',
    'Matras': 'පිලි',
    'Numbers': 'අංක',
  },
  gujarati: {
    'Vowels': 'સ્વર',
    'Consonants': 'વ્યંજન',
    'Matras': 'માત્રા',
    'Numbers': 'અંક',
  },
  latin: {
    'Letters': 'Letters',
    'Numbers': 'Numbers',
    'German Special': 'Deutsche Sonderzeichen',
    'French Special': 'Caractères spéciaux français',
    'Spanish Special': 'Caracteres especiales españoles',
    'Polish Special': 'Polskie znaki specjalne',
    'Romanian Special': 'Caractere speciale românești',
  },
  pashto: {
    'Letters': 'توري',
    'Diacritics': 'اعراب',
    'Positional Forms': 'شکلونه',
    'Numbers': 'اعداد',
  },
};

// Language to script group mapping
export const scriptGroups: ScriptGroups = {
  devanagari: ['hi', 'mr', 'ne', 'sa', 'doi'],
  bengali: ['bn'],
  arabic: ['ar', 'ur'],
  chinese: ['zh'],
  oriya: ['or'],
  tamil: ['ta'],
  telugu: ['te'],
  assamese: ['as'],
  sinhalese: ['si'],
  gujarati: ['gu'],
  latin: ['en', 'es', 'fr', 'de', 'pl', 'ro', 'fil'],
  pashto: ['ps'],
};
