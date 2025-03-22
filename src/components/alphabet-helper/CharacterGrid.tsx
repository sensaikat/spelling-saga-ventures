
import React from 'react';
import CharacterButton from './CharacterButton';

interface CharacterGridProps {
  characters: string[];
  onCharacterClick: (char: string) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters, onCharacterClick }) => {
  return (
    <div className="grid grid-cols-8 gap-1 md:grid-cols-10 lg:grid-cols-12">
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
