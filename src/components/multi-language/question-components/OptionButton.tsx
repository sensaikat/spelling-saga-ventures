
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Word } from '../../../utils/game/types';
import { useSpeech } from '../hooks/useSpeech';

interface OptionButtonProps {
  option: Word;
  languageId: string;
  onSelect: (option: Word) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, languageId, onSelect }) => {
  const { speakWord, isSpeaking } = useSpeech();
  
  // Enhanced culturally relevant image mappings
  const defaultImages: Record<string, string> = {
    // English - Basic words and animals
    'apple': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'banana': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'dog': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'elephant': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'flower': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    'giraffe': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600',
    'house': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600',
    'tiger': 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=600',
    'penguin': 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=600',
    'zebra': 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?q=80&w=600',
    'kangaroo': 'https://images.unsplash.com/photo-1590668158521-3501fab07eaf?q=80&w=600',
    'dolphin': 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?q=80&w=600',
    'octopus': 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?q=80&w=600',
    
    // English - International food
    'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600',
    'sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600',
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600',
    'pasta': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600',
    'taco': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600',
    'curry': 'https://images.unsplash.com/photo-1631292721887-01c1a1b4a285?q=80&w=600',
    
    // English - Places
    'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600',
    'paris': 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=600',
    'tokyo': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600',
    'egypt': 'https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=600',
    'amazon': 'https://images.unsplash.com/photo-1535250721770-5e2417837c50?q=80&w=600',
    'africa': 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=600',
    
    // Spanish - Basic words
    'manzana': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'plátano': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'gato': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'perro': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'elefante': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'flor': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    'jirafa': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600',
    'casa': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600',
    
    // Spanish - Food (with authentic Spanish/Latin American cuisine)
    'paella': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600',
    'tacos': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600',
    'tortilla': 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?q=80&w=600',
    'churros': 'https://images.unsplash.com/photo-1624471437289-d6282b950ceb?q=80&w=600',
    'empanada': 'https://images.unsplash.com/photo-1604127087553-92a49100ab1b?q=80&w=600',
    'tamales': 'https://images.unsplash.com/photo-1611626007708-0b5d9de92bfb?q=80&w=600',
    
    // Spanish - Places
    'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600',
    'andes': 'https://images.unsplash.com/photo-1531170150093-a8f9d3244c75?q=80&w=600',
    'méxico': 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=600',
    'amazonas': 'https://images.unsplash.com/photo-1628684308273-a01ab80df31e?q=80&w=600',
    'madrid': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600',
    
    // Spanish - Culture
    'guitarra': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600',
    'flamenco': 'https://images.unsplash.com/photo-1504609813442-a9924e2e9353?q=80&w=600',
    'piñata': 'https://images.unsplash.com/photo-1608404862898-ca7de5c2eb4a?q=80&w=600',
    'siesta': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600',
    'mariachi': 'https://images.unsplash.com/photo-1518114433-d005a4a7e8e1?q=80&w=600',
    
    // Hindi - Basic words
    'सेब': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'केला': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'बिल्ली': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'कुत्ता': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'हाथी': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'फूल': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    
    // Hindi - Food (authentic Indian dishes)
    'समोसा': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600',
    'जलेबी': 'https://images.unsplash.com/photo-1589778655375-3a2269e8af5a?q=80&w=600',
    'पकोड़ा': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600',
    'दाल': 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=600',
    'चावल': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600',
    'रोटी': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600',
    'चाय': 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=600',
    
    // Hindi - Places
    'ताजमहल': 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600',
    'दिल्ली': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600',
    'गंगा': 'https://images.unsplash.com/photo-1589892893341-2ee193cbe80a?q=80&w=600',
    'हिमालय': 'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?q=80&w=600',
    'जयपुर': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600',
    
    // Hindi - Folklore and mythology
    'कृष्ण': 'https://images.unsplash.com/photo-1604608672516-f1b9fe9c0fba?q=80&w=600',
    'गणेश': 'https://images.unsplash.com/photo-1567591414240-e9c1adbe8458?q=80&w=600',
    'हनुमान': 'https://images.unsplash.com/photo-1621080497019-63218f425576?q=80&w=600',
    'पंचतंत्र': 'https://images.unsplash.com/photo-1595459650375-fbc120753aea?q=80&w=600',
    'राम': 'https://images.unsplash.com/photo-1618817111517-8df103117442?q=80&w=600',
  };
  
  // Use provided image or get from default mapping or use placeholder
  const imageUrl = option.image || defaultImages[option.text.toLowerCase()] || 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
  
  return (
    <motion.button
      className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-game-blue hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between min-h-[5rem]"
      onClick={() => onSelect(option)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-16 h-16 overflow-hidden rounded-md flex-shrink-0 mb-2 sm:mb-0 sm:mr-3">
        <img 
          src={imageUrl} 
          alt={option.text} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
          }}
        />
      </div>
      
      <div className="flex-1 sm:text-left text-center">
        <p className="text-lg font-medium">{option.text}</p>
        {option.hint && <p className="text-xs text-gray-500">{option.hint}</p>}
      </div>
      
      <button 
        className={`ml-2 p-1 rounded-full ${isSpeaking ? 'bg-game-blue/10 text-game-blue' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors`}
        onClick={(e) => {
          e.stopPropagation();
          speakWord(option.text, languageId);
        }}
        aria-label={`Pronounce ${option.text}`}
      >
        <Volume2 size={16} />
      </button>
    </motion.button>
  );
};

export default OptionButton;
