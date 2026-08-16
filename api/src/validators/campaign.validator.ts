import { z } from 'zod'

export const createCampaignSchema = z.object({
    name: z.string().min(1,"Name is required"),
    subject:z.string().min(1,"subject is required"),
    body: z.string().min(1,"body is required"),
    userId: z.string().min(1)
})

export const updateCampaignSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  userId: z.string().min(1).optional()
})

export type CreateCampaignDto = z.infer<typeof createCampaignSchema>
export type UpdateCampaignDto = z.infer<typeof updateCampaignSchema>