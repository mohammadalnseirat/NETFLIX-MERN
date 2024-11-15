import express from "express";
import {
  getCategoryMovies,
  getDetailsMovie,
  getSimilarMovie,
  getTrailersMovie,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();
router.get("/trending", getTrendingMovie); // get one movie
router.get("/:id/trailers", getTrailersMovie);
router.get("/:id/details", getDetailsMovie); // get details
router.get("/:id/similar", getSimilarMovie); // get similar movies
router.get("/:category", getCategoryMovies); // get category movies

export default router;
