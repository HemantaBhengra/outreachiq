import { CreateLeadInput, Lead } from "../types/lead.types";

class LeadRepository {
  private arr: Lead[] = [];

  create(data: CreateLeadInput): Lead {
    const lead: Lead = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      status: "pending",
    };
    this.arr.push(lead);
    return lead;
  }

  findAll(): Lead[] {
    return this.arr;
  }
}

export const leadRepository = new LeadRepository();
