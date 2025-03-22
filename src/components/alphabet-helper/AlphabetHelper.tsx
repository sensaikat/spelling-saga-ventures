
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { alphabets } from './alphabetData';
import { getCategoryLabels } from './utils';
import CharacterGrid from './CharacterGrid';
import { AlphabetHelperProps } from './types';

const AlphabetHelper: React.FC<AlphabetHelperProps> = ({ 
  languageId, 
  onCharacterClick 
}) => {
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
            <CharacterGrid 
              characters={langAlphabet[category]} 
              onCharacterClick={onCharacterClick} 
            />
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
