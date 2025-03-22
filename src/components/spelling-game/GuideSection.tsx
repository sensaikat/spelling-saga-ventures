
import React from 'react';
import { TerrainType } from '../../contexts/adventure/types';
import { GuideCharacter } from '../guide';

export interface GuideSectionProps {
  isAdventure: boolean;
  terrain: TerrainType;
  showGuide?: boolean;
}

const GuideSection: React.FC<GuideSectionProps> = ({ 
  isAdventure, 
  terrain,
  showGuide = true
}) => {
  if (!showGuide) {
    return null;
  }

  return (
    <div className="mb-4">
      <GuideCharacter
        terrain={terrain}
        isAdventure={isAdventure}
        proactiveMessage={
          isAdventure
            ? "Type the word correctly to continue your adventure!"
            : "Ready to practice some spelling? I'm here to help!"
        }
      />
    </div>
  );
};

export default GuideSection;
