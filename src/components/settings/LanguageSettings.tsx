
import React, { useState, useEffect } from 'react';
import { Languages, Search, X } from 'lucide-react';
import { languages, useGameStore } from '../../utils/game';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { motion } from 'framer-motion';

const LanguageSettings = () => {
  const { selectedLanguage, selectLanguage } = useGameStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  
  useEffect(() => {
    if (searchQuery) {
      setFilteredLanguages(
        languages.filter(lang => 
          lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredLanguages(languages);
    }
  }, [searchQuery]);
  
  const handleLanguageChange = (langId: string) => {
    const language = languages.find(lang => lang.id === langId);
    if (language) {
      selectLanguage(language);
    }
  };

  // Group languages by regions
  const languageGroups = {
    'Asian': ['hi', 'zh', 'bn', 'ta', 'te', 'as', 'or', 'gu'],
    'European': ['en', 'es', 'fr', 'pl', 'de', 'ro', 'ru'],
    'Middle Eastern': ['ar', 'ur', 'ps'],
    'South East Asian': ['fil', 'si'],
    'Free Tier': ['en', 'es', 'fr', 'bn', 'ta', 'pl', 'ar', 'fil']
  };
  
  return (
    <motion.div 
      className="glass-panel p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Languages size={20} className="text-game-blue" />
        <h3 className="text-xl font-medium">Language Settings</h3>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Select your learning language
        </label>
        
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-game-blue"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {searchQuery ? (
          <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
            {filteredLanguages.length === 0 ? (
              <div className="p-3 text-center text-gray-500">
                No languages found
              </div>
            ) : (
              filteredLanguages.map(lang => (
                <div 
                  key={lang.id}
                  className={`p-3 flex items-center hover:bg-gray-50 cursor-pointer ${selectedLanguage?.id === lang.id ? 'bg-blue-50 border-l-4 border-game-blue' : ''}`}
                  onClick={() => handleLanguageChange(lang.id)}
                >
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-sm text-gray-500">{lang.nativeName}</div>
                  </div>
                  {languageGroups['Free Tier'].includes(lang.id) && (
                    <span className="ml-auto text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                      Free
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <Select 
            value={selectedLanguage?.id || ''}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Free Tier Languages</SelectLabel>
                {languages
                  .filter(lang => languageGroups['Free Tier'].includes(lang.id))
                  .map(lang => (
                    <SelectItem key={lang.id} value={lang.id}>
                      <div className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name} ({lang.nativeName})
                      </div>
                    </SelectItem>
                  ))
                }
              </SelectGroup>
              {Object.entries(languageGroups)
                .filter(([group]) => group !== 'Free Tier')
                .map(([group, ids]) => (
                  <SelectGroup key={group}>
                    <SelectLabel>{group}</SelectLabel>
                    {languages
                      .filter(lang => ids.includes(lang.id))
                      .map(lang => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center">
                            <span className="mr-2">{lang.flag}</span>
                            {lang.name} ({lang.nativeName})
                          </div>
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {languages
          .filter(lang => languageGroups['Free Tier'].includes(lang.id))
          .slice(0, 5)
          .map(lang => (
            <button
              key={lang.id}
              className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1 ${
                selectedLanguage?.id === lang.id 
                  ? 'bg-game-blue text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleLanguageChange(lang.id)}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700">
          + More
        </button>
      </div>
    </motion.div>
  );
};

export default LanguageSettings;
