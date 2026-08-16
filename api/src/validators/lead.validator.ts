import { z } from "zod";

export const createLeadSchema = z.object({
  email: z.email("Please enter a valid email"),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
});
export const updateLeadSchema = z.object({
  email: z.email("Please enter a valid email").optional(),
  name: z.string().min(1, "Name is required").optional(),
  company: z.string().min(1, "Company is required").optional()
})


export type CreateLeadDto = z.infer<typeof createLeadSchema>;
export type UpdateLeadDto = z.infer<typeof updateLeadSchema>
