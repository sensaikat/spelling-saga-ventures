import { useState, useEffect } from 'react';

export type ResolutionTier = 'low' | 'medium' | 'high' | 'ultra';
export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';

interface ResolutionState {
  deviceType: DeviceType;
  resolutionTier: ResolutionTier;
  width: number;
  height: number;
  aspectRatio: number;
  pixelRatio: number;
}

// Device breakpoints
const DEVICE_BREAKPOINTS = {
  mobile: 640,  // Up to 640px width
  tablet: 1024, // 641px to 1024px
  laptop: 1440, // 1025px to 1440px
  desktop: 999999 // Anything larger
};

// Settings for different resolution tiers
export const RESOLUTION_SETTINGS = {
  low: {
    particleMultiplier: 0.5,
    shadowQuality: 'off',
    textureQuality: 'low',
    effectsLevel: 'minimal',
    animationDetail: 'reduced',
  },
  medium: {
    particleMultiplier: 1,
    shadowQuality: 'soft',
    textureQuality: 'medium',
    effectsLevel: 'standard',
    animationDetail: 'standard',
  },
  high: {
    particleMultiplier: 1.5,
    shadowQuality: 'sharp',
    textureQuality: 'high',
    effectsLevel: 'enhanced',
    animationDetail: 'detailed',
  },
  ultra: {
    particleMultiplier: 2,
    shadowQuality: 'ultra',
    textureQuality: 'ultra',
    effectsLevel: 'maximum',
    animationDetail: 'complex',
  }
};

// Default resolution tiers based on device type
const DEFAULT_DEVICE_RESOLUTIONS: Record<DeviceType, ResolutionTier> = {
  mobile: 'low',
  tablet: 'medium',
  laptop: 'high',
  desktop: 'ultra'
};

// Gets device type based on screen width
const getDeviceType = (width: number): DeviceType => {
  if (width <= DEVICE_BREAKPOINTS.mobile) return 'mobile';
  if (width <= DEVICE_BREAKPOINTS.tablet) return 'tablet';
  if (width <= DEVICE_BREAKPOINTS.laptop) return 'laptop';
  return 'desktop';
};

// Get the optimal resolution tier for the current device
const getOptimalResolutionTier = (deviceType: DeviceType, pixelRatio: number): ResolutionTier => {
  // Start with the default resolution for the device type
  let tier = DEFAULT_DEVICE_RESOLUTIONS[deviceType];
  
  // Adjust based on pixel ratio (high DPI screens)
  if (pixelRatio >= 2) {
    // For high DPI screens, we might want to increase quality for sharper display
    // But we also need to balance performance, especially on mobile
    if (deviceType === 'mobile' && tier === 'low') {
      // Keep mobile at low if that's the default
      return tier;
    } else if (tier !== 'ultra') {
      // Increase tier for high DPI screens on other devices
      const tiers: ResolutionTier[] = ['low', 'medium', 'high', 'ultra'];
      const currentIndex = tiers.indexOf(tier);
      return tiers[Math.min(currentIndex + 1, tiers.length - 1)];
    }
  }
  
  // Adjust down if performance is likely to be an issue
  if (deviceType === 'mobile' && pixelRatio < 1.5) {
    return 'low'; // Ensure older mobile devices use low settings
  }
  
  return tier;
};

export function useResolution(
  userPreferredTier?: ResolutionTier
): ResolutionState & { setResolutionTier: (tier: ResolutionTier) => void } {
  // Initialize with default values
  const [state, setState] = useState<ResolutionState>({
    deviceType: 'laptop',
    resolutionTier: 'medium',
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    aspectRatio: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1.33,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  });

  // Update resolution when window is resized
  useEffect(() => {
    const updateResolution = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const deviceType = getDeviceType(width);
      const pixelRatio = window.devicePixelRatio || 1;
      
      setState({
        deviceType,
        // Use user preference if set, otherwise calculate optimal
        resolutionTier: userPreferredTier || getOptimalResolutionTier(deviceType, pixelRatio),
        width,
        height,
        aspectRatio: width / height,
        pixelRatio
      });
    };

    // Initial calculation
    updateResolution();

    // Listen for window resize
    window.addEventListener('resize', updateResolution);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updateResolution);
    };
  }, [userPreferredTier]);

  // Allow manual setting of resolution tier
  const setResolutionTier = (tier: ResolutionTier) => {
    setState(prev => ({
      ...prev,
      resolutionTier: tier
    }));
  };

  return {
    ...state,
    setResolutionTier
  };
}
