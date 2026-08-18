import { prisma } from "../lib/prisma"
import { redis } from "../lib/redis"
import { Lead, CreateLeadInput } from "../types/lead.types"

export class LeadRepository {
  async create(data: CreateLeadInput): Promise<Lead> {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        status: "pending"
      }
    })

    await redis.del("lead:all")
    return lead as Lead
  }

  async findAll(): Promise<Lead[]> {

    const cacheKey = "lead:all"
    const cached = await redis.get(cacheKey)

    if(cached){
      return JSON.parse(cached)
    }

    const leads = await prisma.lead.findMany()
    await redis.setEx(cacheKey, 300, JSON.stringify(leads))
    return leads as Lead[]
  }

  async findById(id: string): Promise<Lead | null>{
    return await prisma.lead.findUnique({
      where:{id}
    }) as Lead | null
  }

  async update(id: string, data: Partial<CreateLeadInput>): Promise<Lead>{
    const lead = await prisma.lead.update({
      where:{id},
      data
    }) as Lead

     await redis.del("lead:all")
     return lead;
  }

  async delete(id: string): Promise<Lead>{
    const lead =  await prisma.lead.delete({
      where:{id}
    }) as Lead

    await redis.del("lead:all")
    return lead;
  }
}

export const leadRepository = new LeadRepository()