import { z } from 'zod';

import reviewSchema from '../schemas/review';

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export type FieldType =
    | "rating"
    | "comment"
    | "userId"
    | "productId";