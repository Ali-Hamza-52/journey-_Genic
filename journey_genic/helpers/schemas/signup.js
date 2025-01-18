import { z } from 'zod';

const signUpSchema = z
    .object({
        username: z
            .string()
            .nonempty('First Name is required.')
            .min(3, { message: 'First Name must be between 3 and 256 characters.' })
            .max(256, { message: 'First Name must be between 3 and 256 characters.' })
            .regex(/^[A-Za-z\s]+$/, 'First Name must contain only letters and spaces.'),

        address: z
            .string()
            .nonempty('Address is required.')
            .min(3, { message: 'Address must be between 3 and 256 characters.' })
            .max(256, { message: 'Address must be between 3 and 256 characters.' })
            .regex(/^[A-Za-z0-9\s]+$/, 'Address must contain only letters, numbers (street no), and spaces.'),


        email: z
            .string()
            .nonempty('Email Address is required.')
            .email('Please enter a valid email address (e.g., example@domain.com).'),
        profileImage: z.string().optional(),
        phoneNumber: z
            .string()
            .refine(
                (value) => !value || /^[\d\+\-\(\)\s]*$/.test(value),
                'Please enter a valid phone number (e.g., +1234567890).'
            )
            .refine(
                (value) => !value || (value.length >= 10 && value.length <= 15),
                'Phone number must be between 10 and 15 digits.'
            ),
        isSocialLogin: z.boolean(),
        role: z.string(),
        password: z
            .string()
            .nonempty('Password is required.')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
                'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., @, #, $, etc.).'
            )
            .min(8, 'Password must be at least 8 characters long.'),

        confirmPassword: z.string().nonempty('Confirm Password is required.'),

        isTermsAndConditions: z.boolean().refine((val) => val === true, {
            message: 'You must agree to the terms & conditions.'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword']
    });

export default signUpSchema;
