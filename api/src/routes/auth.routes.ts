import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import {  z } from "zod";

const router = Router();

const authSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6,"Password must be at least 6 characters")
})

router.post('/signup', validate(authSchema), authController.signup)
router.post('/login', validate(authSchema), authController.login)

export default router