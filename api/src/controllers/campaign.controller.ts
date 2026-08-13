import { Request, Response } from "express";
import { campaignService } from "../services/campaign.service";
import { asyncHandler } from "../utils/asyncHandler";
class CampaignController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { name, subject, body, userId } = req.body;

    const campaign = await campaignService.createCampaign({
      name,
      subject,
      body,
      userId,
    });
    res.status(201).json(campaign);
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const campaigns = await campaignService.getAllCampaigns();
    res.status(200).json(campaigns);
  });
}

export const campaignController = new CampaignController();
