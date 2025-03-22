
import React from 'react';
import { TerrainType } from '../../contexts/adventure/types';
import { terrainBackgrounds } from './constants/terrainData';
import TerrainElements from './background/TerrainElements';
import { useTerrainResolution } from './hooks/useTerrainResolution';

// Re-export terrainCompanions and terrainIcons for backward compatibility
export { terrainCompanions, terrainIcons } from './constants/terrainData';

interface TerrainBackgroundProps {
  terrain: TerrainType;
  children: React.ReactNode;
}

const TerrainBackground: React.FC<TerrainBackgroundProps> = ({ terrain, children }) => {
  const { animationIntensity } = useTerrainResolution();
  
  return (
    <div className={`min-h-screen ${terrainBackgrounds[terrain]} pt-6 pb-12 px-4 relative overflow-hidden`}>
      {/* 3D Parallax background elements */}
      <TerrainElements 
        terrain={terrain} 
        animationIntensity={animationIntensity} 
      />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default TerrainBackground;
