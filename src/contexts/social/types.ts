
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

export interface SocialGroupsContextType {
  currentUser: SocialGroupsState['currentUser'];
  groups: SocialGroup[];
  discoveryGroups: SocialGroup[];
  createGroup: (group: Omit<SocialGroup, 'id' | 'createdAt' | 'updatedAt' | 'members' | 'pendingInvitations'>) => void;
  createInvitation: (groupId: string, invitation: { email?: string; phone?: string; name: string }) => void;
  joinPublicGroup: (groupId: string) => void;
  fetchDiscoveryGroups: () => void;
}
