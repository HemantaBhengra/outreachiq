import { Campaign, CreateCampaignInput } from "../types/campaign.types";
import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";

export class CampaignRepository {
  async create(data: CreateCampaignInput): Promise<Campaign> {
    const campaign = await prisma.campaign.create({
      data: {
        ...data,
        status: "draft",
      },
    });

    await redis.del("campaign:all");
    return campaign;
  }

  async findAll(): Promise<Campaign[]> {
    const cacheKey = "campaign:all";
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const campaign = await prisma.campaign.findMany();
    await redis.setEx(cacheKey, 300, JSON.stringify(campaign));
    return campaign;
  }

  async findById(id: string): Promise<Campaign | null> {
    return await prisma.campaign.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Partial<CreateCampaignInput>,
  ): Promise<Campaign> {
    const campaign = await prisma.campaign.update({
      where: { id },
      data,
    });

    await redis.del("campaign:all");
    return campaign;
  }

  async delete(id: string): Promise<Campaign> {
    const campaign = await prisma.campaign.delete({
      where: { id },
    });

    await redis.del("campaign:all");
    return campaign;
  }
}

export const campaignRepository = new CampaignRepository();
