import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters long." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export { contactSchema }
