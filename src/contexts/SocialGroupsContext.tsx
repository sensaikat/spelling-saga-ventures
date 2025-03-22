
import React, { createContext, useContext, useState, useEffect } from 'react';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

// Types for social groups
export interface GroupMember {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  isAdmin: boolean;
  joinedAt: string;
}

export interface GroupInvitation {
  id: string;
  groupId: string;
  email?: string;
  phone?: string;
  name: string;
  sentAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export interface SocialGroup {
  id: string;
  name: string;
  description: string;
  type: 'family' | 'friends' | 'school' | 'local' | 'regional' | 'global';
  createdAt: string;
  updatedAt: string;
  members: GroupMember[];
  pendingInvitations: GroupInvitation[];
  isPublic: boolean;
  location?: string;
}

export interface SocialGroupsState {
  // User information
  currentUser: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
  updateCurrentUser: (user: Partial<SocialGroupsState['currentUser']>) => void;
  
  // Groups management
  groups: SocialGroup[];
  addGroup: (group: Omit<SocialGroup, 'id' | 'createdAt' | 'updatedAt' | 'members' | 'pendingInvitations'>) => void;
  updateGroup: (groupId: string, updates: Partial<Omit<SocialGroup, 'id' | 'members' | 'pendingInvitations'>>) => void;
  removeGroup: (groupId: string) => void;
  
  // Invitations management
  createInvitation: (groupId: string, invitation: { email?: string; phone?: string; name: string }) => void;
  updateInvitationStatus: (invitationId: string, status: GroupInvitation['status']) => void;
  
  // Member management
  addMemberToGroup: (groupId: string, member: Omit<GroupMember, 'id' | 'joinedAt'>) => void;
  removeMemberFromGroup: (groupId: string, memberId: string) => void;
  toggleMemberAdmin: (groupId: string, memberId: string) => void;
  
  // Discovery
  discoveryGroups: SocialGroup[];
  fetchDiscoveryGroups: () => void;
  joinPublicGroup: (groupId: string) => void;
}

// Create store with persistence
export const useSocialGroupsStore = create<SocialGroupsState>()(
  persist(
    (set, get) => ({
      currentUser: {
        id: crypto.randomUUID(), // Generate a random ID for demo
        name: 'User',
      },
      updateCurrentUser: (user) => set(state => ({
        currentUser: { ...state.currentUser, ...user }
      })),
      
      groups: [],
      addGroup: (group) => set(state => {
        const newGroup: SocialGroup = {
          ...group,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          members: [{
            id: state.currentUser.id,
            name: state.currentUser.name,
            email: state.currentUser.email,
            phone: state.currentUser.phone,
            avatar: state.currentUser.avatar,
            isAdmin: true,
            joinedAt: new Date().toISOString()
          }],
          pendingInvitations: []
        };
        return { groups: [...state.groups, newGroup] };
      }),
      updateGroup: (groupId, updates) => set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId 
            ? { 
                ...group, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              }
            : group
        )
      })),
      removeGroup: (groupId) => set(state => ({
        groups: state.groups.filter(group => group.id !== groupId)
      })),
      
      createInvitation: (groupId, invitation) => set(state => {
        const group = state.groups.find(g => g.id === groupId);
        if (!group) return state;
        
        // Create expiration date (7 days from now)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        
        const newInvitation: GroupInvitation = {
          id: crypto.randomUUID(),
          groupId,
          name: invitation.name,
          email: invitation.email,
          phone: invitation.phone,
          sentAt: new Date().toISOString(),
          expiresAt: expirationDate.toISOString(),
          status: 'pending'
        };
        
        return {
          groups: state.groups.map(group => 
            group.id === groupId
              ? {
                  ...group,
                  pendingInvitations: [...group.pendingInvitations, newInvitation]
                }
              : group
          )
        };
      }),
      updateInvitationStatus: (invitationId, status) => set(state => ({
        groups: state.groups.map(group => {
          const invitation = group.pendingInvitations.find(inv => inv.id === invitationId);
          if (!invitation) return group;
          
          return {
            ...group,
            pendingInvitations: group.pendingInvitations.map(inv => 
              inv.id === invitationId ? { ...inv, status } : inv
            )
          };
        })
      })),
      
      addMemberToGroup: (groupId, member) => set(state => {
        const group = state.groups.find(g => g.id === groupId);
        if (!group) return state;
        
        const newMember: GroupMember = {
          ...member,
          id: crypto.randomUUID(),
          joinedAt: new Date().toISOString()
        };
        
        return {
          groups: state.groups.map(group => 
            group.id === groupId
              ? {
                  ...group,
                  members: [...group.members, newMember],
                  updatedAt: new Date().toISOString()
                }
              : group
          )
        };
      }),
      removeMemberFromGroup: (groupId, memberId) => set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId
            ? {
                ...group,
                members: group.members.filter(member => member.id !== memberId),
                updatedAt: new Date().toISOString()
              }
            : group
        )
      })),
      toggleMemberAdmin: (groupId, memberId) => set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId
            ? {
                ...group,
                members: group.members.map(member =>
                  member.id === memberId
                    ? { ...member, isAdmin: !member.isAdmin }
                    : member
                ),
                updatedAt: new Date().toISOString()
              }
            : group
        )
      })),
      
      // Demo discovery groups
      discoveryGroups: [
        {
          id: 'public-group-1',
          name: 'Global Language Learners',
          description: 'A worldwide community of language enthusiasts!',
          type: 'global',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
          members: [
            { id: 'admin-1', name: 'Admin', isAdmin: true, joinedAt: '2023-01-01T00:00:00Z' },
            { id: 'member-1', name: 'Member 1', isAdmin: false, joinedAt: '2023-01-02T00:00:00Z' },
            { id: 'member-2', name: 'Member 2', isAdmin: false, joinedAt: '2023-01-03T00:00:00Z' },
          ],
          pendingInvitations: [],
          isPublic: true,
        },
        {
          id: 'public-group-2',
          name: 'New York Language Club',
          description: 'For language learners in New York City',
          type: 'regional',
          createdAt: '2023-02-01T00:00:00Z',
          updatedAt: '2023-02-01T00:00:00Z',
          members: [
            { id: 'admin-2', name: 'Admin', isAdmin: true, joinedAt: '2023-02-01T00:00:00Z' },
            { id: 'member-3', name: 'Member 3', isAdmin: false, joinedAt: '2023-02-02T00:00:00Z' },
          ],
          pendingInvitations: [],
          isPublic: true,
          location: 'New York, USA',
        },
        {
          id: 'public-group-3',
          name: 'Kids Learning Together',
          description: 'A safe space for kids to learn languages together',
          type: 'global',
          createdAt: '2023-03-01T00:00:00Z',
          updatedAt: '2023-03-01T00:00:00Z',
          members: [
            { id: 'admin-3', name: 'Admin', isAdmin: true, joinedAt: '2023-03-01T00:00:00Z' },
            { id: 'member-4', name: 'Member 4', isAdmin: false, joinedAt: '2023-03-02T00:00:00Z' },
            { id: 'member-5', name: 'Member 5', isAdmin: false, joinedAt: '2023-03-03T00:00:00Z' },
            { id: 'member-6', name: 'Member 6', isAdmin: false, joinedAt: '2023-03-04T00:00:00Z' },
          ],
          pendingInvitations: [],
          isPublic: true,
        },
      ],
      fetchDiscoveryGroups: () => {
        // This would typically be an API call in a real app
        console.log('Fetching discovery groups...');
        // The groups are already in the state for demo purposes
      },
      joinPublicGroup: (groupId) => set(state => {
        const { currentUser } = state;
        const discoveryGroup = state.discoveryGroups.find(g => g.id === groupId);
        
        if (!discoveryGroup) {
          toast({
            title: "Error",
            description: "Group not found",
            variant: "destructive"
          });
          return state;
        }
        
        // Check if user is already a member of this group
        if (state.groups.some(g => g.id === groupId)) {
          toast({
            title: "Already a member",
            description: "You are already a member of this group",
          });
          return state;
        }
        
        // Create a copy of the group with the current user as a member
        const newGroup: SocialGroup = {
          ...discoveryGroup,
          members: [
            ...discoveryGroup.members,
            {
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              phone: currentUser.phone,
              avatar: currentUser.avatar,
              isAdmin: false,
              joinedAt: new Date().toISOString()
            }
          ]
        };
        
        toast({
          title: "Joined Group",
          description: `You've successfully joined ${discoveryGroup.name}`,
        });
        
        return {
          groups: [...state.groups, newGroup]
        };
      }),
    }),
    {
      name: 'spelling-saga-social-groups',
    }
  )
);

// Context for social groups
interface SocialGroupsContextType {
  currentUser: SocialGroupsState['currentUser'];
  groups: SocialGroup[];
  discoveryGroups: SocialGroup[];
  createGroup: (group: Omit<SocialGroup, 'id' | 'createdAt' | 'updatedAt' | 'members' | 'pendingInvitations'>) => void;
  createInvitation: (groupId: string, invitation: { email?: string; phone?: string; name: string }) => void;
  joinPublicGroup: (groupId: string) => void;
  fetchDiscoveryGroups: () => void;
}

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
  
  const createGroup = (group: Omit<SocialGroup, 'id' | 'createdAt' | 'updatedAt' | 'members' | 'pendingInvitations'>) => {
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
