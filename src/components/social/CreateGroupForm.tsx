
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useSocialGroups } from '../../contexts/SocialGroupsContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Group name must be at least 3 characters.",
  }).max(50, {
    message: "Group name must not exceed 50 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters.",
  }),
  type: z.enum(['family', 'friends', 'school', 'local', 'regional', 'global']),
  isPublic: z.boolean().default(false),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateGroupForm: React.FC = () => {
  const { createGroup } = useSocialGroups();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'friends',
      isPublic: false,
      location: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // Fix: Explicitly cast the values to the required type to satisfy TypeScript
    // Since we're using Zod validation, we know these values will be present
    createGroup({
      name: values.name,
      description: values.description,
      type: values.type,
      isPublic: values.isPublic,
      location: values.location,
    });
    navigate('/social');
  };
  
  const showLocationField = form.watch('type') === 'local' || form.watch('type') === 'regional';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/social')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          <span>Back to Groups</span>
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Create New Group</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            {showLocationField && (
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
                          form.watch('type') === 'local' 
                            ? "Enter city name" 
                            : "Enter region/country"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Public Group</FormLabel>
                    <FormDescription>
                      Allow others to discover and join your group
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/social')}
              >
                Cancel
              </Button>
              <Button type="submit">Create Group</Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default CreateGroupForm;
