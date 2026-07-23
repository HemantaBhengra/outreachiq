import { Campaign, CreateCampaignInput } from "../types/campaign.types";
export class CampaignRepository {
  private arr: Campaign[] = [];

  create(data: CreateCampaignInput): Campaign {
    const campaign: Campaign = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.arr.push(campaign);
    return campaign;
  }

  findAll(): Campaign[] {
    return this.arr;
  }
}

export const campaignRepository = new CampaignRepository();
