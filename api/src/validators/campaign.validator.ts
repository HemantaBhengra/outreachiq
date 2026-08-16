import { z } from 'zod'

export const createCampaignSchema = z.object({
    name: z.string().min(1,"Name is required"),
    subject:z.string().min(1,"subject is required"),
    body: z.string().min(1,"body is required"),
    userId: z.string().min(1)
})

export type CreateCampaignDto = z.infer<typeof createCampaignSchema>