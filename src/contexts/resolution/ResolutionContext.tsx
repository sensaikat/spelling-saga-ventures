
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResolutionTier, useResolution } from '../../hooks/use-resolution';

interface ResolutionContextType {
  resolutionTier: ResolutionTier;
  setResolutionTier: (tier: ResolutionTier) => void;
  isHighResolution: boolean;
  isMobile: boolean;
  autoAdjustResolution: boolean;
  setAutoAdjustResolution: (auto: boolean) => void;
}

const ResolutionContext = createContext<ResolutionContextType | undefined>(undefined);

export const ResolutionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved preferences
  const loadSavedResolutionTier = (): ResolutionTier | undefined => {
    try {
      const saved = localStorage.getItem('userResolutionPreference');
      return saved as ResolutionTier || undefined;
    } catch (e) {
      return undefined;
    }
  };

  const loadAutoAdjustSetting = (): boolean => {
    try {
      const saved = localStorage.getItem('autoAdjustResolution');
      return saved !== null ? saved === 'true' : true; // Default to true
    } catch (e) {
      return true;
    }
  };

  const [autoAdjustResolution, setAutoAdjustSetting] = useState<boolean>(loadAutoAdjustSetting());
  const [userResolutionTier, setUserResolutionTier] = useState<ResolutionTier | undefined>(
    autoAdjustResolution ? undefined : loadSavedResolutionTier()
  );

  // Use the resolution hook with user preference if auto-adjust is disabled
  const {
    resolutionTier,
    deviceType,
    setResolutionTier: setHookResolutionTier,
  } = useResolution(autoAdjustResolution ? undefined : userResolutionTier);

  // Save user preference when changed
  useEffect(() => {
    if (!autoAdjustResolution && userResolutionTier) {
      localStorage.setItem('userResolutionPreference', userResolutionTier);
    }
  }, [userResolutionTier, autoAdjustResolution]);

  useEffect(() => {
    localStorage.setItem('autoAdjustResolution', String(autoAdjustResolution));
  }, [autoAdjustResolution]);

  // Wrapper for setting resolution tier that also updates user preference
  const setResolutionTier = (tier: ResolutionTier) => {
    setUserResolutionTier(tier);
    setHookResolutionTier(tier);
  };

  // Set auto adjust resolution
  const setAutoAdjustResolution = (auto: boolean) => {
    setAutoAdjustSetting(auto);
    // If turning auto on, clear user preference
    if (auto) {
      setUserResolutionTier(undefined);
    }
  };

  const value = {
    resolutionTier,
    setResolutionTier,
    isHighResolution: ['high', 'ultra'].includes(resolutionTier),
    isMobile: deviceType === 'mobile',
    autoAdjustResolution,
    setAutoAdjustResolution
  };

  return (
    <ResolutionContext.Provider value={value}>
      {children}
    </ResolutionContext.Provider>
  );
};

export const useResolutionContext = (): ResolutionContextType => {
  const context = useContext(ResolutionContext);
  if (context === undefined) {
    throw new Error('useResolutionContext must be used within a ResolutionProvider');
  }
  return context;
};
