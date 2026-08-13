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
}

export const leadRepository = new LeadRepository()