import express from "express";
import {
  getDetailsMovie,
  getTrailersMovie,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();
router.get("/trending", getTrendingMovie); // get one movie
router.get("/:id/trailers", getTrailersMovie);
router.get("/:id/details", getDetailsMovie);

export default router;
