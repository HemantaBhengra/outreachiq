import { Request, Response } from "express";
import { leadService } from "../services/lead.service";
import { asyncHandler } from "../utils/asyncHandler";
class LeadController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { email, name, company } = req.body;

    const lead = await leadService.createLead({
      email,
      name,
      company,
    });

    res.status(201).json(lead);
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const leads = await leadService.getAllLeads();
    res.status(200).json(leads);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params as {id : string}
    const lead = await leadService.getLeadById(id)

    if(!lead){
      res.status(404).json({message:"leads not found"})
      return
    }

    res.status(200).json(lead)
  })

    update = asyncHandler(async (req: Request, res: Response) => {
      const {id} = req.params as {id: string}
      const lead = await leadService.updateLead(id, req.body)

      res.status(200).json(lead)
    })

    delete = asyncHandler(async (req: Request, res: Response)=> {
      const {id} = req.params as {id: string}
      const lead = await leadService.deleteLead(id)

      res.sendStatus(204).json(lead)
    })
}

export const leadController = new LeadController();
