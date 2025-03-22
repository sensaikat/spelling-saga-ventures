
import React, { createContext, useContext, useState, useEffect } from 'react';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

// Types for parental controls
interface TimeLimit {
  enabled: boolean;
  dailyMinutes: number;
  weeklyHours: number;
  startTime: string; // "HH:MM" format
  endTime: string; // "HH:MM" format
}

interface ContentRestriction {
  adventureMode: boolean;
  multiLanguageMode: boolean;
  spellingGame: boolean;
  challengeMode: boolean;
}

interface ParentalControlsState {
  isParentalControlsEnabled: boolean;
  toggleParentalControls: () => void;
  
  // PIN for accessing parental controls
  pin: string;
  updatePin: (pin: string) => void;
  
  // Time limits
  timeLimit: TimeLimit;
  updateTimeLimit: (settings: Partial<TimeLimit>) => void;
  
  // Content restrictions
  contentRestrictions: ContentRestriction;
  updateContentRestrictions: (settings: Partial<ContentRestriction>) => void;
  
  // Session tracking
  sessionStartTime: Date | null;
  dailyTimeUsed: number; // in minutes
  weeklyTimeUsed: number; // in minutes
  startSession: () => void;
  endSession: () => void;
  resetDailyTime: () => void;
  resetWeeklyTime: () => void;
}

// Create store with persistence
export const useParentalControlsStore = create<ParentalControlsState>()(
  persist(
    (set, get) => ({
      isParentalControlsEnabled: false,
      toggleParentalControls: () => set(state => ({ 
        isParentalControlsEnabled: !state.isParentalControlsEnabled 
      })),
      
      pin: '1234', // Default PIN
      updatePin: (pin: string) => set({ pin }),
      
      timeLimit: {
        enabled: false,
        dailyMinutes: 60,  // 1 hour default
        weeklyHours: 7,    // 7 hours default
        startTime: '09:00', // 9 AM
        endTime: '18:00',   // 6 PM
      },
      updateTimeLimit: (settings) => set(state => ({ 
        timeLimit: { ...state.timeLimit, ...settings } 
      })),
      
      contentRestrictions: {
        adventureMode: true,
        multiLanguageMode: true,
        spellingGame: true,
        challengeMode: true,
      },
      updateContentRestrictions: (settings) => set(state => ({ 
        contentRestrictions: { ...state.contentRestrictions, ...settings } 
      })),
      
      sessionStartTime: null,
      dailyTimeUsed: 0,
      weeklyTimeUsed: 0,
      
      startSession: () => {
        const now = new Date();
        set({ sessionStartTime: now });
      },
      
      endSession: () => {
        const { sessionStartTime } = get();
        if (sessionStartTime) {
          const now = new Date();
          const sessionMinutes = Math.round((now.getTime() - sessionStartTime.getTime()) / 60000);
          
          set(state => ({ 
            sessionStartTime: null,
            dailyTimeUsed: state.dailyTimeUsed + sessionMinutes,
            weeklyTimeUsed: state.weeklyTimeUsed + sessionMinutes
          }));
        }
      },
      
      resetDailyTime: () => set({ dailyTimeUsed: 0 }),
      resetWeeklyTime: () => set({ weeklyTimeUsed: 0 }),
    }),
    {
      name: 'spelling-saga-parental-controls',
    }
  )
);

// Context for parental controls
interface ParentalControlsContextType {
  isLocked: boolean;
  canAccessFeature: (feature: keyof ContentRestriction) => boolean;
  getRemainingTime: () => { daily: number; weekly: number };
  isWithinAllowedHours: () => boolean;
  startSession: () => void;
  endSession: () => void;
}

const ParentalControlsContext = createContext<ParentalControlsContextType | null>(null);

export const ParentalControlsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    isParentalControlsEnabled,
    timeLimit,
    contentRestrictions,
    dailyTimeUsed,
    weeklyTimeUsed,
    startSession,
    endSession,
    resetDailyTime,
    resetWeeklyTime
  } = useParentalControlsStore();
  
  // Reset daily time at midnight
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetDailyTime();
      }
    };
    
    const dailyCheckInterval = setInterval(checkDate, 60000); // Check every minute
    return () => clearInterval(dailyCheckInterval);
  }, [resetDailyTime]);
  
  // Reset weekly time on Sunday at midnight
  useEffect(() => {
    const checkWeek = () => {
      const now = new Date();
      if (now.getDay() === 0 && now.getHours() === 0 && now.getMinutes() === 0) {
        resetWeeklyTime();
      }
    };
    
    const weeklyCheckInterval = setInterval(checkWeek, 60000); // Check every minute
    return () => clearInterval(weeklyCheckInterval);
  }, [resetWeeklyTime]);
  
  // Check if content should be locked due to time limits
  const isLocked = React.useMemo(() => {
    if (!isParentalControlsEnabled) return false;
    if (!timeLimit.enabled) return false;
    
    // Check time of day restrictions
    if (!isWithinAllowedHours()) return true;
    
    // Check daily time limit
    if (dailyTimeUsed >= timeLimit.dailyMinutes) return true;
    
    // Check weekly time limit
    if (weeklyTimeUsed >= (timeLimit.weeklyHours * 60)) return true;
    
    return false;
  }, [isParentalControlsEnabled, timeLimit, dailyTimeUsed, weeklyTimeUsed]);
  
  // Check if a specific feature is allowed
  const canAccessFeature = (feature: keyof ContentRestriction) => {
    if (!isParentalControlsEnabled) return true;
    return contentRestrictions[feature];
  };
  
  // Get remaining time within limits
  const getRemainingTime = () => {
    return {
      daily: Math.max(0, timeLimit.dailyMinutes - dailyTimeUsed),
      weekly: Math.max(0, (timeLimit.weeklyHours * 60) - weeklyTimeUsed)
    };
  };
  
  // Check if current time is within allowed hours
  const isWithinAllowedHours = () => {
    if (!timeLimit.enabled) return true;
    
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeValue = currentHours * 60 + currentMinutes;
    
    const [startHours, startMinutes] = timeLimit.startTime.split(':').map(Number);
    const [endHours, endMinutes] = timeLimit.endTime.split(':').map(Number);
    
    const startTimeValue = startHours * 60 + startMinutes;
    const endTimeValue = endHours * 60 + endMinutes;
    
    return currentTimeValue >= startTimeValue && currentTimeValue <= endTimeValue;
  };
  
  return (
    <ParentalControlsContext.Provider value={{
      isLocked,
      canAccessFeature,
      getRemainingTime,
      isWithinAllowedHours,
      startSession,
      endSession
    }}>
      {children}
    </ParentalControlsContext.Provider>
  );
};

// Hook for accessing parental controls
export const useParentalControls = () => {
  const context = useContext(ParentalControlsContext);
  if (!context) {
    throw new Error('useParentalControls must be used within a ParentalControlsProvider');
  }
  return context;
};
