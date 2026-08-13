import { promises } from "node:dns";
import {
  leadRepository,
  LeadRepository,
} from "../repositories/lead.repository";
import { CreateLeadInput, Lead } from "../types/lead.types";

export class LeadService {
  constructor(private repository: LeadRepository) {}

  createLead(data: CreateLeadInput): Promise<Lead> {
    return this.repository.create(data);
  }

  getAllLeads(): Promise<Lead[]> {
    return this.repository.findAll();
  }
}

export const leadService = new LeadService(leadRepository);
