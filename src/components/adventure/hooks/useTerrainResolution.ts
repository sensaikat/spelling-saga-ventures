
import { useResolutionContext } from '../../../contexts/resolution/ResolutionContext';

type AnimationIntensity = 'minimal' | 'moderate' | 'standard' | 'full';

interface TerrainResolutionSettings {
  layerCount: number;
  animationIntensity: AnimationIntensity;
}

export const useTerrainResolution = (): TerrainResolutionSettings => {
  const { resolutionTier, isMobile } = useResolutionContext();
  
  const getLayerCount = (): number => {
    if (isMobile) return 2; // Mobile gets simplified backgrounds
    
    switch (resolutionTier) {
      case 'low': return 2;
      case 'medium': return 3;
      case 'high': 
      case 'ultra': return 4;
      default: return 3;
    }
  };
  
  const getAnimationIntensity = (): AnimationIntensity => {
    switch (resolutionTier) {
      case 'low': return 'minimal';
      case 'medium': return 'moderate';
      case 'high': return 'standard';
      case 'ultra': return 'full';
      default: return 'moderate';
    }
  };
  
  return {
    layerCount: getLayerCount(),
    animationIntensity: getAnimationIntensity()
  };
};
