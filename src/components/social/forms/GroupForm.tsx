
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { GroupNameField } from './GroupNameField';
import { GroupDescriptionField } from './GroupDescriptionField';
import { GroupTypeField } from './GroupTypeField';
import { LocationField } from './LocationField';
import { VisibilityField } from './VisibilityField';
import { FormActions } from './FormActions';
import { GroupFormValues } from '../hooks/useCreateGroupForm';

interface GroupFormProps {
  form: UseFormReturn<GroupFormValues>;
  onSubmit: (values: GroupFormValues) => void;
  onCancel: () => void;
}

export const GroupForm: React.FC<GroupFormProps> = ({
  form,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <GroupNameField form={form} />
      <GroupDescriptionField form={form} />
      <GroupTypeField form={form} />
      <LocationField form={form} />
      <VisibilityField form={form} />
      <FormActions onCancel={onCancel} />
    </form>
  );
};
