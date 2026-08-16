import {
  CampaignRepository,
  campaignRepository,
} from "../repositories/campaign.repository";
import { CreateCampaignInput, Campaign } from "../types/campaign.types";

export class CampaignService {
  constructor(private repository: CampaignRepository) {}

  async createCampaign(data: CreateCampaignInput): Promise<Campaign> {
    return await this.repository.create(data);
  }

 async getAllCampaigns(): Promise<Campaign[]> {
    return await this.repository.findAll();
  }

  async getCampaignById(id:string): Promise<Campaign | null>{
    return await this.repository.findById(id);
  }

  async updateCampaign(id:string,data: Partial<CreateCampaignInput>): Promise<Campaign>{
    return await this.repository.update(id,data)
  }

  async deleteCampaign(id:string): Promise<Campaign>{
    return await this.repository.delete(id)
  }
}

export const campaignService = new CampaignService(campaignRepository);
