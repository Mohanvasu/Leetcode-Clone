import express from "express";
import { check, login, logout, register } from "../controller/auth.controllers.js";
import validateLogin from "../../middleware/auth.middlewares.js";

const authRoutes = express.Router();

authRoutes.post("/register",register)

authRoutes.post("/login",validateLogin,login)

authRoutes.post("/logout",logout)

authRoutes.post("/check",check)

export default authRoutes;