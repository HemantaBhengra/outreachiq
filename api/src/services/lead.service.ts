
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

  async getLeadById(id:string):Promise<Lead | null>{
    return await this.repository.findById(id);
  }

  async updateLead(id:string,data:Partial<CreateLeadInput>):Promise<Lead>{
    return await this.repository.update(id,data);
  }

  async deleteLead(id:string):Promise<Lead>{
    return await this.repository.delete(id);
  }
}

export const leadService = new LeadService(leadRepository);
