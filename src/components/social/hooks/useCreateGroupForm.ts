
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { groupFormSchema } from '../forms/group-form-schema';
import { useStore as useSocialGroupsStore } from '../../../contexts/social/store';
import { Group } from '../../../contexts/social/types';

export type GroupFormValues = z.infer<typeof groupFormSchema>;

export const useCreateGroupForm = (onSuccess: () => void) => {
  const addGroup = useSocialGroupsStore(state => state.addGroup);
  
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'study',
      location: '',
      isPublic: true,
    },
  });

  const onSubmit = (values: GroupFormValues) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: values.name,
      description: values.description,
      type: values.type,
      location: values.location,
      isPublic: values.isPublic,
      members: [
        {
          id: '1',
          name: 'You',
          role: 'admin',
          avatar: '/assets/avatars/avatar-1.png',
        },
      ],
      createdAt: new Date().toISOString(),
    };

    addGroup(newGroup);
    onSuccess();
  };

  return {
    form,
    onSubmit,
  };
};
