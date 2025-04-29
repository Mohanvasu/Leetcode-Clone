import express from "express";
import { check, login, logout, register } from "../controller/auth.controllers.js";
import {validateLogin,authMiddleware} from "../middleware/auth.middlewares.js";

const authRoutes = express.Router();

authRoutes.post("/register",register)

authRoutes.post("/login",validateLogin,login)

authRoutes.post("/logout",authMiddleware,logout)

authRoutes.get("/check",authMiddleware,check)

export default authRoutes;