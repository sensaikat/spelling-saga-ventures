
import React from 'react';
import { Form } from '@/components/ui/form';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateGroupForm } from '../hooks/useCreateGroupForm';
import GroupNameField from './GroupNameField';
import GroupDescriptionField from './GroupDescriptionField';
import GroupTypeField from './GroupTypeField';
import LocationField from './LocationField';
import VisibilityField from './VisibilityField';
import FormActions from './FormActions';

const GroupForm: React.FC = () => {
  const { form, onSubmit, goBack, watchType } = useCreateGroupForm();
  const showLocationField = watchType === 'local' || watchType === 'regional';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={goBack}
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
            <GroupNameField />
            <GroupDescriptionField />
            <GroupTypeField />
            
            {showLocationField && <LocationField type={watchType} />}
            
            <VisibilityField />
            
            <FormActions onCancel={goBack} />
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default GroupForm;
