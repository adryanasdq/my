import { z } from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be 5 or more characters')
    .max(25, 'Title must be 25 or fewer characters'),
  desc: z
    .string()
    .min(10, 'Description must be 10 or more characters')
    .max(100, 'Description must be 100 or fewer characters'),
  priority: z.string().min(1, 'Priority is required'),
  dueDate: z.date().nullable(),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;
