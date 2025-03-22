
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const GroupNameField = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Group Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter group name" />
          </FormControl>
          <FormDescription>
            Choose a meaningful name for your group
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GroupNameField;
