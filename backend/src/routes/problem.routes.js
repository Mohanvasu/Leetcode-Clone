import express from "express";
import { getProblems } from "../controllers/problem.controller.js";
import { authMiddleware, checkAdmin } from "../middleware/auth.middlewares.js";

const problemRoutes = express.Router();

problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createProblem);

problemRoutes.get("/get-all-problems",authMiddleware,getProblems);

problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById);

problemRoutes.put("/update-problem/:id",authMiddleware,checkAdmin,updateProblemById);

problemRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblem);

problemRoutes.get("/get-solved-problems",authMiddleware,getAllProblemSolvedByUser);




export default problemRoutes;