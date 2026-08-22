import { Router } from "express";
import { campaignController } from "../controllers/campaign.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../validators/campaign.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/",authMiddleware,validate(createCampaignSchema),campaignController.create,);
router.get("/", authMiddleware, campaignController.getAll);
router.get("/:id", authMiddleware, campaignController.getById);
router.put("/:id",authMiddleware,validate(updateCampaignSchema),campaignController.update,);
router.delete("/:id", authMiddleware, campaignController.delete);

export default router;
