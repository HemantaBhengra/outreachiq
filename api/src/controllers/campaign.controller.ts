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

    getById = asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params as {id: string}
      const campaign = await campaignService.getCampaignById(id);

      if(!campaign){
        res.status(404).json({message:"Campaign not found"})
        return
      }

      res.status(200).json(campaign)
    });

    update = asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params as {id: string};
      const campaign = await campaignService.updateCampaign(id, req.body);

      res.status(200).json(campaign)
    });

    delete = asyncHandler(async (req: Request, res: Response) => {
      const {id} = req.params as {id: string};
      const campaign = await campaignService.deleteCampaign(id)

      res.sendStatus(204).json(campaign)
    })
  }

  export const campaignController = new CampaignController();
