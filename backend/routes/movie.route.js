import express from "express";
import {
  getTrailersMovie,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();
router.get("/trending", getTrendingMovie); // get one movie
router.get("/:id/trailers", getTrailersMovie);  // get details for one movie.

export default router;
