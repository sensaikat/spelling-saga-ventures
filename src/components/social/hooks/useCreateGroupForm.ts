
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSocialGroups } from '../../../contexts/SocialGroupsContext';
import { groupFormSchema, GroupFormValues } from '../forms/group-form-schema';
import { SocialGroup } from '../../../contexts/SocialGroupsContext';

// Define this type to match exactly what createGroup expects
type CreateGroupInput = Omit<SocialGroup, 'id' | 'createdAt' | 'updatedAt' | 'members' | 'pendingInvitations'>;

export const useCreateGroupForm = () => {
  const { createGroup } = useSocialGroups();
  const navigate = useNavigate();
  
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'friends',
      isPublic: false,
      location: '',
    },
  });
  
  const onSubmit = (values: GroupFormValues) => {
    // Cast the form values to the expected type
    const groupData: CreateGroupInput = {
      name: values.name,
      description: values.description,
      type: values.type,
      isPublic: values.isPublic,
      location: values.location || '',
    };
    
    createGroup(groupData);
    navigate('/social');
  };
  
  const goBack = () => {
    navigate('/social');
  };
  
  return {
    form,
    onSubmit,
    goBack,
    watchType: form.watch('type')
  };
};
