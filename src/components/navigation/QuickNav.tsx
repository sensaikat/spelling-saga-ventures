
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Gamepad, MapIcon, Book, Settings, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../utils/game';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface QuickNavProps {
  className?: string;
  showLabels?: boolean;
}

const QuickNav: React.FC<QuickNavProps> = ({ className = '', showLabels = false }) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useGameStore();
  const [showDualLanguage, setShowDualLanguage] = useState(false);
  
  // Labels in English and current selected language (if available)
  const labels = {
    home: {
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
      zh: "首页",
      hi: "होम",
      ar: "الرئيسية"
    },
    games: {
      en: "Games",
      es: "Juegos",
      fr: "Jeux",
      zh: "游戏",
      hi: "खेल",
      ar: "ألعاب"
    },
    adventure: {
      en: "Adventure",
      es: "Aventura",
      fr: "Aventure",
      zh: "冒险",
      hi: "साहसिक",
      ar: "مغامرة"
    },
    progress: {
      en: "Progress",
      es: "Progreso",
      fr: "Progrès",
      zh: "进度",
      hi: "प्रगति",
      ar: "تقدم"
    },
    settings: {
      en: "Settings",
      es: "Ajustes",
      fr: "Paramètres",
      zh: "设置",
      hi: "सेटिंग्स",
      ar: "إعدادات"
    }
  };
  
  // Get label in selected language or fall back to English
  const getLabel = (key: keyof typeof labels) => {
    const languageCode = selectedLanguage?.id || 'en';
    return labels[key][languageCode as keyof (typeof labels)[typeof key]] || labels[key].en;
  };
  
  const toggleDualLanguage = () => {
    setShowDualLanguage(!showDualLanguage);
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              aria-label="Home"
            >
              <Home size={18} />
              {showLabels && (
                <span className="ml-2 hidden sm:inline-block">
                  {showDualLanguage ? (
                    <>
                      <span>Home</span>
                      {selectedLanguage && selectedLanguage.id !== 'en' && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {getLabel('home')}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <span>{getLabel('home')}</span>
                  )}
                </span>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{showDualLanguage ? "Home / " + getLabel('home') : getLabel('home')}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/game')}
              aria-label="Games"
            >
              <Gamepad size={18} />
              {showLabels && (
                <span className="ml-2 hidden sm:inline-block">
                  {showDualLanguage ? (
                    <>
                      <span>Games</span>
                      {selectedLanguage && selectedLanguage.id !== 'en' && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {getLabel('games')}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <span>{getLabel('games')}</span>
                  )}
                </span>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{showDualLanguage ? "Games / " + getLabel('games') : getLabel('games')}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/adventure')}
              aria-label="Adventure"
            >
              <MapIcon size={18} />
              {showLabels && (
                <span className="ml-2 hidden sm:inline-block">
                  {showDualLanguage ? (
                    <>
                      <span>Adventure</span>
                      {selectedLanguage && selectedLanguage.id !== 'en' && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {getLabel('adventure')}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <span>{getLabel('adventure')}</span>
                  )}
                </span>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{showDualLanguage ? "Adventure / " + getLabel('adventure') : getLabel('adventure')}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/progress')}
              aria-label="Progress"
            >
              <Book size={18} />
              {showLabels && (
                <span className="ml-2 hidden sm:inline-block">
                  {showDualLanguage ? (
                    <>
                      <span>Progress</span>
                      {selectedLanguage && selectedLanguage.id !== 'en' && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {getLabel('progress')}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <span>{getLabel('progress')}</span>
                  )}
                </span>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{showDualLanguage ? "Progress / " + getLabel('progress') : getLabel('progress')}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
              aria-label="Settings"
            >
              <Settings size={18} />
              {showLabels && (
                <span className="ml-2 hidden sm:inline-block">
                  {showDualLanguage ? (
                    <>
                      <span>Settings</span>
                      {selectedLanguage && selectedLanguage.id !== 'en' && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {getLabel('settings')}
                        </Badge>
                      )}
                    </>
                  ) : (
                    <span>{getLabel('settings')}</span>
                  )}
                </span>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{showDualLanguage ? "Settings / " + getLabel('settings') : getLabel('settings')}</p>
          </TooltipContent>
        </Tooltip>
        
        {selectedLanguage && selectedLanguage.id !== 'en' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md text-gray-700 hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDualLanguage}
                aria-label="Toggle dual language display"
              >
                <Languages size={18} />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{showDualLanguage ? "Show single language" : "Show dual language"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
};

export default QuickNav;
