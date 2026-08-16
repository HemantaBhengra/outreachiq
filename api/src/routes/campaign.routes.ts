import { Router } from "express";
import { campaignController } from "../controllers/campaign.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCampaignSchema, updateCampaignSchema } from "../validators/campaign.validator";


const router = Router();

router.post("/",validate(createCampaignSchema),campaignController.create);
router.get("/", campaignController.getAll);
router.get("/:id",campaignController.getById);
router.put("/:id",validate(updateCampaignSchema),campaignController.update);
router.delete("/:id",campaignController.delete);


export default router