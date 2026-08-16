import { Campaign, CreateCampaignInput } from "../types/campaign.types";
import { prisma } from "../lib/prisma";
import { string } from "zod";

export class CampaignRepository {
  async create(data: CreateCampaignInput): Promise<Campaign> {
    return await prisma.campaign.create({
      data: {
        ...data,
        status: "draft",
      },
    });
  }

  async findAll(): Promise<Campaign[]> {
    return await prisma.campaign.findMany();
  }

  async findById(id: string): Promise<Campaign | null> {
    return await prisma.campaign.findUnique({
      where: { id },
    });
  }

  async update(id: string,data: Partial<CreateCampaignInput>,): Promise<Campaign> {
    return await prisma.campaign.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Campaign> {
    return await prisma.campaign.delete({
      where: { id },
    });
  }
}

export const campaignRepository = new CampaignRepository();
