
import React from 'react';
import { motion } from 'framer-motion';
import { TerrainType } from '../../contexts/adventure/types';
import { terrainCompanions } from './TerrainBackground';
import { 
  Trees, 
  Building, 
  Mountain, 
  Sun, 
  Waves, 
  Rocket 
} from 'lucide-react';
import { useGameStore } from '../../utils/game';
import TranslatedWord from './TranslatedWord';
import { vocabularyTranslations } from '../../utils/translations/vocabularyTranslations';

interface MissionInfoProps {
  description: string;
  challengeDescription: string;
  terrain: TerrainType;
}

const MissionInfo: React.FC<MissionInfoProps> = ({
  description,
  challengeDescription,
  terrain
}) => {
  const companion = terrainCompanions[terrain];
  const { selectedLanguage } = useGameStore();
  
  // Cultural insights based on terrain type with added emphasis on heritage
  const culturalInsight = React.useMemo(() => {
    switch(terrain) {
      case 'forest':
        return "Forests are often sacred places in many cultures, with unique folklore and traditions associated with woodland spirits and tree species.";
      case 'desert':
        return "Desert communities have developed ingenious ways to survive harsh conditions, creating rich cultural traditions and unique architecture adapted to the environment.";
      case 'river':
        return "Rivers are the lifeblood of civilizations, often giving rise to important cities, heritage bridges, and unique water-based transportation systems.";
      case 'mountain':
        return "Mountain communities often preserve ancient traditions, crafts, and architectural styles that showcase their adaptation to high-altitude environments.";
      case 'castle':
        return "Historical buildings like castles, temples, and palaces reflect local cultural heritage through their architectural styles and construction techniques.";
      case 'space':
        return "Even in our imagined future among the stars, we carry our cultural heritage with us through traditional stories, art, and celebrations.";
      default:
        return "";
    }
  }, [terrain]);
  
  // Cultural icon for each terrain type
  const getTerrainIcon = () => {
    switch(terrain) {
      case 'forest': return <Trees className="text-green-600" />;
      case 'desert': return <Sun className="text-amber-500" />;
      case 'river': return <Waves className="text-blue-500" />;
      case 'mountain': return <Mountain className="text-slate-600" />;
      case 'castle': return <Building className="text-stone-600" />;
      case 'space': return <Rocket className="text-purple-600" />;
      default: return <Trees className="text-green-600" />;
    }
  };
  
  // Process description to wrap key vocabulary words in TranslatedWord components
  const processDescription = (text: string) => {
    const keyWordsRegex = new RegExp(
      Object.keys(vocabularyTranslations).join('|'), 
      'gi'
    );
    
    // Split the text based on matches
    const parts = text.split(keyWordsRegex);
    const matches = text.match(keyWordsRegex) || [];
    
    // Interleave the parts with TranslatedWord components
    return parts.reduce((result, part, index) => {
      result.push(part);
      if (index < matches.length) {
        const match = matches[index].toLowerCase();
        if (vocabularyTranslations[match]) {
          result.push(
            <TranslatedWord 
              key={`${match}-${index}`}
              word={matches[index]} 
              translations={vocabularyTranslations[match]}
              language={selectedLanguage}
            />
          );
        } else {
          result.push(matches[index]);
        }
      }
      return result;
    }, [] as React.ReactNode[]);
  };
  
  return (
    <>
      <p className="mb-4 text-gray-700">{processDescription(description)}</p>
      
      {culturalInsight && (
        <motion.div
          className="mb-4 text-sm bg-white/40 p-3 rounded-lg border border-white/20 text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <span className="text-lg mr-2 flex items-center">
              <span className="mr-1">💫</span>
              {getTerrainIcon()}
            </span>
            <p>{processDescription(culturalInsight)}</p>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="italic text-gray-700 bg-white/50 p-4 rounded-lg border border-white/30"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start">
          <span className="text-2xl mr-3 mt-1">{companion}</span>
          <div>
            <p className="font-medium mb-1">Your mission:</p>
            <p>{processDescription(challengeDescription)}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MissionInfo;
