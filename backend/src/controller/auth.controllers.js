import bcrypt from "bcryptjs";
import db from "../libs/db.js";
import {UserRole} from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";



const register = async (req, res) => {
    const {email,password,name} = req.body;
    try{
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })
        if(existingUser){
            res.send(400).json({
                success: false,
                message: "User already exists"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })

        //let's sign jwt token
        const token = jwt.sign({
            id: newUser.id,
        },process.env.JWT_SECRET_KEY,{expiresIn: "7d"});

        res.cookie("jwt",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            user : {
                id : newUser.id,
                name : newUser.name,
                email : newUser.email,
                role : newUser.role
            }
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message : "Error creating user"
        })
    }
}

const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(422).json({
            success : false,
            errors : errors.array()
        })
    }
    const {email,password} = req.body; 
    try {
        const user = await db.user.findUnique({
            where : {
                email
            }
        })
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            })
        }

        const token = jwt.sign({id: user.id},process.env.JWT_SECRET_KEY,{expiresIn : "7d"});

        res.cookie("jwt",token,{
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
            maxAge : 1000 * 60 * 60 * 24 * 7  //7 days
        })

        res.status(200).json({
            success : true,
            message : "User logged in successfully"
        })
    } catch (error) {
        console.log("Error occurred while login",error);
        return res.status(500).json({
            success : false,
            message : "Error occurred while login"
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt",{
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development"
        })
        res.status(204).json({
            success : true,
            message : "User logged out successfully"
        });
    } catch (error) {
        logger.error("Error occurred while logout",error);
        return res.status(500).json({
            success : false,
            message : "Error occurred while logout"
        });
    }
}

const check = async(req, res) => {
    console.log(req.user);
    try {
        res.status(200).json({
            success : true,
            message : "User authenticated successfully",
            user : req.user
        });
    } catch (error) {
        
    }
}

export { register, login, logout, check };