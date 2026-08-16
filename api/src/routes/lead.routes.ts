import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createLeadSchema } from "../validators/lead.validator";
import { leadController } from "../controllers/lead.controller";
import {updateLeadSchema} from "../validators/lead.validator"

const router = Router();

router.post('/', validate(createLeadSchema), leadController.create);
router.get('/', leadController.getAll);
router.get('/:id',leadController.getById);
router.put('/:id',validate(updateLeadSchema),leadController.update);
router.delete('/:id',leadController.delete);

export default router