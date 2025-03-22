
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const LocationField = ({ type = "local" }) => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Input 
              {...field} 
              placeholder={
                type === 'local' 
                  ? "Enter city name" 
                  : "Enter region/country"
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationField;
