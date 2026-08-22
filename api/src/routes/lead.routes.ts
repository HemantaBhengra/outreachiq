import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createLeadSchema } from "../validators/lead.validator";
import { leadController } from "../controllers/lead.controller";
import {updateLeadSchema} from "../validators/lead.validator"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router();

router.post('/',authMiddleware, validate(createLeadSchema), leadController.create);
router.get('/',authMiddleware, leadController.getAll);
router.get('/:id',authMiddleware,leadController.getById);
router.put('/:id',authMiddleware,validate(updateLeadSchema),leadController.update);
router.delete('/:id',authMiddleware,leadController.delete);

export default router