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
      include:{
        leads:true
      }

    });

    await redis.del(`campaign:${data.userId}`);
    return campaign;
  }

  async findAll(userId:string): Promise<Campaign[]> {
    const cacheKey = `campaign:${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const campaign = await prisma.campaign.findMany({
      where: {
        userId
      },
      include:{
        leads:true
      }
    });
    await redis.setEx(cacheKey, 300, JSON.stringify(campaign));
    return campaign;
  }

  async findById(id: string): Promise<Campaign | null> {
    return await prisma.campaign.findUnique({
      where: { id },
      include:{
        leads:true
      }
    });
  }

  async update(
    id: string,
    data: Partial<CreateCampaignInput>,
  ): Promise<Campaign> {
    const campaign = await prisma.campaign.update({
      where: { id },
      data,
      include:{
        leads:true
      }
    });

    await redis.del(`campaigns:*`);
    return campaign;
  }

  async delete(id: string): Promise<Campaign> {
    const campaign = await prisma.campaign.delete({
      where: { id },
      include:{
        leads:true
      }
    });

    await redis.del(`campaigns:*`);
    return campaign;
  }
}

export const campaignRepository = new CampaignRepository();
