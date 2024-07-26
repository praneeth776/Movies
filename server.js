import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express(); // Variable to load express into

app.use(cors());
app.use(express.json());

app.use("api/v1/reviews" , reviews); // Sends reviews - which is imported from reviews.route.js
app.use("*",(req,res) => res.status(404).json({error:"Not found"})); // For urls that dont exist return error 404.

export default app; // Export this server, so it can be imported in other files.