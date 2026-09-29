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
      include: {
        leads: true,
      },
    });

    console.log(`CACHE INVALIDATED: campaigns:${data.userId}:*`)
    await redis.del(`campaign:${data.userId}:*`);
    return campaign;
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ campaigns: Campaign[]; total: number }> {
    const cacheKey = `campaign:${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`Cache hit: ${cacheKey}`);
      return JSON.parse(cached);
    }
    console.log(`Cache miss: ${cacheKey}`);

    const skip = (page - 1) * limit;

    const total = await prisma.campaign.count({ where: { userId } });

    const campaign = await prisma.campaign.findMany({
      where: {
        userId,
      },
      include: {
        leads: true,
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    const result = { campaign, total };
    await redis.setEx(cacheKey, 300, JSON.stringify(result));
    return result;
  }

  async findById(id: string): Promise<Campaign | null> {
    return await prisma.campaign.findUnique({
      where: { id },
      include: {
        leads: true,
      },
    });
  }

  async update(id: string,data: Partial<CreateCampaignInput>,): Promise<Campaign> {
    const campaign = await prisma.campaign.update({
      where: { id },
      data,
      include: {
        leads: true,
      },
    });

    console.log(`CACHE INVALIDATED: campaigns:${campaign.userId}:*`)
    await redis.del(`campaigns:${campaign.userId}:*`);
    return campaign;
  }

  async delete(id: string): Promise<Campaign> {
    const campaign = await prisma.campaign.delete({
      where: { id },
      include: {
        leads: true,
      },
    });

    console.log(`CACHE INVALIDATED: campaigns:${campaign.userId}:*`)
    await redis.del(`campaigns:${campaign.userId}:*`);
    return campaign;
  }
}

export const campaignRepository = new CampaignRepository();
