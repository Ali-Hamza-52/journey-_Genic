import { z } from 'zod';

import { categorySchema } from '../schemas/category.schema';

export type CategoryFormValues = z.infer<typeof categorySchema>;

export type FieldType =
    | 'name'
    | 'description'
    | 'userId';