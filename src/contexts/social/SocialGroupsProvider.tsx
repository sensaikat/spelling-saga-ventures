
import React, { createContext, useContext, useEffect } from 'react';
import { useSocialGroupsStore } from './store';
import { SocialGroupsContextType } from './types';
import { toast } from "@/hooks/use-toast";

// Context for social groups
const SocialGroupsContext = createContext<SocialGroupsContextType | null>(null);

export const SocialGroupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentUser,
    groups,
    discoveryGroups,
    addGroup,
    createInvitation,
    joinPublicGroup,
    fetchDiscoveryGroups
  } = useSocialGroupsStore();
  
  // Fetch discovery groups on mount
  useEffect(() => {
    fetchDiscoveryGroups();
  }, [fetchDiscoveryGroups]);
  
  const createGroup = (group: Parameters<typeof addGroup>[0]) => {
    addGroup(group);
    toast({
      title: "Group Created",
      description: `Your group '${group.name}' has been created successfully`,
    });
  };
  
  return (
    <SocialGroupsContext.Provider value={{
      currentUser,
      groups,
      discoveryGroups,
      createGroup,
      createInvitation,
      joinPublicGroup,
      fetchDiscoveryGroups
    }}>
      {children}
    </SocialGroupsContext.Provider>
  );
};

// Hook for accessing social groups
export const useSocialGroups = () => {
  const context = useContext(SocialGroupsContext);
  if (!context) {
    throw new Error('useSocialGroups must be used within a SocialGroupsProvider');
  }
  return context;
};
