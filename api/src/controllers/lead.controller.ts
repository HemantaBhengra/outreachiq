import { Request, Response } from "express";
import { leadService } from "../services/lead.service";
import { asyncHandler } from "../utils/asyncHandler";
class LeadController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { email, name, company } = req.body;

    const lead = leadService.createLead({
        email,name, company
    });
    
    res.status(201).json(lead)
  });

  getAll = asyncHandler(async (req: Request, res: Response)=>{
    const leads = leadService.getAllLeads();
    res.status(200).json(leads)
  })
}

export const leadController = new LeadController()
