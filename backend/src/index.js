import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello guys welcome to Leet lab 🎉");
})

app.get("/api/v1/auth",authRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Listening on port 8080");
})