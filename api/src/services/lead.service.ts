
import {
  leadRepository,
  LeadRepository,
} from "../repositories/lead.repository";
import { CreateLeadInput, Lead } from "../types/lead.types";

export class LeadService {
  constructor(private repository: LeadRepository) {}

  async createLead(data: CreateLeadInput): Promise<Lead> {
    return await this.repository.create(data);
  }

  async getAllLeads(): Promise<Lead[]> {
    return await this.repository.findAll();
  }
}

export const leadService = new LeadService(leadRepository);
