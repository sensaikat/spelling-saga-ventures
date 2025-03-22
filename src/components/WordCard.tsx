import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '../utils/game';
import { Volume, HelpCircle } from 'lucide-react';

interface WordCardProps {
  word: Word;
  revealed?: boolean;
  onClick?: () => void;
  onSpeakClick?: () => void;
  onHintClick?: () => void;
  showHint?: boolean;
  className?: string;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  revealed = true,
  onClick,
  onSpeakClick,
  onHintClick,
  showHint = false,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!revealed) {
      setIsFlipped(!isFlipped);
    }
    if (onClick) onClick();
  };

  const handleSpeakClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSpeakClick) onSpeakClick();
  };

  const handleHintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onHintClick) onHintClick();
  };

  const defaultImages: Record<string, string> = {
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
    
    'manzana': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'plátano': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'gato': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'perro': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'elefante': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'flor': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    'jirafa': 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600',
    'casa': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600',
    
    'paella': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600',
    'tacos': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600',
    'tortilla': 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?q=80&w=600',
    'churros': 'https://images.unsplash.com/photo-1624471437289-d6282b950ceb?q=80&w=600',
    'empanada': 'https://images.unsplash.com/photo-1604127087553-92a49100ab1b?q=80&w=600',
    'tamales': 'https://images.unsplash.com/photo-1611626007708-0b5d9de92bfb?q=80&w=600',
    
    'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600',
    'andes': 'https://images.unsplash.com/photo-1531170150093-a8f9d3244c75?q=80&w=600',
    'méxico': 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=600',
    'amazonas': 'https://images.unsplash.com/photo-1628684308273-a01ab80df31e?q=80&w=600',
    'madrid': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600',
    
    'guitarra': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600',
    'flamenco': 'https://images.unsplash.com/photo-1504609813442-a9924e2e9353?q=80&w=600',
    'piñata': 'https://images.unsplash.com/photo-1608404862898-ca7de5c2eb4a?q=80&w=600',
    'siesta': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600',
    'mariachi': 'https://images.unsplash.com/photo-1518114433-d005a4a7e8e1?q=80&w=600',
    
    'सेब': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600',
    'केला': 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=600',
    'बिल्ली': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    'कुत्ता': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    'हाथी': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600',
    'फूल': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600',
    
    'समोसा': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600',
    'जलेबी': 'https://images.unsplash.com/photo-1589778655375-3a2269e8af5a?q=80&w=600',
    'पकोड़ा': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600',
    'दाल': 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=600',
    'चावल': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600',
    'रोटी': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600',
    'चाय': 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=600',
    
    'ताजमहल': 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600',
    'दिल्ली': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600',
    'गंगा': 'https://images.unsplash.com/photo-1589892893341-2ee193cbe80a?q=80&w=600',
    'हिमालय': 'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?q=80&w=600',
    'जयपुर': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600',
    
    'कृष्ण': 'https://images.unsplash.com/photo-1604608672516-f1b9fe9c0fba?q=80&w=600',
    'गणेश': 'https://images.unsplash.com/photo-1567591414240-e9c1adbe8458?q=80&w=600',
    'हनुमान': 'https://images.unsplash.com/photo-1621080497019-63218f425576?q=80&w=600',
    'पंचतंत्र': 'https://images.unsplash.com/photo-1595459650375-fbc120753aea?q=80&w=600',
    'राम': 'https://images.unsplash.com/photo-1618817111517-8df103117442?q=80&w=600',
  };

  const difficultyColor = 
    word.difficulty === 'easy' ? 'bg-game-green' : 
    word.difficulty === 'medium' ? 'bg-game-yellow' : 
    'bg-game-red';

  const imageUrl = word.image || defaultImages[word.text.toLowerCase()] || 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';

  return (
    <motion.div
      className={`relative game-card ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className={`flex justify-between items-start mb-2`}>
        <div className={`h-2 w-16 rounded-full ${difficultyColor} opacity-70`} />
        <div className="flex space-x-2">
          {onHintClick && (
            <motion.button
              className="text-gray-600 hover:text-game-yellow"
              onClick={handleHintClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Get a hint"
            >
              <HelpCircle size={20} />
            </motion.button>
          )}
          {onSpeakClick && (
            <motion.button
              className="text-gray-600 hover:text-game-blue"
              onClick={handleSpeakClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Listen to pronunciation"
            >
              <Volume size={20} />
            </motion.button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center h-40">
        <div className="mb-3 w-20 h-20 overflow-hidden rounded-md flex items-center justify-center bg-gray-50">
          <img 
            src={imageUrl} 
            alt={word.text} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=600';
            }}
          />
        </div>
        
        <h3 className="text-2xl font-medium text-center">
          {revealed ? word.text : '????????'}
        </h3>
        
        {showHint && word.hint && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm bg-yellow-50 text-gray-700 mt-2 p-2 rounded-md text-center border border-yellow-200"
          >
            {word.hint}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default WordCard;
