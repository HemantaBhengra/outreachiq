import { prisma } from "../lib/prisma"
import { Lead, CreateLeadInput } from "../types/lead.types"

export class LeadRepository {
  async create(data: CreateLeadInput): Promise<Lead> {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        status: "pending"
      }
    })
    return lead as Lead
  }

  async findAll(): Promise<Lead[]> {
    const leads = await prisma.lead.findMany()
    return leads as Lead[]
  }

  async findById(id: string): Promise<Lead | null>{
    return await prisma.lead.findUnique({
      where:{id}
    }) as Lead | null
  }

  async update(id: string, data: Partial<CreateLeadInput>): Promise<Lead>{
    return await prisma.lead.update({
      where:{id},
      data
    }) as Lead
  }

  async delete(id: string): Promise<Lead>{
    return await prisma.lead.delete({
      where:{id}
    }) as Lead
  }
}

export const leadRepository = new LeadRepository()