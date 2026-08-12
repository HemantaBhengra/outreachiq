import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createLeadSchema } from "../validators/lead.validator";
import { leadController } from "../controllers/lead.controller";

const router = Router();

router.post('/', validate(createLeadSchema), leadController.create);
router.get('/', leadController.getAll)

export default router