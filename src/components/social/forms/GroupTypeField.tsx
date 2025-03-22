
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GroupTypeField = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Group Type</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a group type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="friends">Friends</SelectItem>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="local">Local Community</SelectItem>
              <SelectItem value="regional">Regional</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            This determines who can join and participate
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GroupTypeField;
