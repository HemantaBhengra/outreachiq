import jwt from 'jsonwebtoken';
const SECRET_KEY = "Hello_this_is_my_key"

export const generateToken = (userId:string): string => {
    return jwt.sign({userId},SECRET_KEY,{expiresIn:"1h"})
}

export const verifyToken = (token:string): {userId : string}  | null=>{
   try {
        return jwt.verify(token,SECRET_KEY) as {userId:string};
   } catch (error) {
        console.error("Invalid Token")
        return null;
   }
}