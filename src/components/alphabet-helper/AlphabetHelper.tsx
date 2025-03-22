
import React, { useState, useEffect } from 'react';
import { AlphabetHelperProps } from './types';
import { getLanguageAlphabet, getCategoryLabel, getEnglishCategoryLabel } from './utils';
import CharacterGrid from './CharacterGrid';
import { Volume2 } from 'lucide-react';

const AlphabetHelper: React.FC<AlphabetHelperProps> = ({ 
  languageId, 
  onCharacterClick,
  onPronounce 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [alphabet, setAlphabet] = useState<Record<string, string[]>>({});
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const languageAlphabet = getLanguageAlphabet(languageId);
    if (languageAlphabet) {
      setAlphabet(languageAlphabet);
      const cats = Object.keys(languageAlphabet);
      setCategories(cats);
      
      // Default to a useful category based on script
      // For Indic scripts, 'Matras' or 'Consonants' are often more useful than 'Vowels'
      if (cats.includes('Matras') || cats.includes('Vowel Marks')) {
        setSelectedCategory(cats.includes('Matras') ? 'Matras' : 'Vowel Marks');
      } else if (cats.includes('Consonants')) {
        setSelectedCategory('Consonants');
      } else {
        setSelectedCategory(cats[0]);
      }
    }
  }, [languageId]);

  const handlePronounceCategory = (category: string) => {
    if (onPronounce) {
      onPronounce(getCategoryLabel(languageId, category));
    }
  };

  if (!alphabet || Object.keys(alphabet).length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
      <div className="mb-3 flex flex-wrap gap-1">
        {categories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedCategory(category)}
            title={`${getEnglishCategoryLabel(category)} - ${getCategoryLabel(languageId, category)}`}
          >
            <span className="flex items-center">
              {getEnglishCategoryLabel(category)}
              {' '}
              <span className="text-xs ml-1 opacity-75">
                ({getCategoryLabel(languageId, category)})
              </span>
              <button 
                className="ml-1 p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePronounceCategory(category);
                }}
                aria-label={`Pronounce ${getCategoryLabel(languageId, category)}`}
              >
                <Volume2 size={12} />
              </button>
            </span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <>
          <h3 className="text-sm text-gray-500 mb-2 font-medium flex items-center">
            <span>{getEnglishCategoryLabel(selectedCategory)}</span>
            <span className="mx-2">-</span>
            <span>{getCategoryLabel(languageId, selectedCategory)}</span>
            <button 
              className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => handlePronounceCategory(selectedCategory)}
              aria-label={`Pronounce ${getCategoryLabel(languageId, selectedCategory)}`}
            >
              <Volume2 size={14} />
            </button>
          </h3>
          <CharacterGrid 
            characters={alphabet[selectedCategory] || []} 
            onCharacterClick={onCharacterClick}
            onPronounce={onPronounce}
            languageId={languageId}
          />
        </>
      )}
    </div>
  );
};

export default AlphabetHelper;
