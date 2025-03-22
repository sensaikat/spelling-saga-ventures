
import React from 'react';
import CharacterButton from './CharacterButton';

interface CharacterGridProps {
  characters: string[];
  onCharacterClick: (char: string) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters, onCharacterClick }) => {
  // Determine optimal grid columns based on character type
  // For matras and diacritics that are usually smaller, use more columns
  const isSmallCharacterSet = characters.some(char => 
    // Check if this is a set of diacritical marks or small modifiers
    char.length === 1 && 
    (
      // Common diacritical marks and small characters
      ['ं', 'ः', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', '्', 'ঁ', 'ং', 'َ', 'ِ', 'ُ', 'ّ', 'ْ'].includes(char) || 
      // Unicode ranges for various combining marks
      (char.charCodeAt(0) >= 0x0300 && char.charCodeAt(0) <= 0x036F)
    )
  );

  // Use more columns for small characters
  const gridClass = isSmallCharacterSet 
    ? "grid grid-cols-10 gap-1 md:grid-cols-12 lg:grid-cols-16" 
    : "grid grid-cols-8 gap-1 md:grid-cols-10 lg:grid-cols-12";

  return (
    <div className={gridClass}>
      {characters.map((char, index) => (
        <CharacterButton 
          key={`${char}-${index}`} 
          character={char} 
          onClick={() => onCharacterClick(char)} 
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
