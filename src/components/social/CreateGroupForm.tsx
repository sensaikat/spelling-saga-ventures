
import React, { useCallback } from 'react';
import GroupForm from './forms/GroupForm';
import { useNavigate } from 'react-router-dom';
import { useSocialGroups, SocialGroup } from '@/contexts/social';

// Define the type that matches what createGroup expects
type CreateGroupInput = Omit<SocialGroup, 'id' | 'createdAt' | 'updatedAt' | 'members' | 'pendingInvitations'>;

const CreateGroupForm: React.FC = () => {
  const { createGroup } = useSocialGroups();
  const navigate = useNavigate();

  const handleCreateGroup = useCallback((values: any) => {
    // Create a properly typed object for createGroup
    const groupData: CreateGroupInput = {
      name: values.name,
      description: values.description,
      type: values.type,
      isPublic: values.isPublic,
      location: values.location || undefined,
    };

    createGroup(groupData);
    navigate('/social');
  }, [createGroup, navigate]);

  const handleCancel = useCallback(() => {
    navigate('/social');
  }, [navigate]);

  return <GroupForm onSubmit={handleCreateGroup} onCancel={handleCancel} />;
};

export default CreateGroupForm;
