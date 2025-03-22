
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface LocationFieldProps {
  type: string;
}

const LocationField: React.FC<LocationFieldProps> = ({ type }) => {
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
