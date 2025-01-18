// contact form types

import { z } from "zod";
import { contactSchema } from "../schemas/contact.schema";

export type ContactFormValues = z.infer<typeof contactSchema>;

export type FieldType =
  | "name"
  | "email"
  | "subject"
  | "message";