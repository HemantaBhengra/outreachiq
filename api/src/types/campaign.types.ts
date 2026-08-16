export interface Campaign {
    id: string
    name: string
    subject: string
    body: string
    userId: string
    createdAt: Date
}

export type CreateCampaignInput = Omit<Campaign, 'id' | 'createdAt'>