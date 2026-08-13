import {
  CampaignRepository,
  campaignRepository,
} from "../repositories/campaign.repository";
import { CreateCampaignInput, Campaign } from "../types/campaign.types";

export class CampaignService {
  constructor(private repository: CampaignRepository) {}

  createCampaign(data: CreateCampaignInput): Promise<Campaign> {
    return this.repository.create(data);
  }

  getAllCampaigns(): Promise<Campaign[]> {
    return this.repository.findAll();
  }
}

export const campaignService = new CampaignService(campaignRepository);
