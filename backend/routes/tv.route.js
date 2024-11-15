import express from "express";
import { getTrendingTV, getTvTrailers } from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get('/:id/trailers',getTvTrailers);

export default router;
