import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";

class AuthController {
  signup = asyncHandler(async (req:Request,res:Response) => {
    const {email, password} = req.body
    const result = await userService.signup(email,password)
    res.status(201).json(result)
  })

  login = asyncHandler(async (req:Request, res:Response) => {
    const {email, password} = req.body
    const result = await userService.login(email, password)
    res.status(200).json(result)
  })
}


export const authController = new AuthController()