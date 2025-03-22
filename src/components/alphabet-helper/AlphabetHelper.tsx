
import React, { useState, useEffect } from 'react';
import { AlphabetHelperProps } from './types';
import { getLanguageAlphabet, getCategoryLabel } from './utils';
import CharacterGrid from './CharacterGrid';

const AlphabetHelper: React.FC<AlphabetHelperProps> = ({ 
  languageId, 
  onCharacterClick 
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
            title={getCategoryLabel(languageId, category)}
          >
            {getCategoryLabel(languageId, category)}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <>
          <h3 className="text-sm text-gray-500 mb-2 font-medium">
            {getCategoryLabel(languageId, selectedCategory)}
          </h3>
          <CharacterGrid 
            characters={alphabet[selectedCategory] || []} 
            onCharacterClick={onCharacterClick} 
          />
        </>
      )}
    </div>
  );
};

export default AlphabetHelper;
