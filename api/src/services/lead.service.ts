import { leadRepository, LeadRepository } from "../repositories/lead.respository"
import { CreateLeadInput, Lead } from "../types/lead.types";

export class LeadService {
  constructor(private repository: LeadRepository) {}

  createLead(data: CreateLeadInput): Lead {
    return this.repository.create(data);
  }

  getAllLeads(): Lead[] {
    return this.repository.findAll();
  }
}

export const leadService = new LeadService(leadRepository)
