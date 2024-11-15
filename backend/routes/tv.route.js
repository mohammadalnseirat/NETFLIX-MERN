import express from "express";
import {
  getTrendingTV,
  getTvDetails,
  getTvTrailers,
  getTVSimilar,
  getTvsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getTVSimilar);
router.get("/:category", getTvsByCategory);

export default router;
