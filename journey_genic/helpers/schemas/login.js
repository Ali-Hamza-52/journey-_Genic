import { z } from 'zod';

const loginSchema = z
    .object({
        email: z
            .string()
            .nonempty('Email Address is required.')
            .email('Please enter a valid email address (e.g., example@domain.com).'),
        password: z
            .string()
            .nonempty('Password is required.'),

    });

export default loginSchema;
