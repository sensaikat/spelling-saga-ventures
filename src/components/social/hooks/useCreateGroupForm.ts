
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { groupFormSchema } from '../forms/group-form-schema';
import { useSocialGroupsStore } from '../../../contexts/social/store';
import { SocialGroup } from '../../../contexts/social/types';

export type GroupFormValues = z.infer<typeof groupFormSchema>;

export const useCreateGroupForm = (onSuccess: () => void) => {
  const addGroup = useSocialGroupsStore(state => state.addGroup);
  
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'family',
      location: '',
      isPublic: true,
    },
  });

  const onSubmit = (values: GroupFormValues) => {
    const newGroup = {
      id: Date.now().toString(),
      name: values.name,
      description: values.description,
      type: values.type,
      location: values.location,
      isPublic: values.isPublic,
    };

    addGroup(newGroup);
    onSuccess();
  };

  return {
    form,
    onSubmit,
  };
};
