import { z } from 'zod';

import loginSchema from '../schemas/login';

export type LoginFormValues = z.infer<typeof loginSchema>;

export type FieldType =
    | "password"
    | "email";