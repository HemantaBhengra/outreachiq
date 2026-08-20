import { prisma } from '../lib/prisma'

export interface CreateUserInput {
    email : string
    password: string
}

class UserRepository {
    async create(data: CreateUserInput) {
        return await prisma.user.create({
            data:{
                email: data.email,
                hashedPassword: data.password
            }
        })
    }

    async findByEmail(email: string){
        return await prisma.user.findUnique({
            where:{email}
        })
    }

    async findById(id: string){
        return await prisma.user.findUnique({
            where:{id}
        })
    }
}

export const userRepository = new UserRepository()