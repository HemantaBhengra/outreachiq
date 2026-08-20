import { userRepository } from "../repositories/users.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export class UserService {
  async signup(email: string, password: string) {
  
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.create({
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.id);

    return { user, token };
  }

  async login(email: string, password: string){

    const user = await userRepository.findByEmail(email)
    if(!user){
        throw new Error("User not found")
    }

    const isValid = await verifyPassword(password,user.hashedPassword)
    if(!isValid){
        throw new Error("Invalid password")
    }

    const token = generateToken(user.id)

    return {user , token}
  }
}

export const userService = new UserService()