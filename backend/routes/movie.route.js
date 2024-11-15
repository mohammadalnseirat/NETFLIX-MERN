import express from "express";
import { getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();
router.get("/trending", getTrendingMovie); // get one movie


export default router;
