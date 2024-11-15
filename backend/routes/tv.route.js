import express from "express";
import { getTrendingTV } from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);

export default router;
