import { body } from "express-validator";
import jwt from "jsonwebtoken";
import db from "../libs/db.js";

const validateLogin = [
    body('email','Email cannot be empty').exists(),
    body('email','Email cannot be empty').notEmpty(),
    body('email','Email is not valid').isEmail(),
    body('password', 'password cannot be empty').notEmpty(),
    body('password','password cannot be less than 8 characters').isLength({min:6})
]

const authMiddleware = async(req,res,next)=>{
    console.log("Inside middleware")
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Unauthorized : No token provided"
            })
        }
        let decoded;
        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        } catch (error) {
            console.log("Error authenticating user :{}",error);
        }

        const user = await db.user.findUnique({
            where : {
                id : decoded.id
            },
            select : {
                id : true,
                name : true,
                email : true,
                image : true,
                role : true
            }
        })

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error authenticating user :{}",error);
        return res.status(500).json({
            success : false,
            message : "Error authenticating user"
        })
    }
}

export {validateLogin,authMiddleware};