import { z } from 'zod';

import signUpSchema from '../schemas/signup';

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export type FieldType =
  | 'email'
  | 'password'
  | 'name'
  | 'phoneNumber'
  | 'address'
  | 'isTermsAndConditions'
  | 'profileImage'
  | 'isSocialLogin'
  | 'role';
