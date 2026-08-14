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
}

export const campaignService = new CampaignService(campaignRepository);
