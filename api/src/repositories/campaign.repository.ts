import { Campaign, CreateCampaignInput } from "../types/campaign.types";
import { prisma } from "../lib/prisma";

export class CampaignRepository {
  async create(data: CreateCampaignInput): Promise<Campaign> {
   return await prisma.campaign.create({
    data: {
      ...data,
      status: "draft"
    }
   })
  }

  async findAll():  Promise<Campaign[]> {
    return await prisma.campaign.findMany()
  }
}

export const campaignRepository = new CampaignRepository();
