
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GroupForm } from './forms/GroupForm';
import { useCreateGroupForm } from './hooks/useCreateGroupForm';

interface CreateGroupFormProps {
  onCancel?: () => void;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onCancel }) => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/social');
  };
  
  const { form, onSubmit } = useCreateGroupForm(handleSuccess);
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/social');
    }
  };
  
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create New Learning Group</CardTitle>
      </CardHeader>
      <CardContent>
        <GroupForm 
          form={form}
          onSubmit={onSubmit}
          onCancel={handleCancel}
        />
      </CardContent>
    </Card>
  );
};

export default CreateGroupForm;
