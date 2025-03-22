
import * as z from 'zod';

export const groupFormSchema = z.object({
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

export type GroupFormValues = z.infer<typeof groupFormSchema>;
