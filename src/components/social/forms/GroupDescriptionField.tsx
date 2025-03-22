
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export const GroupDescriptionField = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea 
              {...field} 
              placeholder="Describe your group"
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GroupDescriptionField;
