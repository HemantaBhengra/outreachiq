import { z } from "zod";

export const createLeadSchema = z.object({
  email: z.email("Please enter a valid email"),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
});

export type CreateLeadDto = z.infer<typeof createLeadSchema>;
