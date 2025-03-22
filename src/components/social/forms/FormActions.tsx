
import React from 'react';
import { Button } from '@/components/ui/button';

export const FormActions = ({ onCancel }) => {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button 
        type="button" 
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit">Create Group</Button>
    </div>
  );
};

export default FormActions;
